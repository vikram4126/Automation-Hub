import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Clock, X, Save } from 'lucide-react';

const MyTasks = () => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progress, setProgress] = useState(60);
  const [comments, setComments] = useState('');

  const handleSave = () => {
    // In a real app, this would be a Power Fx Patch() call to SharePoint
    setShowProgressModal(false);
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>My Picked Tasks</h1>
        <p style={{ color: 'var(--text-muted)' }}>Update progress and upload deliverables for tasks you own.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Task Card */}
          <div className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600 }}>REQ-018</span>
                <h3 style={{ fontSize: '1.2rem', marginTop: 4 }}>Email Attachment Extraction</h3>
              </div>
              <span className="badge badge-info">In Progress</span>
            </div>
            
            <p style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: 20 }}>
              Build a Power Automate flow to extract attachments from a shared mailbox and save them to a designated SharePoint document library with specific naming conventions.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                <span style={{ fontWeight: 600 }}>Progress: {progress}%</span>
                <span style={{ color: 'var(--text-muted)' }}>Target: Oct 25, 2026</span>
              </div>
              <div style={{ height: 8, backgroundColor: 'var(--border-color)', borderRadius: 4, overflow: 'hidden' }}>
                <div style={{ width: `${progress}%`, height: '100%', backgroundColor: 'var(--primary-blue)' }}></div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn-primary" style={{ flex: 1, justifyContent: 'center' }} onClick={() => setShowProgressModal(true)}>
                Update Progress
              </button>
              <button className="btn-secondary" style={{ flex: 1, justifyContent: 'center' }}>
                <UploadCloud size={16} /> Upload Solution
              </button>
              <button className="btn-secondary" style={{ backgroundColor: 'var(--success-green)', color: 'white', border: 'none' }}>
                <CheckCircle size={16} /> Mark Complete
              </button>
            </div>
          </div>
        </div>

        <div>
          <div className="card">
            <h3 style={{ fontSize: '1.1rem', marginBottom: 16 }}>Upcoming Deadlines</h3>
            <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 40, borderRadius: 8, backgroundColor: 'rgba(243, 156, 18, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F39C12' }}>
                <Clock size={20} />
              </div>
              <div>
                <div style={{ fontWeight: 500, fontSize: '0.9rem' }}>REQ-018: Extraction Flow</div>
                <div style={{ fontSize: '0.8rem', color: '#F39C12', fontWeight: 600 }}>Due in 2 days</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Update Progress Modal */}
      {showProgressModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowProgressModal(false)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '500px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', margin: 0 }}>Update Task Progress</h2>
              <button onClick={() => setShowProgressModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ padding: '24px' }}>
              <div className="form-group" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="form-label" style={{ fontSize: '0.95rem', margin: 0 }}>Current Progress</label>
                  <span style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{progress}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" max="100" step="5"
                  value={progress}
                  onChange={(e) => setProgress(e.target.value)}
                  style={{ width: '100%', cursor: 'pointer', accentColor: 'var(--primary-blue)' }}
                />
              </div>

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Update Notes (Optional)</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '80px', fontSize: '0.9rem' }}
                  placeholder="e.g., Completed the API connection, working on the UI now."
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowProgressModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>
                <Save size={16} style={{ marginRight: 6 }} /> Save Update
              </button>
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

export default MyTasks;
