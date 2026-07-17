import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PlusCircle, 
  KanbanSquare, 
  FileText, 
  UserCheck, 
  Lightbulb, 
  Trophy, 
  BarChart2,
  Settings,
  Cpu
} from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Sidebar = () => {
  const { currentRole, ROLES } = useRole();

  const allNavItems = [
    { name: 'Home', path: '/home', icon: Lightbulb, roles: [ROLES.USER, ROLES.LEADERSHIP, ROLES.ADMIN] },
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard, roles: [ROLES.USER, ROLES.LEADERSHIP, ROLES.ADMIN] },
    { name: 'Submit Request', path: '/submit', icon: PlusCircle, roles: [ROLES.USER] },
    { name: 'Browse Requests', path: '/browse', icon: KanbanSquare, roles: [ROLES.USER] },
    { name: 'My Requests', path: '/my-requests', icon: FileText, roles: [ROLES.USER] },
    { name: 'My Picked Tasks', path: '/my-tasks', icon: UserCheck, roles: [ROLES.USER] },
    { name: 'Reports', path: '/reports', icon: BarChart2, roles: [ROLES.LEADERSHIP] },
    { name: 'Admin Panel', path: '/admin', icon: Settings, roles: [ROLES.ADMIN] },
  ];

  const visibleNavItems = allNavItems.filter(item => item.roles.includes(currentRole));

  return (
    <aside className="sidebar">
      <div className="sidebar-header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 6, padding: '24px 20px' }}>
        <img src="/kpmg-logo.svg" alt="KPMG Logo" style={{ height: 32 }} />
        <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary-blue)' }}>Automation Hub</span>
      </div>
      
      <nav className="nav-links">
        {visibleNavItems.map((item) => (
          <NavLink 
            key={item.name} 
            to={item.path} 
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <item.icon size={20} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>
      
      <div style={{ padding: 20, borderTop: '1px solid var(--border-color)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
        Power Apps Template v1.0
      </div>
    </aside>
  );
};

export default Sidebar;
