import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare, Paperclip, Calendar, User, X, Sparkles, Clock, CheckCircle } from 'lucide-react';

const BrowseRequests = () => {
  const [selectedTask, setSelectedTask] = useState(null);

  const columns = [
    { id: 'open', title: 'Open / Unassigned', count: 3 },
    { id: 'picked', title: 'Picked / Planning', count: 2 },
    { id: 'dev', title: 'Development', count: 1 },
    { id: 'test', title: 'Testing / UAT', count: 1 },
    { id: 'done', title: 'Completed', count: 2 },
  ];

  const mockTasks = [
    { 
      id: 'REQ-022', title: 'Microsite Builder with React', category: 'React', priority: 'High', status: 'done', hours: 300, date: 'Oct 05', user: 'Vikram',
      desc: 'We need a tool to quickly generate microsites for marketing campaigns using standard templates.',
      aiTech: 'Custom React Web App', aiComp: 'Very High', aiTime: '6+ Weeks'
    },
    { 
      id: 'REQ-023', title: 'Banner Creator with React', category: 'React', priority: 'Medium', status: 'done', hours: 150, date: 'Oct 10', user: 'Shantanu',
      desc: 'Automate the generation of standard size web banners from uploaded images and text.',
      aiTech: 'Custom React Web App', aiComp: 'Medium', aiTime: '3 Weeks'
    },
    { 
      id: 'REQ-024', title: 'Email Generator with Vue.js', category: 'Vue.js', priority: 'High', status: 'dev', hours: 120, date: 'Oct 12', user: 'Sukhvinder',
      desc: 'Internal tool to generate standard HTML email templates for newsletters.',
      aiTech: 'Vue.js Application', aiComp: 'Medium', aiTime: '2 Weeks'
    },
    { 
      id: 'REQ-025', title: 'QC Automate with Cloud Code', category: 'Cloud Code', priority: 'Critical', status: 'test', hours: 250, date: 'Oct 15', user: 'Yuvraj',
      desc: 'Automate quality control checks for our deployments using cloud scripts.',
      aiTech: 'Azure Functions / Cloud Code', aiComp: 'High', aiTime: '4 Weeks'
    },
    { 
      id: 'REQ-026', title: 'Onboarding App with PowerApp', category: 'PowerApps/Automate', priority: 'High', status: 'open', hours: 180, date: 'Oct 18', user: 'Vikram',
      desc: 'I need a data entry form for employee onboarding so HR can stop using manual Excel files.',
      aiTech: 'Power Apps (Canvas App)', aiComp: 'High', aiTime: '4 Weeks'
    },
    { 
      id: 'REQ-027', title: 'Leave Request System', category: 'Power Apps', priority: 'Medium', status: 'picked', hours: 80, date: 'Oct 20', user: 'Kiran',
      desc: 'A simple app for employees to submit leave requests and managers to approve them.',
      aiTech: 'Power Automate + SharePoint', aiComp: 'Low', aiTime: '1 Week'
    },
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Critical': return 'badge-warning';
      case 'High': return 'badge-purple';
      case 'Medium': return 'badge-info';
      default: return 'badge-success';
    }
  };

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Browse Requests</h1>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>Pick tasks, manage development, and track progress.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-secondary">Filters</button>
          <button className="btn-primary">My Board</button>
        </div>
      </div>

      <div className="kanban-board">
        {columns.map(col => (
          <div key={col.id} className="kanban-column">
            <div className="kanban-column-header">
              <span>{col.title}</span>
              <span style={{ 
                backgroundColor: 'var(--border-color)', color: 'var(--text-muted)',
                padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem'
              }}>
                {col.count}
              </span>
            </div>
            
            <div className="kanban-cards">
              {mockTasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="kanban-card" onClick={() => setSelectedTask(task)}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{task.id}</span>
                    <button style={{ color: 'var(--text-muted)' }} onClick={(e) => e.stopPropagation()}><MoreHorizontal size={16} /></button>
                  </div>
                  
                  <div className="card-title">{task.title}</div>
                  
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    <span className="badge badge-info">{task.category}</span>
                  </div>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--success-green)', fontWeight: 500, marginBottom: 12 }}>
                    ~{task.hours} hrs/yr saved
                  </div>

                  <div className="card-meta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                      <User size={14} /> {task.user}
                    </div>
                    <div style={{ display: 'flex', gap: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><MessageSquare size={14}/> 2</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}><Paperclip size={14}/> 1</span>
                    </div>
                  </div>
                  
                  {col.id === 'open' && (
                    <button className="btn-primary" style={{ width: '100%', marginTop: 12, justifyContent: 'center' }} onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTask(task);
                    }}>
                      View Details
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Task Details Modal */}
      {selectedTask && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setSelectedTask(null)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '600px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{selectedTask.id}</div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: 0 }}>{selectedTask.title}</h2>
              </div>
              <button onClick={() => setSelectedTask(null)} style={{ color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '60vh' }}>
              <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
                <span className={`badge ${getPriorityColor(selectedTask.priority)}`}>Priority: {selectedTask.priority}</span>
                <span className="badge badge-info">Requested by: {selectedTask.user}</span>
                <span className="badge badge-success">ROI: ~{selectedTask.hours} hrs/yr</span>
              </div>

              <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--text-dark)' }}>Problem Description</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24, padding: 16, backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                "{selectedTask.desc}"
              </p>

              {/* Copilot Insights Section */}
              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-purple)' }}>
                <Sparkles size={18} /> Copilot Insights from Submission
              </h3>
              <div style={{
                backgroundColor: 'rgba(114, 19, 234, 0.04)', borderLeft: '3px solid var(--accent-purple)',
                padding: '16px', borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Recommended Technology</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{selectedTask.aiTech}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Estimated Complexity</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{selectedTask.aiComp}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Estimated Timeline</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{selectedTask.aiTime}</div>
                </div>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {selectedTask.status === 'open' ? (
                <button style={{ color: '#E74C3C', backgroundColor: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }} onClick={() => setSelectedTask(null)}>
                  <X size={16} /> Mark as Duplicate (Triage)
                </button>
              ) : <div></div>}
              <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-secondary" onClick={() => setSelectedTask(null)}>Close</button>
                {selectedTask.status === 'open' ? (
                  <button className="btn-primary" onClick={() => setSelectedTask(null)}>Pick This Task</button>
                ) : (
                  <button className="btn-primary" disabled style={{ opacity: 0.6 }}>Already Assigned</button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

export default BrowseRequests;
