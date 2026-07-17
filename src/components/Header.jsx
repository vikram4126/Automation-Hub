import React from 'react';
import { Search, Bell, HelpCircle, User, Shield } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Header = () => {
  const { currentRole, setCurrentRole, ROLES } = useRole();

  // Helper to determine the Indian name based on role
  const getUserName = () => {
    switch(currentRole) {
      case ROLES.USER: return 'Rahul Sharma';
      case ROLES.LEADERSHIP: return 'Amit Kumar';
      case ROLES.ADMIN: return 'Neha Gupta';
      default: return 'User';
    }
  };

  return (
    <header className="top-header">
      <div className="search-bar">
        <Search size={18} color="var(--text-muted)" />
        <input type="text" placeholder="Search requests, ideas, or users..." />
      </div>
      
      <div className="header-actions">
        {/* Role Switcher for Prototype */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 16 }}>
          <Shield size={16} color="var(--primary-blue)" />
          <select 
            value={currentRole} 
            onChange={(e) => setCurrentRole(e.target.value)}
            style={{ 
              padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)',
              backgroundColor: 'var(--bg-color)', color: 'var(--text-dark)', fontWeight: 500, outline: 'none'
            }}
          >
            {Object.values(ROLES).map(role => (
              <option key={role} value={role}>{role} View</option>
            ))}
          </select>
        </div>

        
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginLeft: 8 }}>
          <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text-dark)' }}>{getUserName()}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{currentRole}</span>
          </div>
          <div className="user-avatar" style={{ backgroundColor: 'var(--secondary-blue)' }}>
            {getUserName().split(' ').map(n => n[0]).join('')}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
