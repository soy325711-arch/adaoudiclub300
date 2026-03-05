# FitLife Gym Website Specification

## Project Overview
- **Project Name**: FitLife Gym Website
- **Type**: Full-stack web application with public and admin interfaces
- **Core Functionality**: A gym website with public-facing pages for potential members and a private admin dashboard for gym owners to manage operations
- **Target Users**: General public (potential gym members) and gym owner/admin

## Technical Stack
- **Frontend**: HTML5, CSS3, JavaScript
- **Backend**: Node.js with Express.js
- **Database**: SQLite (file-based, no setup required)
- **Authentication**: Session-based admin login

## UI/UX Specification

### Color Palette
- **Primary**: `#FF6B35` (Energetic Orange)
- **Secondary**: `#1A1A2E` (Dark Navy)
- **Accent**: `#16213E` (Deep Blue)
- **Light**: `#EAEAEA` (Light Gray)
- **White**: `#FFFFFF`
- **Success**: `#4CAF50`
- **Warning**: `#FFC107`
- **Danger**: `#F44336`

### Typography
- **Headings**: 'Montserrat', sans-serif (bold, modern)
- **Body**: 'Open Sans', sans-serif (readable)
- **Sizes**: H1: 3rem, H2: 2.5rem, H3: 1.5rem, Body: 1rem

### Layout
- **Responsive**: Mobile-first, breakpoints at 768px (tablet), 1024px (desktop)
- **Navigation**: Fixed header with logo, nav links, and admin login button
- **Footer**: Contact info, social links, quick links

## Page Structure

### Public Pages

#### 1. Homepage (index.html)
- Hero section with gym image, tagline, CTA button
- About section with gym description
- Features/services highlights
- Testimonials carousel
- Call-to-action for membership

#### 2. Services (services.html)
- Grid of gym services (Personal Training, Group Classes, Cardio, Strength Training, etc.)
- Service cards with icons, descriptions

#### 3. Class Schedule (schedule.html)
- Weekly class schedule table
- Filter by day/type
- Class info (time, instructor, duration)

#### 4. Membership Plans (membership.html)
- Pricing cards for different tiers (Basic, Premium, VIP)
- Features list per plan
- Price display
- Sign up button

#### 5. Contact (contact.html)
- Contact form (name, email, phone, message)
- Gym location with map placeholder
- Contact info (phone, email, address)
- Operating hours

### Admin Interface (admin.html)

#### Login Page (login.html)
- Admin username/password login form
- Error message display

#### Dashboard (dashboard.html)
- Statistics cards (Total Members, Active Subscriptions, Classes Today, Revenue)
- Quick action buttons
- Recent activity feed

#### Members Management
- Members list table with search/filter
- Add new member form
- Edit member details
- Delete member

#### Classes Management
- Classes list with schedule
- Add new class form
- Edit class details
- Delete class

#### Bookings Management
- Bookings table
- View booking details
- Update booking status

#### Membership Plans Management
- Plans list with pricing
- Add/edit plans
- Feature management

## Functionality Specification

### Backend API Endpoints

#### Public API
- `GET /api/services` - Get all services
- `GET /api/classes` - Get class schedule
- `GET /api/memberships` - Get membership plans
- `POST /api/contact` - Submit contact form
- `POST /api/book` - Book a class

#### Admin API (Protected)
- `POST /api/admin/login` - Admin login
- `POST /api/admin/logout` - Admin logout
- `GET /api/admin/stats` - Get dashboard statistics
- `GET /api/admin/members` - Get all members
- `POST /api/admin/members` - Add member
- `PUT /api/admin/members/:id` - Update member
- `DELETE /api/admin/members/:id` - Delete member
- `GET /api/admin/classes` - Get all classes
- `POST /api/admin/classes` - Add class
- `PUT /api/admin/classes/:id` - Update class
- `DELETE /api/admin/classes/:id` - Delete class
- `GET /api/admin/bookings` - Get all bookings
- `PUT /api/admin/bookings/:id` - Update booking
- `GET /api/admin/memberships` - Get all membership plans
- `POST /api/admin/memberships` - Add membership plan
- `PUT /api/admin/memberships/:id` - Update membership plan
- `DELETE /api/admin/memberships/:id` - Delete membership plan

### Database Schema

#### members
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT UNIQUE)
- phone (TEXT)
- membership_type (TEXT)
- join_date (TEXT)
- status (TEXT)

#### classes
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- instructor (TEXT)
- day (TEXT)
- time (TEXT)
- duration (INTEGER)
- capacity (INTEGER)
- description (TEXT)

#### bookings
- id (INTEGER PRIMARY KEY)
- member_id (INTEGER)
- class_id (INTEGER)
- booking_date (TEXT)
- status (TEXT)
- FOREIGN KEY (member_id) -> members
- FOREIGN KEY (class_id) -> classes

#### memberships
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- price (REAL)
- duration (TEXT)
- features (TEXT)

#### contacts
- id (INTEGER PRIMARY KEY)
- name (TEXT)
- email (TEXT)
- phone (TEXT)
- message (TEXT)
- created_at (TEXT)

## Acceptance Criteria

### Public Interface
- [ ] Homepage loads with hero, about, services, testimonials sections
- [ ] Services page displays all gym services
- [ ] Schedule page shows weekly class timetable
- [ ] Membership page shows pricing plans with prices
- [ ] Contact page has working form (displays success message)
- [ ] All pages are responsive on mobile, tablet, desktop
- [ ] Navigation works between all pages
- [ ] Admin login button visible in header

### Admin Interface
- [ ] Login page with authentication
- [ ] Dashboard shows statistics cards
- [ ] Members page can add, view, edit, delete members
- [ ] Classes page can add, view, edit, delete classes
- [ ] Bookings page shows all bookings with status
- [ ] Memberships page can manage pricing plans
- [ ] Logout functionality works

### Technical
- [ ] Server starts without errors
- [ ] Database initializes with sample data
- [ ] API endpoints return correct data
- [ ] Session-based auth works properly
