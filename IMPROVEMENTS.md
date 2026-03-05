const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, 'gym.db');
const db = new Database(dbPath);

// Enable foreign keys
db.pragma('foreign_keys = ON');

// Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS members (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    password TEXT,
    phone TEXT,
    membership_type TEXT,
    join_date TEXT,
    status TEXT DEFAULT 'active'
  );

  CREATE TABLE IF NOT EXISTS classes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    instructor TEXT NOT NULL,
    day TEXT NOT NULL,
    time TEXT NOT NULL,
    duration INTEGER NOT NULL,
    capacity INTEGER NOT NULL,
    description TEXT,
    gender TEXT DEFAULT 'both'
  );

  CREATE TABLE IF NOT EXISTS bookings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    member_id INTEGER,
    class_id INTEGER,
    booking_date TEXT,
    status TEXT DEFAULT 'confirmed',
    FOREIGN KEY (member_id) REFERENCES members(id),
    FOREIGN KEY (class_id) REFERENCES classes(id)
  );

  CREATE TABLE IF NOT EXISTS memberships (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    duration TEXT NOT NULL,
    features TEXT
  );

  CREATE TABLE IF NOT EXISTS contacts (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    message TEXT,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    icon TEXT
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    reply TEXT,
    status TEXT DEFAULT 'unread',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );
`);

// Check if data exists, if not, insert sample data
const memberCount = db.prepare('SELECT COUNT(*) as count FROM members').get();

if (memberCount.count === 0) {
  console.log('Inserting sample data...');

  // Insert services
  const insertService = db.prepare('INSERT INTO services (name, description, icon) VALUES (?, ?, ?)');
  const services = [
    ['Personal Training', 'One-on-one sessions with certified trainers to help you achieve your fitness goals', 'person'],
    ['Group Classes', 'Energizing group workouts including Yoga, Spin, HIIT, and more', 'groups'],
    ['Cardio Zone', 'State-of-the-art cardio equipment including treadmills, ellipticals, and bikes', 'directions_run'],
    ['Strength Training', 'Free weights and resistance machines for building muscle', 'fitness_center'],
    ['Swimming Pool', 'Olympic-sized pool for laps and aquatic exercises', 'pool'],
    ['Sauna & Steam Room', 'Relax and recover in our spa facilities', 'hot_tub'],
    ['الكيك بوكسينغ', 'تعلم فنون القتال مع مدربين محترفين. قاعة مجهزة بأحدث المعدات', 'sports_martial_arts']
  ];
  services.forEach(s => insertService.run(s[0], s[1], s[2]));

  // Insert classes - Weekly schedule for Men and Women
  const insertClass = db.prepare('INSERT INTO classes (name, instructor, day, time, duration, capacity, description, gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
  const classes = [
    // === جدول الرجال - Monday ===
    ['تمارين القوة', 'أحمد محمد', 'Monday', '06:00', 60, 20, 'تمارين رفع الأثقال للرجال', 'male'],
    ['كارديو', 'خالد عمر', 'Monday', '07:00', 45, 25, 'تمارين كارديو عالية الكثافة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Monday', '08:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Monday', '10:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['الكيك بوكسينغ', 'محمد Kamal', 'Monday', '12:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['تمارين المقاومة', 'أحمد محمد', 'Monday', '14:00', 60, 18, 'تمارين المقاومة', 'male'],
    ['HIIT', 'خالد عمر', 'Monday', '16:00', 45, 20, 'تمارين HIIT', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Monday', '18:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Monday', '20:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['تمارين مسائية', 'أحمد محمد', 'Monday', '22:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    
    // === جدول النساء - Monday ===
    ['اليوغا', 'سارة جونسن', 'Monday', '12:00', 60, 20, 'جلسات يوغا للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Monday', '14:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Monday', '16:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['البيلاتس', 'سارة جونسن', 'Monday', '18:00', 60, 15, 'تمارين البيلاتس للنساء', 'female'],
    ['الكارديو', 'emma davis', 'Monday', '20:00', 45, 20, 'تمارين كارديو للنساء', 'female'],
    
    // === جدول الرجال - Tuesday ===
    ['تمارين القوة', 'أحمد محمد', 'Tuesday', '06:00', 60, 20, 'تمارين رفع الأثقال للرجال', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Tuesday', '08:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['الملاكمة', 'أحمد Workout', 'Tuesday', '10:00', 60, 15, 'تدريب الملاكمة', 'male'],
    ['الكيك بوكسينغ', 'Mohamed Kamal', 'Tuesday', '12:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['الس_pin', 'خالد عمر', 'Tuesday', '14:00', 45, 25, 'دروس السpin للرجال', 'male'],
    ['تمارين المقاومة', 'أحمد محمد', 'Tuesday', '16:00', 60, 18, 'تمارين المقاومة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Tuesday', '18:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Tuesday', '20:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['تمارين مسائية', 'خالد عمر', 'Tuesday', '22:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    
    // === جدول النساء - Tuesday ===
    ['اليوغا', 'سارة جونسن', 'Tuesday', '12:00', 60, 20, 'جلسات يوغا للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Tuesday', '14:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Tuesday', '16:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['ال كارديو', 'emma davis', 'Tuesday', '18:00', 45, 20, 'تمارين كارديو للنساء', 'female'],
    ['اللياقة', 'سارة جونسن', 'Tuesday', '20:00', 60, 18, 'تمارين لياقة للنساء', 'female'],
    
    // === جدول الرجال - Wednesday ===
    ['تمارين القوة', 'أحمد محمد', 'Wednesday', '06:00', 60, 20, 'تمارين رفع الأثقال للرجال', 'male'],
    ['كارديو', 'خالد عمر', 'Wednesday', '07:00', 45, 25, 'تمارين كارديو عالية الكثافة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Wednesday', '08:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Wednesday', '10:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['الكيك بوكسينغ', 'Mohamed Kamal', 'Wednesday', '12:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['الملاكمة', 'أحمد Workout', 'Wednesday', '14:00', 60, 15, 'تدريب الملاكمة', 'male'],
    ['HIIT', 'خالد عمر', 'Wednesday', '16:00', 45, 20, 'تمارين HIIT', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Wednesday', '18:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['تمارين مسائية', 'أحمد محمد', 'Wednesday', '20:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    ['تمارين خفيفة', 'ياسر إبراهيم', 'Wednesday', '22:00', 45, 20, 'تمارين خفيفة للرجال', 'male'],
    
    // === جدول النساء - Wednesday ===
    ['اليوغا', 'سارة جونسن', 'Wednesday', '12:00', 60, 20, 'جلسات يوغا للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Wednesday', '14:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Wednesday', '16:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['البيلاتس', 'سارة جونسن', 'Wednesday', '18:00', 60, 15, 'تمارين البيلاتس للنساء', 'female'],
    ['اليوغا المسائية', 'ماريا غارسيا', 'Wednesday', '20:00', 60, 20, 'يوغا مسائية للنساء', 'female'],
    
    // === جدول الرجال - Thursday ===
    ['تمارين القوة', 'أحمد محمد', 'Thursday', '06:00', 60, 20, 'تمارين رفع الأثقال للرجال', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Thursday', '08:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['الملاكمة', 'أحمد Workout', 'Thursday', '10:00', 60, 15, 'تدريب الملاكمة', 'male'],
    ['الكيك بوكسينغ', 'Mohamed Kamal', 'Thursday', '12:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['الس_pin', 'خالد عمر', 'Thursday', '14:00', 45, 25, 'دروس السpin للرجال', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Thursday', '16:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['تمارين المقاومة', 'أحمد محمد', 'Thursday', '18:00', 60, 18, 'تمارين المقاومة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Thursday', '20:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['تمارين مسائية', 'خالد عمر', 'Thursday', '22:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    
    // === جدول النساء - Thursday ===
    ['اليوغا', 'سارة جونسن', 'Thursday', '12:00', 60, 20, 'جلسات يوغا للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Thursday', '14:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Thursday', '16:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['ال كارديو', 'emma davis', 'Thursday', '18:00', 45, 20, 'تمارين كارديو للنساء', 'female'],
    ['اللياقة', 'سارة جونسن', 'Thursday', '20:00', 60, 18, 'تمارين لياقة للنساء', 'female'],
    
    // === جدول الرجال - Friday ===
    ['تمارين القوة', 'أحمد محمد', 'Friday', '06:00', 60, 20, 'تمارين رفع الأثقال للرجال', 'male'],
    ['كارديو', 'خالد عمر', 'Friday', '07:00', 45, 25, 'تمارين كارديو عالية الكثافة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Friday', '08:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['الكيك بوكسينغ', 'Mohamed Kamal', 'Friday', '10:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['الملاكمة', 'أحمد Workout', 'Friday', '12:00', 60, 15, 'تدريب الملاكمة', 'male'],
    ['HIIT', 'خالد عمر', 'Friday', '14:00', 45, 20, 'تمارين HIIT', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Friday', '16:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['تمارين خفيفة', 'ياسر إبراهيم', 'Friday', '18:00', 60, 20, 'تمارين خفيفة للرجال', 'male'],
    ['تمارين مسائية', 'أحمد محمد', 'Friday', '20:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    
    // === جدول النساء - Friday ===
    ['اليوغا', 'سارة جونسن', 'Friday', '12:00', 60, 20, 'جلسات يوغا للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Friday', '14:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Friday', '16:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['البيلاتس', 'سارة جونسن', 'Friday', '18:00', 60, 15, 'تمارين البيلاتس للنساء', 'female'],
    ['اليوغا المسائية', 'ماريا غارسيا', 'Friday', '20:00', 60, 20, 'يوغا مسائية للنساء', 'female'],
    
    // === جدول الرجال - Saturday ===
    ['تمارين صباحية', 'أحمد محمد', 'Saturday', '08:00', 90, 20, 'تمارين صباحية شاملة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Saturday', '10:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['الكيك بوكسينغ', 'Mohamed Kamal', 'Saturday', '12:00', 60, 20, 'تدريب الكيك بوكسينغ', 'male'],
    ['المصارعة', 'ياسر إبراهيم', 'Saturday', '14:00', 60, 12, 'تدريب المصارعة', 'male'],
    ['تمارين خفيفة', 'خالد عمر', 'Saturday', '16:00', 60, 20, 'تمارين خفيفة للرجال', 'male'],
    ['تمارين مسائية', 'أحمد محمد', 'Saturday', '18:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    ['تمارين ليلية', 'عمر سعيد', 'Saturday', '20:00', 60, 15, 'تمارين ليلية للرجال', 'male'],
    
    // === جدول النساء - Saturday ===
    ['اليوغا الصباحية', 'سارة جونسن', 'Saturday', '08:00', 60, 20, 'يوغا صباحية للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Saturday', '10:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Saturday', '12:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['البيلاتس', 'سارة جونسن', 'Saturday', '14:00', 60, 15, 'تمارين البيلاتس للنساء', 'female'],
    ['ال كارديو', 'emma davis', 'Saturday', '16:00', 45, 20, 'تمارين كارديو للنساء', 'female'],
    ['اليوغا المسائية', 'ماريا غارسيا', 'Saturday', '18:00', 60, 20, 'يوغا مسائية للنساء', 'female'],
    
    // === جدول الرجال - Sunday ===
    ['تمارين صباحية', 'أحمد محمد', 'Sunday', '08:00', 90, 20, 'تمارين صباحية شاملة', 'male'],
    ['كمال الأجسام', 'عمر سعيد', 'Sunday', '10:00', 90, 15, 'تدريب كمال الأجسام', 'male'],
    ['الملاكمة', 'أحمد Workout', 'Sunday', '12:00', 60, 15, 'تدريب الملاكمة', 'male'],
    ['تمارين المقاومة', 'خالد عمر', 'Sunday', '14:00', 60, 18, 'تمارين المقاومة', 'male'],
    ['تمارين خفيفة', 'ياسر إبراهيم', 'Sunday', '16:00', 60, 20, 'تمارين خفيفة للرجال', 'male'],
    ['تمارين مسائية', 'أحمد محمد', 'Sunday', '18:00', 60, 20, 'تمارين مسائية للرجال', 'male'],
    
    // === جدول النساء - Sunday ===
    ['اليوغا الصباحية', 'سارة جونسن', 'Sunday', '08:00', 60, 20, 'يوغا صباحية للنساء', 'female'],
    ['الرقص LATIN', 'ماريا غارسيا', 'Sunday', '10:00', 60, 25, 'رقص لاتيني للنساء', 'female'],
    ['السباحة', 'إيمان workout', 'Sunday', '12:00', 60, 15, 'تمارين السباحة للنساء', 'female'],
    ['البيلاتس', 'سارة جونسن', 'Sunday', '14:00', 60, 15, 'تمارين البيلاتس للنساء', 'female'],
    ['ال كارديو', 'emma davis', 'Sunday', '16:00', 45, 20, 'تمارين كارديو للنساء', 'female'],
    ['اليوغا المسائية', 'ماريا غارسيا', 'Sunday', '18:00', 60, 20, 'يوغا مسائية للنساء', 'female']
  ];
  classes.forEach(c => insertClass.run(c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]));

  // Insert memberships
  const insertMembership = db.prepare('INSERT INTO memberships (name, price, duration, features) VALUES (?, ?, ?, ?)');
  const memberships = [
    ['Basic', 29.99, 'Monthly', 'Gym access, Locker room, Free parking'],
    ['Premium', 49.99, 'Monthly', 'Gym access, Locker room, Free parking, Group classes, Pool access'],
    ['VIP', 89.99, 'Monthly', 'Gym access, Locker room, Free parking, Group classes, Pool access, Personal training (4 sessions), Sauna & Steam']
  ];
  memberships.forEach(m => insertMembership.run(m[0], m[1], m[2], m[3]));

  // Insert sample members
  const insertMember = db.prepare('INSERT INTO members (name, email, phone, membership_type, join_date, status) VALUES (?, ?, ?, ?, ?, ?)');
  const members = [
    ['John Doe', 'john.doe@email.com', '555-0101', 'Premium', '2024-01-15', 'active'],
    ['Jane Smith', 'jane.smith@email.com', '555-0102', 'VIP', '2024-02-20', 'active'],
    ['Bob Wilson', 'bob.wilson@email.com', '555-0103', 'Basic', '2024-03-10', 'active'],
    ['Alice Brown', 'alice.brown@email.com', '555-0104', 'Premium', '2024-03-25', 'inactive'],
    ['Charlie Davis', 'charlie.davis@email.com', '555-0105', 'VIP', '2024-04-05', 'active']
  ];
  members.forEach(m => insertMember.run(m[0], m[1], m[2], m[3], m[4], m[5]));

  // Insert sample bookings
  const insertBooking = db.prepare('INSERT INTO bookings (member_id, class_id, booking_date, status) VALUES (?, ?, ?, ?)');
  const bookings = [
    [1, 1, '2024-04-15', 'confirmed'],
    [2, 2, '2024-04-15', 'confirmed'],
    [1, 3, '2024-04-16', 'confirmed'],
    [3, 4, '2024-04-16', 'pending'],
    [5, 7, '2024-04-17', 'confirmed']
  ];
  bookings.forEach(b => insertBooking.run(b[0], b[1], b[2], b[3]));

  console.log('Sample data inserted successfully!');
}

// Export database
module.exports = db;
