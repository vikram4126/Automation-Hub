import React from 'react';
import { BookOpen, Video, FileText } from 'lucide-react';

const KnowledgeBase = () => {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Knowledge Base</h1>
        <p style={{ color: 'var(--text-muted)' }}>Learn how to build and maintain automations.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <div className="card" style={{ cursor: 'pointer' }}>
          <Video size={32} color="var(--primary-blue)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Power Apps Basics</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Watch a 15-minute tutorial on building your first canvas app.</p>
        </div>
        
        <div className="card" style={{ cursor: 'pointer' }}>
          <FileText size={32} color="var(--success-green)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Flow Best Practices</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Read the enterprise guidelines for naming conventions and error handling.</p>
        </div>

        <div className="card" style={{ cursor: 'pointer' }}>
          <BookOpen size={32} color="var(--accent-purple)" style={{ marginBottom: 16 }} />
          <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Copilot Rules Engine</h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Understand how the automation recommendations are generated.</p>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeBase;
