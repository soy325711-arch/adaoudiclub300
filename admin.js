/* ============================================
   ADMIN PANEL ENHANCEMENTS - Consistent Colors
   ============================================ */

/* Admin Color Scheme Variables */
:root {
  --admin-primary: #FF6B35;
  --admin-primary-light: #ff8f5a;
  --admin-primary-dark: #e55a2b;
  --admin-success: #4CAF50;
  --admin-warning: #FFC107;
  --admin-danger: #F44336;
  --admin-info: #2196F3;
  --admin-purple: #9C27B0;
  --admin-dark: #1A1A2E;
  --admin-darker: #0F0F1A;
}

/* Enhanced Sidebar */
.sidebar {
  background: linear-gradient(180deg, var(--admin-dark) 0%, var(--admin-darker) 100%);
  box-shadow: 4px 0 20px rgba(0,0,0,0.3);
}

.logo {
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Menu Enhancement */
.menu a:hover, .menu a.active {
  background: linear-gradient(90deg, rgba(255, 107, 53, 0.2), transparent);
}

/* Stat Cards */
.stat-card {
  position: relative;
  overflow: hidden;
}

.stat-card::before {
  content: '';
  position: absolute;
  top: -30%;
  right: -30%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 107, 53, 0.15), transparent 60%);
}

.stat-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  border-color: rgba(255, 107, 53, 0.3);
}

/* Enhanced Buttons */
.add-btn, .btn-save {
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
  box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  border: none;
}

.add-btn:hover, .btn-save:hover {
  background: linear-gradient(135deg, var(--admin-primary-dark), var(--admin-primary));
  box-shadow: 0 8px 25px rgba(255, 107, 53, 0.4);
  transform: translateY(-2px);
}

/* Form Focus States */
.form-group input:focus, 
.form-group select:focus, 
.form-group textarea:focus {
  border-color: var(--admin-primary) !important;
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.15);
}

/* Status Badges */
.status-active {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
  color: var(--admin-success);
  border: 1px solid rgba(76, 175, 80, 0.3);
}

.status-inactive, .status-pending, .status-rejected {
  background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(244, 67, 54, 0.1));
  color: var(--admin-danger);
  border: 1px solid rgba(244, 67, 54, 0.3);
}

.status-approved {
  background: linear-gradient(135deg, rgba(76, 175, 80, 0.2), rgba(76, 175, 80, 0.1));
  color: var(--admin-success);
}

.status-replied {
  background: linear-gradient(135deg, rgba(33, 150, 243, 0.2), rgba(33, 150, 243, 0.1));
  color: var(--admin-info);
}

/* Action Buttons */
.btn-edit {
  background: linear-gradient(135deg, var(--admin-info), #64B5F6);
  box-shadow: 0 4px 15px rgba(33, 150, 243, 0.3);
}

.btn-delete {
  background: linear-gradient(135deg, var(--admin-danger), #EF5350);
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.btn-reply {
  background: linear-gradient(135deg, var(--admin-purple), #BA68C8);
  box-shadow: 0 4px 15px rgba(156, 39, 176, 0.3);
}

.btn-approve {
  background: linear-gradient(135deg, var(--admin-success), #81C784);
  box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
}

/* Modal Enhancements */
.modal-content {
  background: linear-gradient(135deg, var(--admin-dark), var(--admin-darker));
  border: 1px solid rgba(255, 107, 53, 0.2);
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.5);
}

.modal h2 {
  color: var(--admin-primary);
}

/* Card Headers */
.card-header h3::before {
  content: '';
  width: 8px;
  height: 8px;
  background: var(--admin-primary);
  border-radius: 50%;
  margin-left: 0.5rem;
  display: inline-block;
}

/* Progress Bars */
.progress-fill {
  background: linear-gradient(90deg, var(--admin-primary), var(--admin-primary-light));
}

/* Table Hover */
tr:hover td {
  background: rgba(255, 107, 53, 0.05);
}

/* Logout Button */
.logout-btn {
  background: linear-gradient(135deg, var(--admin-danger), #EF5350);
  box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
}

.logout-btn:hover {
  background: linear-gradient(135deg, #D32F2F, var(--admin-danger));
  transform: translateY(-2px);
}

/* Stat Icon Colors */
.stat-icon.orange {
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light));
  box-shadow: 0 8px 20px rgba(255, 107, 53, 0.4);
}

.stat-icon.green {
  background: linear-gradient(135deg, var(--admin-success), #81C784);
  box-shadow: 0 8px 20px rgba(76, 175, 80, 0.4);
}

.stat-icon.blue {
  background: linear-gradient(135deg, var(--admin-info), #64B5F6);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.4);
}

.stat-icon.purple {
  background: linear-gradient(135deg, var(--admin-purple), #BA68C8);
  box-shadow: 0 8px 20px rgba(156, 39, 176, 0.4);
}

/* Stat Card Values */
.stat-info h3 {
  background: linear-gradient(135deg, #fff, #ddd);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

/* Subscription Badge */
#pending-subscriptions-count,
#unread-count {
  background: linear-gradient(135deg, var(--admin-primary), var(--admin-primary-light)) !important;
}

