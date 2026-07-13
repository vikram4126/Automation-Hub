import React, { useState } from 'react';
import { Search, Filter, Eye, X, Sparkles, CheckCircle, Clock } from 'lucide-react';

const MyRequests = () => {
  const [selectedReq, setSelectedReq] = useState(null);

  const requests = [
    { 
      id: 'REQ-021', title: 'Automated Leave Balance Email', status: 'In Progress', date: 'Oct 20, 2026', owner: 'Priya Patel',
      desc: 'Send an automated email to all employees on the 1st of every month with their current leave balance from the HR system.',
      aiTech: 'Power Automate', aiComp: 'Medium', aiTime: '2 Weeks',
      progress: 60, deadline: 'Nov 10, 2026'
    },
    { 
      id: 'REQ-019', title: 'Data Extraction from PDF', status: 'Completed', date: 'Oct 15, 2026', owner: 'Rahul Sharma',
      desc: 'Extract invoice numbers and amounts from vendor PDFs and save them to a SharePoint list.',
      aiTech: 'Power Automate + AI Builder', aiComp: 'High', aiTime: '4 Weeks',
      progress: 100, deadline: 'Nov 01, 2026'
    },
    { 
      id: 'REQ-011', title: 'Weekly Meeting Minutes Bot', status: 'Pending Review', date: 'Oct 02, 2026', owner: 'Unassigned',
      desc: 'A bot in Teams that summarizes the weekly team meeting notes and emails them.',
      aiTech: 'Teams Bot + Power Automate', aiComp: 'Medium', aiTime: '3 Weeks',
      progress: 0, deadline: 'TBD'
    },
  ];

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>My Requests</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track the status of the automations you have requested.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="search-bar" style={{ width: 250 }}>
            <Search size={16} />
            <input type="text" placeholder="Search..." />
          </div>
          <button className="btn-secondary"><Filter size={16} /> Filter</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Request ID</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Title</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Submitted On</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Status</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Owner</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req, idx) => (
              <tr key={req.id} style={{ borderBottom: idx !== requests.length - 1 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '16px 24px', fontWeight: 500 }}>{req.id}</td>
                <td style={{ padding: '16px 24px' }}>{req.title}</td>
                <td style={{ padding: '16px 24px', color: 'var(--text-muted)' }}>{req.date}</td>
                <td style={{ padding: '16px 24px' }}>
                  <span className={`badge ${req.status === 'Completed' ? 'badge-success' : req.status === 'In Progress' ? 'badge-info' : 'badge-warning'}`}>
                    {req.status}
                  </span>
                </td>
                <td style={{ padding: '16px 24px' }}>{req.owner}</td>
                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                  <button className="btn-secondary" style={{ padding: '6px 12px' }} onClick={() => setSelectedReq(req)}>
                    <Eye size={14} /> View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Request Modal */}
      {selectedReq && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setSelectedReq(null)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '600px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 4 }}>{selectedReq.id}</div>
                <h2 style={{ fontSize: '1.4rem', color: 'var(--primary-blue)', margin: 0 }}>{selectedReq.title}</h2>
              </div>
              <button onClick={() => setSelectedReq(null)} style={{ color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>

            <div style={{ padding: '24px', overflowY: 'auto', maxHeight: '60vh' }}>
              
              <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
                <span className={`badge ${selectedReq.status === 'Completed' ? 'badge-success' : selectedReq.status === 'In Progress' ? 'badge-info' : 'badge-warning'}`}>
                  {selectedReq.status === 'Completed' ? <CheckCircle size={14} style={{marginRight: 4}}/> : <Clock size={14} style={{marginRight: 4}}/>}
                  Status: {selectedReq.status}
                </span>
                <span className="badge badge-info">Owner: {selectedReq.owner}</span>
              </div>

              {selectedReq.status !== 'Pending Review' && (
                <div style={{ marginBottom: 24, padding: 16, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: 8 }}>
                    <span style={{ fontWeight: 600 }}>Development Progress: {selectedReq.progress}%</span>
                    <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>Target: {selectedReq.deadline}</span>
                  </div>
                  <div style={{ height: 8, backgroundColor: 'var(--bg-color)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ width: `${selectedReq.progress}%`, height: '100%', backgroundColor: selectedReq.status === 'Completed' ? 'var(--success-green)' : 'var(--primary-blue)', borderRadius: 4 }}></div>
                  </div>
                </div>
              )}

              <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--text-dark)' }}>My Original Request</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 24, padding: 16, backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                "{selectedReq.desc}"
              </p>

              <h3 style={{ fontSize: '1.1rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-purple)' }}>
                <Sparkles size={18} /> Copilot Insights Saved
              </h3>
              <div style={{
                backgroundColor: 'rgba(114, 19, 234, 0.04)', borderLeft: '3px solid var(--accent-purple)',
                padding: '16px', borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Approved Technology</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{selectedReq.aiTech}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Complexity</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{selectedReq.aiComp}</div>
                </div>
                <div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 4 }}>Target Timeline</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-dark)' }}>{selectedReq.aiTime}</div>
                </div>
              </div>

            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setSelectedReq(null)}>Close</button>
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

export default MyRequests;
