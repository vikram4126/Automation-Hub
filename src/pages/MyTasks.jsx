import React, { useState } from 'react';
import { UploadCloud, CheckCircle, Clock, X, Save } from 'lucide-react';

const MyTasks = () => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [progress, setProgress] = useState(60);
  const [taskStatus, setTaskStatus] = useState('dev'); // 'picked', 'dev', 'test', 'done'
  const [comments, setComments] = useState('');
  const [timeAfterHrs, setTimeAfterHrs] = useState('');
  const [selectedTechs, setSelectedTechs] = useState([]);
  const timeBeforeHrs = 5; // Dummy: comes from the original request submitted by user
  const frequency = 'Monthly'; // Dummy: comes from the original request
  const freqMultiplier = { 'Daily': 250, 'Weekly': 52, 'Monthly': 12, 'Ad-hoc': 1 };
  const netSaving = timeAfterHrs !== '' ? (timeBeforeHrs - parseFloat(timeAfterHrs)).toFixed(1) : null;
  const annualSaved = netSaving && parseFloat(netSaving) > 0
    ? (parseFloat(netSaving) * (freqMultiplier[frequency] || 0)).toFixed(0) : null;

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
              <span className={`badge ${
                taskStatus === 'done' ? 'badge-success' : 
                taskStatus === 'test' ? 'badge-warning' : 
                taskStatus === 'dev' ? 'badge-info' : 'badge-primary'
              }`}>
                {taskStatus === 'done' ? 'Completed' : 
                 taskStatus === 'test' ? 'Testing / UAT' : 
                 taskStatus === 'dev' ? 'In Development' : 'Picked / Planning'}
              </span>
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
              
              {/* Task Status Dropdown */}
              <div className="form-group" style={{ marginBottom: 24 }}>
                <label className="form-label" style={{ fontSize: '0.95rem', marginBottom: 8 }}>Current Status</label>
                <select 
                  className="form-control"
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  style={{ fontSize: '0.9rem', width: '100%' }}
                >
                  <option value="picked">Picked / Planning Phase</option>
                  <option value="dev">In Development</option>
                  <option value="test">Testing / UAT</option>
                  <option value="done">Completed & Deployed</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <label className="form-label" style={{ fontSize: '0.95rem', margin: 0 }}>Completion Progress</label>
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

              {/* Technology Checkboxes — Multi-select */}
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ fontSize: '0.95rem', marginBottom: 8 }}>Technologies Used <span style={{ color: '#E74C3C' }}>*</span></label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {['Power Automate', 'Power Apps', 'Power BI', 'React', 'Vue.js', 'SharePoint', 'AI Builder'].map(tech => (
                    <label key={tech} style={{ 
                      display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem',
                      padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '20px',
                      backgroundColor: selectedTechs.includes(tech) ? 'rgba(114, 19, 234, 0.1)' : 'var(--bg-color)',
                      borderColor: selectedTechs.includes(tech) ? 'var(--accent-purple)' : 'var(--border-color)',
                      color: selectedTechs.includes(tech) ? 'var(--accent-purple)' : 'var(--text-dark)',
                      cursor: 'pointer', transition: 'all 0.2s'
                    }}>
                      <input 
                        type="checkbox" 
                        style={{ display: 'none' }}
                        checked={selectedTechs.includes(tech)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedTechs([...selectedTechs, tech]);
                          else setSelectedTechs(selectedTechs.filter(t => t !== tech));
                        }}
                      />
                      {tech}
                    </label>
                  ))}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 8 }}>
                  Select all technologies you used to build this solution (e.g. Power Apps + Power Automate).
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Time AFTER Automation (hrs) <span style={{ color: '#E74C3C' }}>*</span></label>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Requester stated this took <strong>{timeBeforeHrs} hrs</strong> per <strong>{frequency.toLowerCase()}</strong> run before automation.
                </div>
                <input
                  type="number"
                  className="form-control"
                  style={{ fontSize: '0.9rem' }}
                  placeholder="e.g. 0.25 (15 mins)"
                  min="0" step="0.25"
                  value={timeAfterHrs}
                  onChange={(e) => setTimeAfterHrs(e.target.value)}
                />
                
                {/* Live Net Saving Display */}
                {annualSaved && (
                  <div style={{ marginTop: 12, padding: '12px 16px', backgroundColor: 'rgba(0,184,148,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,184,148,0.25)', marginBottom: 20, animation: 'fadeSlideUp 0.3s ease-out' }}>
                    <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success-green)', marginBottom: 8 }}>✅ Confirmed ROI (Oct–Sep FY)</div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: '0.8rem' }}>
                      <div>
                        <div style={{ color: 'var(--text-muted)' }}>Net per Occurrence</div>
                        <div style={{ fontWeight: 700 }}>{netSaving} hrs saved</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{timeBeforeHrs} − {timeAfterHrs} hrs</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)' }}>Per Month</div>
                        <div style={{ fontWeight: 700 }}>{(parseFloat(netSaving) * freqMultiplier[frequency] / 12).toFixed(1)} hrs</div>
                      </div>
                      <div>
                        <div style={{ color: 'var(--text-muted)' }}>Per Year</div>
                        <div style={{ fontWeight: 700, color: 'var(--success-green)', fontSize: '1rem' }}>{annualSaved} hrs</div>
                      </div>
                    </div>
                  </div>
                )}
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
