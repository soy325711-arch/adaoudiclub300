/* ============================================
   ADDITIONAL IMPROVEMENTS FOR GYM WEBSITE
   ============================================ */

/* Fix incomplete CSS rule */
.hero-animate-4 .btn-secondary:hover {
  background: var(--white);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

/* RTL Support for Arabic */
[dir="rtl"] {
  direction: rtl;
  text-align: right;
}

[dir="rtl"] .nav-links {
  flex-direction: row-reverse;
}

[dir="rtl"] .nav-links a::after {
  left: auto;
  right: 0;
}

[dir="rtl"] .about-content {
  direction: rtl;
}

[dir="rtl"] .feature-item {
  flex-direction: row-reverse;
}

[dir="rtl"] .testimonial-author {
  flex-direction: row-reverse;
}

[dir="rtl"] .contact-info-item {
  flex-direction: row-reverse;
}

[dir="rtl"] .membership-features li {
  flex-direction: row-reverse;
}

[dir="rtl"] .admin-sidebar {
  right: 0;
  left: auto;
}

[dir="rtl"] .admin-main {
  margin-left: 0;
  margin-right: 260px;
}

[dir="rtl"] .admin-menu li a {
  border-left: none;
  border-right: 3px solid transparent;
}

[dir="rtl"] .admin-menu li a:hover,
[dir="rtl"] .admin-menu li a.active {
  border-right-color: var(--primary);
}

/* Enhanced Navbar with Glass Effect */
.navbar {
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.95), rgba(22, 33, 62, 0.95));
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.navbar.scrolled {
  padding: 0.7rem 2rem;
  background: linear-gradient(135deg, rgba(26, 26, 46, 0.98), rgba(22, 33, 62, 0.98));
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.4);
}

.logo::before {
  content: '💪';
  font-size: 1.5rem;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 2px;
  background: var(--primary);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-links a:hover::after {
  width: 100%;
}

/* Enhanced Contact Form */
.contact-form-wrapper {
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  padding: 3rem;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
}

.contact-form-wrapper h2 {
  color: var(--white);
  margin-bottom: 2rem;
  font-size: 2rem;
}

.contact-form-wrapper h2::before {
  content: '';
  width: 4px;
  height: 30px;
  background: linear-gradient(180deg, var(--primary), #ff8f5a);
  border-radius: 2px;
}

.contact-form-wrapper .form-group input,
.contact-form-wrapper .form-group textarea {
  width: 100%;
  padding: 1rem 1.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  background: rgba(0, 0, 0, 0.3);
  color: white;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.contact-form-wrapper .form-group input:focus,
.contact-form-wrapper .form-group textarea:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 4px rgba(255, 107, 53, 0.1);
  background: rgba(0, 0, 0, 0.4);
}

.contact-info-item {
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;
}

.contact-info-item:hover {
  transform: translateY(-5px);
  border-color: rgba(255, 107, 53, 0.3);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.2);
}

.contact-icon {
  width: 60px;
  height: 60px;
  background: linear-gradient(135deg, var(--primary), #ff8f5a);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--white);
  font-size: 1.5rem;
  flex-shrink: 0;
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

.contact-details h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--white);
}

.contact-details p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.8;
  margin: 0;
}

.contact-details strong {
  color: var(--primary);
}

/* Enhanced Buttons */
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: linear-gradient(135deg, var(--primary), #ff8f5a);
  color: var(--white);
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transition: left 0.5s ease;
}

.btn-primary:hover {
  background: linear-gradient(135deg, #e55a2b, var(--primary));
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 107, 53, 0.4);
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  background: transparent;
  border: 2px solid var(--white);
  color: var(--white);
  padding: 1rem 2.5rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: var(--white);
  color: var(--primary);
  transform: translateY(-3px);
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.2);
}

/* Section Title Enhancement */
.section-title h2 {
  font-size: 2.5rem;
  color: var(--secondary);
  margin-bottom: 1rem;
  position: relative;
  display: inline-block;
}

.section-title h2::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 4px;
  background: linear-gradient(90deg, var(--primary), #ff8f5a);
  border-radius: 2px;
}

/* Enhanced Footer */
.footer {
  background: linear-gradient(180deg, #0f0f1a, #1a1a2e);
  color: var(--white);
  padding: 4rem 2rem 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.footer-section h3 {
  font-size: 1.3rem;
  margin-bottom: 1.5rem;
  color: var(--primary);
}

.footer-section h3::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--primary);
  border-radius: 50%;
}

.social-links a:hover {
  background: var(--primary);
  transform: translateY(-3px) rotate(5deg);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

/* Responsive Design */
@media (max-width: 768px) {
  .menu-toggle {
    display: flex;
  }
  
  .nav-links {
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(26, 26, 46, 0.98), rgba(22, 33, 62, 0.98));
    flex-direction: column;
    padding: 2rem;
    gap: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  .nav-links.active {
    display: flex;
  }
  
  .hero h1 {
    font-size: 2.2rem;
    letter-spacing: 1px;
  }
  
  .section-title h2 {
    font-size: 1.8rem;
  }
  
  .contact-form-wrapper,
  .contact-info-item {
    padding: 1.5rem;
  }
}

/* Enhanced Map */
.map-section {
  background: linear-gradient(180deg, #f8f8f8 0%, #fff 100%);
  padding: 4rem 2rem;
}

.map-wrapper {
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.map-wrapper iframe {
  display: block;
  width: 100%;
  height: 450px;
}

/* Enhanced Colors - More Vibrant Service Cards */
.service-card {
  background: linear-gradient(145deg, #1e1e3f 0%, #16213E 100%);
}

.service-card:hover {
  background: linear-gradient(145deg, #252547 0%, #1e2a4a 100%);
}

/* Enhanced hero gradient */
.hero::before {
  background: 
    radial-gradient(circle at 30% 70%, rgba(255, 107, 53, 0.25) 0%, transparent 50%),
    radial-gradient(circle at 70% 30%, rgba(255, 143, 90, 0.15) 0%, transparent 50%);
}

/* Better contrast for text */
.service-card p {
  color: rgba(255, 255, 255, 0.75);
}

.contact-details p {
  color: rgba(255, 255, 255, 0.8);
}

/* ============================================
   GENDER FILTER FOR SCHEDULE
   ============================================ */

/* Gender Filter */
.gender-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.gender-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 30px;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  color: rgba(255, 255, 255, 0.8);
}

.gender-btn .material-icons {
  font-size: 1.3rem;
}

.gender-btn.active,
.gender-btn:hover {
  background: linear-gradient(135deg, var(--primary), #ff8f5a);
  border-color: var(--primary);
  color: var(--white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.3);
}

.gender-btn[data-gender="male"].active {
  background: linear-gradient(135deg, #2196F3, #64B5F6);
  border-color: #2196F3;
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.3);
}

.gender-btn[data-gender="female"].active {
  background: linear-gradient(135deg, #E91E63, #F06292);
  border-color: #E91E63;
  box-shadow: 0 8px 20px rgba(233, 30, 99, 0.3);
}

/* Schedule Table - Gender Badge */
.gender-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
}

.gender-badge.male {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1));
  color: #2196F3;
  border: 1px solid rgba(33, 150, 243, 0.3);
}

.gender-badge.female {
  background: linear-gradient(135deg, rgba(233, 30, 99, 0.2), rgba(233, 30, 99, 0.1));
  color: #E91E63;
  border: 1px solid rgba(233, 30, 99, 0.3);
}

