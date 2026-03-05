const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'fitlife-gym-secret-key-2024',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// Admin credentials
const ADMIN_CREDENTIALS = {
  username: 'adaoudi',
  password: 'fitness2026@'
};

// Authentication middleware
const isAdmin = (req, res, next) => {
  if (req.session.isAdmin) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// ==================== PUBLIC API ROUTES ====================

// Get all services
app.get('/api/services', (req, res) => {
  try {
    const services = db.prepare('SELECT * FROM services').all();
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get class schedule
app.get('/api/classes', (req, res) => {
  try {
    const classes = db.prepare('SELECT * FROM classes ORDER BY day, time').all();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get membership plans
app.get('/api/memberships', (req, res) => {
  try {
    const memberships = db.prepare('SELECT * FROM memberships').all();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Submit contact form
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;
    const stmt = db.prepare('INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, email, phone, message);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Book a class
app.post('/api/book', (req, res) => {
  try {
    const { member_id, class_id, booking_date } = req.body;
    const stmt = db.prepare('INSERT INTO bookings (member_id, class_id, booking_date, status) VALUES (?, ?, ?, ?)');
    const result = stmt.run(member_id, class_id, booking_date, 'confirmed');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client login
app.post('/api/client/login', (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if member exists with username or email
    const member = db.prepare('SELECT * FROM members WHERE (email = ? OR username = ?) AND password = ?').get(email, email, password);
    
    if (member) {
      req.session.clientId = member.id;
      req.session.clientName = member.name;
      req.session.clientEmail = member.email;
      res.json({ 
        success: true, 
        member: {
          id: member.id,
          name: member.name,
          email: member.email,
          membership_type: member.membership_type,
          status: member.status
        }
      });
    } else {
      res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Client logout
app.post('/api/client/logout', (req, res) => {
  req.session.clientId = null;
  req.session.clientName = null;
  req.session.clientEmail = null;
  res.json({ success: true });
});

// Check client session
app.get('/api/client/check', (req, res) => {
  if (req.session.clientId) {
    res.json({ 
      isLoggedIn: true, 
      client: {
        id: req.session.clientId,
        name: req.session.clientName,
        email: req.session.clientEmail
      }
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

// Get client profile
app.get('/api/client/profile', (req, res) => {
  if (!req.session.clientId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  try {
    const member = db.prepare('SELECT * FROM members WHERE id = ?').get(req.session.clientId);
    res.json(member);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ADMIN API ROUTES ====================

// Admin login
app.post('/api/admin/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      req.session.isAdmin = true;
      res.json({ success: true });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Admin logout
app.post('/api/admin/logout', (req, res) => {
  req.session.destroy();
  res.json({ success: true });
});

// Check admin session
app.get('/api/admin/check', (req, res) => {
  res.json({ isAdmin: req.session.isAdmin || false });
});

// Get dashboard statistics
app.get('/api/admin/stats', isAdmin, (req, res) => {
  try {
    const totalMembers = db.prepare('SELECT COUNT(*) as count FROM members').get().count;
    const activeMembers = db.prepare("SELECT COUNT(*) as count FROM members WHERE status = 'active'").get().count;
    const todayBookings = db.prepare('SELECT COUNT(*) as count FROM bookings WHERE booking_date = date("now")').get().count;
    const totalRevenue = db.prepare("SELECT SUM(m.price) as total FROM members m WHERE m.status = 'active'").get().total || 0;
    
    res.json({
      totalMembers,
      activeMembers,
      todayBookings,
      totalRevenue: totalRevenue.toFixed(2)
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all members
app.get('/api/admin/members', isAdmin, (req, res) => {
  try {
    const members = db.prepare('SELECT * FROM members ORDER BY join_date DESC').all();
    res.json(members);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add member
app.post('/api/admin/members', isAdmin, (req, res) => {
  try {
    const { name, email, phone, membership_type, join_date, status, username, password } = req.body;
    const stmt = db.prepare('INSERT INTO members (name, email, phone, membership_type, join_date, status, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, email, phone, membership_type, join_date || new Date().toISOString().split('T')[0], status || 'active', username || null, password || null);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update member
app.put('/api/admin/members/:id', isAdmin, (req, res) => {
  try {
    const { name, email, phone, membership_type, join_date, status, username, password } = req.body;
    const stmt = db.prepare('UPDATE members SET name = ?, email = ?, phone = ?, membership_type = ?, join_date = ?, status = ?, username = ?, password = ? WHERE id = ?');
    stmt.run(name, email, phone, membership_type, join_date, status, username || null, password || null, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete member
app.delete('/api/admin/members/:id', isAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM members WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all classes
app.get('/api/admin/classes', isAdmin, (req, res) => {
  try {
    const classes = db.prepare('SELECT * FROM classes ORDER BY day, time').all();
    res.json(classes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add class
app.post('/api/admin/classes', isAdmin, (req, res) => {
  try {
    const { name, instructor, day, time, duration, capacity, description } = req.body;
    const stmt = db.prepare('INSERT INTO classes (name, instructor, day, time, duration, capacity, description) VALUES (?, ?, ?, ?, ?, ?, ?)');
    const result = stmt.run(name, instructor, day, time, duration, capacity, description);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update class
app.put('/api/admin/classes/:id', isAdmin, (req, res) => {
  try {
    const { name, instructor, day, time, duration, capacity, description } = req.body;
    const stmt = db.prepare('UPDATE classes SET name = ?, instructor = ?, day = ?, time = ?, duration = ?, capacity = ?, description = ? WHERE id = ?');
    stmt.run(name, instructor, day, time, duration, capacity, description, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete class
app.delete('/api/admin/classes/:id', isAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM classes WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all bookings
app.get('/api/admin/bookings', isAdmin, (req, res) => {
  try {
    const bookings = db.prepare(`
      SELECT b.*, m.name as member_name, c.name as class_name 
      FROM bookings b
      LEFT JOIN members m ON b.member_id = m.id
      LEFT JOIN classes c ON b.class_id = c.id
      ORDER BY b.booking_date DESC
    `).all();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update booking
app.put('/api/admin/bookings/:id', isAdmin, (req, res) => {
  try {
    const { status } = req.body;
    db.prepare('UPDATE bookings SET status = ? WHERE id = ?').run(status, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all memberships
app.get('/api/admin/memberships', isAdmin, (req, res) => {
  try {
    const memberships = db.prepare('SELECT * FROM memberships').all();
    res.json(memberships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add membership
app.post('/api/admin/memberships', isAdmin, (req, res) => {
  try {
    const { name, price, duration, features } = req.body;
    const stmt = db.prepare('INSERT INTO memberships (name, price, duration, features) VALUES (?, ?, ?, ?)');
    const result = stmt.run(name, price, duration, features);
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update membership
app.put('/api/admin/memberships/:id', isAdmin, (req, res) => {
  try {
    const { name, price, duration, features } = req.body;
    const stmt = db.prepare('UPDATE memberships SET name = ?, price = ?, duration = ?, features = ? WHERE id = ?');
    stmt.run(name, price, duration, features, req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete membership
app.delete('/api/admin/memberships/:id', isAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM memberships WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all messages (admin)
app.get('/api/admin/messages', isAdmin, (req, res) => {
  try {
    const messages = db.prepare('SELECT * FROM messages ORDER BY created_at DESC').all();
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add message (from contact form or client)
app.post('/api/messages', (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    const stmt = db.prepare('INSERT INTO messages (name, email, subject, message, status) VALUES (?, ?, ?, ?, ?)');
    const result = stmt.run(name, email, subject || '', message, 'unread');
    res.json({ success: true, id: result.lastInsertRowid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Reply to message (admin)
app.post('/api/admin/messages/:id/reply', isAdmin, (req, res) => {
  try {
    const { reply } = req.body;
    db.prepare('UPDATE messages SET reply = ?, status = ? WHERE id = ?').run(reply, 'read', req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete message (admin)
app.delete('/api/admin/messages/:id', isAdmin, (req, res) => {
  try {
    db.prepare('DELETE FROM messages WHERE id = ?').run(req.params.id);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve HTML pages
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/services', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'services.html'));
});

app.get('/schedule', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'schedule.html'));
});

app.get('/membership', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'membership.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'contact.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/admin.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/client-dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client-dashboard.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`FitLife Gym server running on http://localhost:${PORT}`);
});
