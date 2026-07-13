import React from 'react';
import { Settings, Users, Database } from 'lucide-react';

const AdminPanel = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Admin Panel</h1>
        <p style={{ color: 'var(--text-muted)' }}>System configuration and rule management.</p>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Database size={20} color="var(--primary-blue)" /> Copilot Rules (SharePoint List Mapping)
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Manage the keywords that trigger the "Rule-Based Engine" for the Automation Copilot panel.
        </p>
        <button className="btn-secondary">Manage Rules List</button>
      </div>

      <div className="card" style={{ marginBottom: 24 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Users size={20} color="var(--secondary-blue)" /> User Management
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Assign developers to the Automation Team group and manage Leadership access.
        </p>
        <button className="btn-secondary">Manage Entra ID Groups</button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.1rem', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Settings size={20} color="var(--accent-purple)" /> System Settings
        </h3>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16 }}>
          Configure ROI calculation multipliers and default assignment rules.
        </p>
        <button className="btn-secondary">Open Settings Panel</button>
      </div>
    </div>
  );
};

export default AdminPanel;
