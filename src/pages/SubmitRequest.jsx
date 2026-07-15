import React, { useState, useEffect } from 'react';
import { Sparkles, Save, Check, Plus, UploadCloud, Cpu, Loader, GitMerge, FileText } from 'lucide-react';

const SubmitRequest = () => {
  const [selectedFreq, setSelectedFreq] = useState('');
  const [desc, setDesc] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [requestType, setRequestType] = useState('new');
  const [enhancementReason, setEnhancementReason] = useState('');
  const [timeBeforeHrs, setTimeBeforeHrs] = useState('');

  const freqMultiplier = { 'Daily': 250, 'Weekly': 52, 'Monthly': 12, 'Ad-hoc': 1 };
  // ROI shown to user = max potential (full hours saved, Time After = 0)
  // Actual net saving will be confirmed by developer in My Picked Tasks
  const annualHours = parseFloat(timeBeforeHrs || 0) > 0 && selectedFreq
    ? (parseFloat(timeBeforeHrs) * (freqMultiplier[selectedFreq] || 0)).toFixed(0)
    : null;
  const monthlyHours = parseFloat(timeBeforeHrs || 0) > 0 && selectedFreq
    ? (parseFloat(timeBeforeHrs) * (freqMultiplier[selectedFreq] || 0) / 12).toFixed(1)
    : null;

  useEffect(() => {
    if (desc.length < 15) {
      setAiSuggestion(null);
      setIsTyping(false);
      return;
    }
    setIsTyping(true);
    const timer = setTimeout(() => {
      const text = desc.toLowerCase();
      let result = {
        tech: 'Power Automate + SharePoint',
        comp: 'Medium',
        time: '2-3 Weeks',
        message: 'Based on your input, a standard approval or tracking workflow is recommended.',
        duplicate: null,
        duplicateDev: null,
        duplicateRef: null
      };

      if (text.includes('leave') || text.includes('onboarding')) {
        result.duplicate = 'HR Leave & Onboarding System';
        result.duplicateDev = 'Vikram';
        result.duplicateRef = 'REQ-026';
      } else if (text.includes('banner') || text.includes('creator')) {
        result.duplicate = 'Banner Creator with React';
        result.duplicateDev = 'Shantanu';
        result.duplicateRef = 'REQ-023';
      } else if (text.includes('microsite')) {
        result.duplicate = 'Microsite Builder with React';
        result.duplicateDev = 'Vikram';
        result.duplicateRef = 'REQ-022';
      }

      if (text.includes('excel') || text.includes('email') || text.includes('attachment') || text.includes('pdf')) {
        result.tech = 'Power Automate (Cloud Flow)';
        result.comp = 'Low';
        result.time = '1 Week';
        result.message = 'Since you mentioned emails/Excel, Power Automate is perfect for background data processing and extraction.';
      } else if (text.includes('form') || text.includes('app') || text.includes('data entry') || text.includes('screen')) {
        result.tech = 'Power Apps (Canvas App)';
        result.comp = 'High';
        result.time = '4 Weeks';
        result.message = 'A custom Power App will give you the UI forms and data validation needed for this process.';
      } else if (text.includes('report') || text.includes('dashboard') || text.includes('chart') || text.includes('kpi')) {
        result.tech = 'Power BI Dashboard';
        result.comp = 'Medium';
        result.time = '2 Weeks';
        result.message = 'Power BI is the ideal tool for visualizing the reports and KPIs you described.';
      } else if (text.includes('react') || text.includes('custom') || text.includes('website')) {
        result.tech = 'Custom React Web App';
        result.comp = 'Very High';
        result.time = '6+ Weeks';
        result.message = 'This sounds like a highly custom requirement. A Pro-Code React application is recommended over low-code.';
      }

      setAiSuggestion(result);
      setIsTyping(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, [desc]);

  const hasDuplicate = aiSuggestion?.duplicate;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, flexShrink: 0 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 4, color: 'var(--primary-blue)' }}>Submit Automation Request</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', margin: 0 }}>Describe your manual process and our Copilot will recommend the best approach.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn-primary" style={{ backgroundColor: 'var(--success-green)', padding: '6px 16px', fontSize: '0.9rem' }}>
            {requestType === 'enhancement' ? 'Submit Enhancement' : 'Submit Request'} <Check size={16} />
          </button>
        </div>
      </div>

      {/* Request Type Toggle — shown only when duplicate detected */}
      {hasDuplicate && (
        <div style={{
          display: 'flex', gap: 12, marginBottom: 16, padding: '14px 20px',
          backgroundColor: 'rgba(243,156,18,0.06)', border: '1px solid rgba(243,156,18,0.3)',
          borderRadius: 'var(--radius-md)', alignItems: 'center', flexShrink: 0,
          animation: 'fadeSlideUp 0.3s ease-out'
        }}>
          <span style={{ fontWeight: 600, fontSize: '0.9rem', color: '#D68910', marginRight: 8 }}>⚠️ Similar project found. Choose request type:</span>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, border: `2px solid ${requestType === 'new' ? 'var(--primary-blue)' : 'var(--border-color)'}`, backgroundColor: requestType === 'new' ? 'rgba(0,51,141,0.07)' : 'white' }}>
            <input type="radio" name="reqType" value="new" checked={requestType === 'new'} onChange={() => setRequestType('new')} />
            <FileText size={16} /> <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>New Request</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', padding: '8px 16px', borderRadius: 8, border: `2px solid ${requestType === 'enhancement' ? 'var(--accent-purple)' : 'var(--border-color)'}`, backgroundColor: requestType === 'enhancement' ? 'rgba(114,19,234,0.07)' : 'white' }}>
            <input type="radio" name="reqType" value="enhancement" checked={requestType === 'enhancement'} onChange={() => setRequestType('enhancement')} />
            <GitMerge size={16} /> <span style={{ fontWeight: 600, fontSize: '0.85rem' }}>Enhancement Request</span>
          </label>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 320px', gap: 24, flex: 1, minHeight: 0 }}>
        
        {/* Column 1: Problem & Process */}
        <div style={{ backgroundColor: 'var(--card-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflowY: 'auto' }}>
          <div style={{ padding: '20px 24px' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--primary-blue)' }}>1. Problem & Process</h2>
            
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Describe the manual task</label>
              <textarea 
                className="form-control" 
                style={{ minHeight: '120px', fontSize: '0.9rem' }}
                placeholder='Try typing "Banner", "Leave", "Email", "Dashboard", or "React" to see Copilot in action!'
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
              ></textarea>
            </div>

            {/* Enhancement fields — shown when enhancement type selected */}
            {requestType === 'enhancement' && hasDuplicate && (
              <div style={{ marginBottom: 20, padding: 16, backgroundColor: 'rgba(114,19,234,0.04)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(114,19,234,0.15)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-purple)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <GitMerge size={14} /> Enhancement details for: {aiSuggestion.duplicate}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8 }}>
                  Original Developer: <strong>{aiSuggestion.duplicateDev}</strong> &nbsp;|&nbsp; Reference: <strong>{aiSuggestion.duplicateRef}</strong>
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--success-green)', fontWeight: 600, marginBottom: 12 }}>
                  ✓ This request will be auto-assigned to {aiSuggestion.duplicateDev} and linked as {aiSuggestion.duplicateRef}-v2.0
                </div>
                <label className="form-label" style={{ fontSize: '0.85rem' }}>Why is existing solution not enough?</label>
                <textarea
                  className="form-control"
                  style={{ minHeight: '80px', fontSize: '0.85rem' }}
                  placeholder="e.g. Need mobile support, need Vue.js version, need extra columns..."
                  value={enhancementReason}
                  onChange={(e) => setEnhancementReason(e.target.value)}
                ></textarea>
              </div>
            )}

            {/* "Why not enough?" for New Request when duplicate exists */}
            {requestType === 'new' && hasDuplicate && (
              <div style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ fontSize: '0.95rem', color: '#D68910' }}>Why is the existing solution not enough? *</label>
                <textarea
                  className="form-control"
                  style={{ minHeight: '80px', fontSize: '0.9rem', borderColor: 'rgba(243,156,18,0.5)' }}
                  placeholder="Required: Explain what the existing app lacks..."
                  value={enhancementReason}
                  onChange={(e) => setEnhancementReason(e.target.value)}
                ></textarea>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Current Steps</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 12 }}>
                <input type="text" className="form-control" style={{ fontSize: '0.9rem', padding: '10px 12px' }} placeholder="1. E.g. Download file" />
                <input type="text" className="form-control" style={{ fontSize: '0.9rem', padding: '10px 12px' }} placeholder="2. E.g. Clean data" />
              </div>
              <button className="btn-secondary" style={{ fontSize: '0.85rem', padding: '6px 12px' }}><Plus size={14} /> Add Step</button>
            </div>
          </div>
        </div>

        {/* Column 2: Details & Outcome */}
        <div style={{ backgroundColor: 'var(--card-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', overflowY: 'auto' }}>
          <div style={{ padding: '20px 24px' }}>
            <h2 style={{ fontSize: '1.1rem', marginBottom: 16, color: 'var(--primary-blue)' }}>2. Details & Expected Outcome</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Frequency</label>
                <select className="form-control" style={{ fontSize: '0.9rem', padding: '10px 12px' }} onChange={(e) => setSelectedFreq(e.target.value)}>
                  <option value="" disabled>Select...</option>
                  <option>Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option>Monthly</option>
                </select>
              </div>
              <div>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Time BEFORE Automation (hrs)</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ fontSize: '0.9rem', padding: '10px 12px' }}
                  placeholder="e.g. 5"
                  min="0" step="0.5"
                  value={timeBeforeHrs}
                  onChange={(e) => setTimeBeforeHrs(e.target.value)}
                />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: 4 }}>Hours currently spent per occurrence</div>
              </div>
            </div>

            {/* ROI Estimate Banner — based on Time BEFORE only (developer will confirm Time After) */}
            {annualHours && (
              <div style={{ padding: '12px 16px', backgroundColor: 'rgba(0,184,148,0.08)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(0,184,148,0.3)', marginBottom: 16, animation: 'fadeSlideUp 0.3s ease-out' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--success-green)', marginBottom: 4 }}>⚡ Potential ROI Estimate (Oct–Sep FY)</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 10 }}>Based on your current time. Developer will confirm actual saving after automation is built.</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, fontSize: '0.8rem' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Per Occurrence</div>
                    <div style={{ fontWeight: 700 }}>{timeBeforeHrs} hrs</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Per Month (max)</div>
                    <div style={{ fontWeight: 700 }}>{monthlyHours} hrs</div>
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-muted)' }}>Per Year (max)</div>
                    <div style={{ fontWeight: 700, color: 'var(--success-green)', fontSize: '1rem' }}>{annualHours} hrs</div>
                  </div>
                </div>
              </div>
            )}

            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Ideal Solution</label>
              <input type="text" className="form-control" style={{ fontSize: '0.9rem', padding: '10px 12px' }} placeholder="e.g. Automated Dashboard" />
            </div>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label" style={{ fontSize: '0.95rem', marginBottom: 8 }}>Expected Benefits</label>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                {['Save Time', 'Reduce Errors', 'Better Reporting'].map(benefit => (
                  <span key={benefit} style={{ padding: '6px 12px', border: '1px solid var(--border-color)', borderRadius: '20px', fontSize: '0.8rem', cursor: 'pointer', backgroundColor: 'var(--bg-color)' }}>
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" style={{ fontSize: '0.95rem' }}>Attachments</label>
              <div style={{ border: '2px dashed var(--border-color)', borderRadius: 'var(--radius-md)', padding: '20px', textAlign: 'center', color: 'var(--text-muted)', cursor: 'pointer', backgroundColor: 'var(--bg-color)' }}>
                <UploadCloud size={24} style={{ margin: '0 auto 8px', color: 'var(--secondary-blue)' }} />
                <div style={{ fontSize: '0.85rem' }}>Drag files or click</div>
              </div>
            </div>
          </div>
        </div>

        {/* Column 3: AI Copilot */}
        <div style={{ backgroundColor: 'var(--card-white)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)', display: 'flex', flexDirection: 'column', boxShadow: 'var(--shadow-sm)', overflowY: 'auto' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: 10, color: 'var(--accent-purple)', fontWeight: 600, position: 'sticky', top: 0, backgroundColor: 'var(--card-white)', zIndex: 1 }}>
            <Cpu size={20} /> Automation Copilot
          </div>
          <div style={{ padding: '20px', flex: 1 }}>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 20, lineHeight: 1.5 }}>
              I will analyze your request and suggest the best approach as you fill out the form.
            </p>
            {isTyping ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--accent-purple)', fontSize: '0.85rem', fontStyle: 'italic' }}>
                <Loader size={16} className="spin-animation" /> Analyzing keywords...
              </div>
            ) : aiSuggestion ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {aiSuggestion.duplicate && (
                  <div style={{ backgroundColor: 'rgba(243,156,18,0.1)', borderLeft: '3px solid #F39C12', padding: '12px', borderRadius: '0 var(--radius-md) var(--radius-md) 0', animation: 'fadeSlideUp 0.3s ease-out forwards' }}>
                    <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 6, color: '#D68910' }}>⚠️ Similar Tool Exists!</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-dark)', marginBottom: 8, lineHeight: 1.5 }}>
                      <strong>{aiSuggestion.duplicate}</strong> already exists (built by <strong>{aiSuggestion.duplicateDev}</strong>).
                      <br/><br/>
                      Select <strong>"Enhancement Request"</strong> above if you want a new feature added to it — it will be auto-assigned to <strong>{aiSuggestion.duplicateDev}</strong>.
                    </div>
                    <button style={{ backgroundColor: 'transparent', border: '1px solid #D68910', color: '#D68910', padding: '4px 12px', borderRadius: 4, fontSize: '0.75rem', cursor: 'pointer' }}>
                      View Existing App
                    </button>
                  </div>
                )}
                <div style={{ backgroundColor: 'rgba(114,19,234,0.04)', borderLeft: '3px solid var(--accent-purple)', padding: '12px', borderRadius: '0 var(--radius-md) var(--radius-md) 0', animation: 'fadeSlideUp 0.3s ease-out' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={14} color="var(--accent-purple)" /> Recommendation
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 8, lineHeight: 1.5 }}>{aiSuggestion.message}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--primary-blue)', fontWeight: 600 }}>{aiSuggestion.tech}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(0,184,148,0.04)', borderLeft: '3px solid var(--success-green)', padding: '12px', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
                  <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Sparkles size={14} color="var(--success-green)" /> ROI & Complexity
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>
                    <strong>Complexity:</strong> {aiSuggestion.comp}<br/>
                    <strong>Est. Time:</strong> {aiSuggestion.time}<br/>
                    {annualHours ? (
                      <span><strong>ROI (Oct–Sep FY):</strong> <span style={{ color: 'var(--success-green)', fontWeight: 700 }}>{annualHours} hrs/year saved</span> ({monthlyHours} hrs/month)</span>
                    ) : (
                      <span><strong>ROI:</strong> Fill in time fields above to calculate</span>
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <Cpu size={48} style={{ opacity: 0.3, marginBottom: 12 }} />
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Waiting for details...</div>
              </div>
            )}
          </div>
        </div>

      </div>
      <style>{`
        .spin-animation { animation: spin 2s linear infinite; }
        @keyframes spin { 100% { transform: rotate(360deg); } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default SubmitRequest;
