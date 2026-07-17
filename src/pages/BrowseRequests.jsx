import React, { useState } from 'react';
import { MoreHorizontal, MessageSquare, Paperclip, User, X, Sparkles, Trash2, Plus, Users } from 'lucide-react';

const DEMO_CURRENT_USER = 'Vikram (Dev)'; // Simulates the logged-in developer

const BrowseRequests = () => {
  const [selectedTask, setSelectedTask] = useState(null);
  const [showAddTeammate, setShowAddTeammate] = useState(false);
  const [newMate, setNewMate] = useState({ name: '', share: '' });
  const [dupJustification, setDupJustification] = useState('');
  const [showPickAnyway, setShowPickAnyway] = useState(false);
  const [showFlagExisting, setShowFlagExisting] = useState(false);
  const [existingTeamDetails, setExistingTeamDetails] = useState('');
  const [toastMessage, setToastMessage] = useState('');
  
  // Filter States
  const [showMyBoard, setShowMyBoard] = useState(false);
  const [filterPriority, setFilterPriority] = useState('All');

  const ALL_DEVELOPERS = ['Anjali (UI)', 'Shantanu', 'Rohan (QA)', 'Yuvraj', 'Sukhvinder', 'Aditi', 'Priya (Design)', 'Kiran'];

  const initialTasks = [
    { 
      id: 'REQ-022', title: 'Microsite Builder with React', category: 'React', priority: 'High', status: 'done', hours: 300, date: 'Oct 05',
      team: [{ name: 'Vikram (Dev)', share: 70 }, { name: 'Anjali (UI)', share: 30 }],
      desc: 'We need a tool to quickly generate microsites for marketing campaigns using standard templates.',
      dept: 'Marketing', frequency: 'Monthly', timeBefore: '8 hrs', timeAfter: '30 min',
      idealSolution: 'A web tool where we fill a form and microsite auto-generates.',
      benefits: 'Save 7.5 hrs/month, reduce dependency on agency.',
      attachments: 1,
      aiTech: 'Custom React Web App', aiComp: 'Very High', aiTime: '6+ Weeks', pickedBy: 'Vikram (Dev)'
    },
    { 
      id: 'REQ-023', title: 'Banner Creator with React', category: 'React', priority: 'Medium', status: 'done', hours: 150, date: 'Oct 10',
      team: [{ name: 'Shantanu', share: 100 }],
      desc: 'Automate the generation of standard size web banners from uploaded images and text.',
      dept: 'Design', frequency: 'Weekly', timeBefore: '3 hrs', timeAfter: '15 min',
      idealSolution: 'Upload image + type text → system exports all banner sizes automatically.',
      benefits: 'Save 2.5 hrs/week, consistent brand output.',
      attachments: 2,
      aiTech: 'Custom React Web App', aiComp: 'Medium', aiTime: '3 Weeks', pickedBy: 'Shantanu'
    },
    { 
      id: 'REQ-024', title: 'Email Generator with Vue.js', category: 'Vue.js', priority: 'High', status: 'dev', hours: 120, date: 'Oct 12',
      team: [{ name: 'Sukhvinder', share: 60 }, { name: 'Rohan (QA)', share: 40 }],
      desc: 'Internal tool to generate standard HTML email templates for newsletters.',
      dept: 'Communications', frequency: 'Weekly', timeBefore: '2 hrs', timeAfter: '20 min',
      idealSolution: 'A form-based editor that outputs ready-to-send HTML email code.',
      benefits: 'Reduce errors, save 1.5 hrs per campaign.',
      attachments: 0,
      aiTech: 'Vue.js Application', aiComp: 'Medium', aiTime: '2 Weeks', pickedBy: 'Sukhvinder'
    },
    { 
      id: 'REQ-025', title: 'QC Automate with Cloud Code', category: 'Cloud Code', priority: 'Critical', status: 'test', hours: 250, date: 'Oct 15',
      team: [{ name: 'Yuvraj', share: 100 }],
      desc: 'Automate quality control checks for our deployments using cloud scripts.',
      dept: 'IT', frequency: 'Daily', timeBefore: '2 hrs', timeAfter: '5 min',
      idealSolution: 'A scheduled cloud script that runs QC checks and emails a pass/fail report.',
      benefits: 'Prevent human error, save 1.9 hrs/day across team.',
      attachments: 1,
      aiTech: 'Azure Functions / Cloud Code', aiComp: 'High', aiTime: '4 Weeks', pickedBy: 'Yuvraj'
    },
    { 
      id: 'REQ-026', title: 'Onboarding App with PowerApp', category: 'PowerApps/Automate', priority: 'High', status: 'open', hours: 180, date: 'Oct 18',
      team: [],
      desc: 'I need a data entry form for employee onboarding so HR can stop using manual Excel files.',
      dept: 'HR', frequency: 'Ad-hoc', timeBefore: '3 hrs', timeAfter: '30 min',
      idealSolution: 'A Power Apps form that auto-fills SharePoint and emails the manager.',
      benefits: 'Eliminate manual errors, track onboarding status in real-time.',
      attachments: 1,
      aiTech: 'Power Apps (Canvas App)', aiComp: 'High', aiTime: '4 Weeks',
      isPotentialDuplicate: true, duplicateOf: 'REQ-023', pickedBy: null,
      isApproved: false, approvedAt: null
    },
    { 
      id: 'REQ-027', title: 'Leave Request System', category: 'Power Apps', priority: 'Medium', status: 'picked', hours: 80, date: 'Oct 20',
      team: [{ name: 'Vikram (Dev)', share: 100 }],
      desc: 'A simple app for employees to submit leave requests and managers to approve them.',
      dept: 'HR', frequency: 'Ad-hoc', timeBefore: '1 hr', timeAfter: '5 min',
      idealSolution: 'A mobile-friendly Power App with approval workflow.',
      benefits: 'Paperless approvals, real-time leave balance visibility.',
      attachments: 0,
      aiTech: 'Power Automate + SharePoint', aiComp: 'Low', aiTime: '1 Week', pickedBy: 'Vikram (Dev)'
    },
    { 
      id: 'REQ-028', title: 'Automated Excel Reports', category: 'Power Automate', priority: 'High', status: 'open', hours: 100, date: 'Oct 22',
      team: [],
      desc: 'We spend hours manually merging 5 different Excel files for the weekly sales report. Need this automated.',
      dept: 'Finance', frequency: 'Weekly', timeBefore: '4 hrs', timeAfter: '0 min',
      idealSolution: 'A Flow that auto-merges files every Monday morning and emails the report.',
      benefits: 'Save full 4 hrs/week, zero manual errors in finance reports.',
      attachments: 3,
      aiTech: 'Power Automate (Cloud Flow)', aiComp: 'Low', aiTime: '1 Week', pickedBy: null,
      isApproved: true, approvedAt: '22 Oct 2026, 11:30 AM'
    },
    { 
      id: 'REQ-029', title: 'PPT Presentation Generator', category: 'Cloud Code', priority: 'Medium', status: 'picked', hours: 60, date: 'Oct 24',
      team: [{ name: 'Rohan', share: 100 }],
      desc: 'Need a script to automatically generate standard PowerPoint slide decks from SharePoint lists for the monthly review.',
      dept: 'Operations', frequency: 'Monthly', timeBefore: '3 hrs', timeAfter: '10 min',
      idealSolution: 'A Python script triggered monthly that reads SharePoint and generates PPT.',
      benefits: 'Consistent slide format, save 3 hrs/month for all PMs.',
      attachments: 1,
      aiTech: 'Power Automate + Python', aiComp: 'Medium', aiTime: '2 Weeks', pickedBy: 'Rohan'
    },
    { 
      id: 'REQ-030', title: 'Invoice Data Extraction', category: 'AI Builder', priority: 'Critical', status: 'test', hours: 400, date: 'Oct 25',
      team: [{ name: 'Aditi', share: 100 }],
      desc: 'Extract data from PDF invoices and automatically push it into our ERP system to avoid manual data entry.',
      dept: 'Finance', frequency: 'Daily', timeBefore: '4 hrs', timeAfter: '5 min',
      idealSolution: 'AI Builder reads PDF, extracts key fields, pushes to ERP automatically.',
      benefits: 'Eliminate 4 hrs/day of manual data entry, near-zero errors.',
      attachments: 2,
      aiTech: 'Power Automate + AI Builder', aiComp: 'High', aiTime: '3 Weeks', pickedBy: 'Aditi'
    },
  ];
  const [tasks, setTasks] = useState(initialTasks);

  const filteredTasks = tasks.filter(t => {
    // 1. My Board Filter
    if (showMyBoard) {
      const isMine = t.team.some(m => m.name === DEMO_CURRENT_USER) || t.pickedBy === DEMO_CURRENT_USER;
      if (!isMine) return false;
    }
    // 2. Priority Filter
    if (filterPriority !== 'All') {
      if (t.priority !== filterPriority) return false;
    }
    return true;
  });

  const columns = [
    { id: 'open', title: 'Open / Unassigned' },
    { id: 'picked', title: 'Picked / Planning' },
    { id: 'dev', title: 'Development' },
    { id: 'test', title: 'Testing / UAT' },
    { id: 'done', title: 'Completed' },
  ];

  const usedShares = (task) => task.team.reduce((sum, m) => sum + Number(m.share), 0);
  const remainingShare = (task) => 100 - usedShares(task);

  const handleAddTeammate = () => {
    if (!newMate.name || !newMate.share) return;
    const shareNum = Number(newMate.share);
    if (shareNum <= 0 || shareNum >= 100) return;
    
    // Auto-deduct from Lead's share
    const updated = tasks.map(t => {
      if (t.id !== selectedTask.id) return t;
      const newTeam = t.team.map(m => 
        m.name === t.pickedBy 
          ? { ...m, share: Math.max(1, m.share - shareNum) } // Lead's share reduces, min 1%
          : m
      );
      return { ...t, team: [...newTeam, { name: newMate.name, share: shareNum }] };
    });
    const updatedTask = updated.find(t => t.id === selectedTask.id);
    setTasks(updated);
    setSelectedTask(updatedTask);
    setNewMate({ name: '', share: '' });
    setShowAddTeammate(false);
  };

  const handleRemoveTeammate = (memberName) => {
    if (memberName === selectedTask.pickedBy) return; // Can't remove the primary picker
    
    // Find removed member's share to return it to Lead
    const removedShare = selectedTask.team.find(m => m.name === memberName)?.share || 0;
    
    const updated = tasks.map(t => {
      if (t.id !== selectedTask.id) return t;
      const newTeam = t.team
        .filter(m => m.name !== memberName) // Remove the member
        .map(m => m.name === t.pickedBy
          ? { ...m, share: m.share + removedShare } // Return their % to Lead
          : m
        );
      return { ...t, team: newTeam };
    });
    const updatedTask = updated.find(t => t.id === selectedTask.id);
    setTasks(updated);
    setSelectedTask(updatedTask);
  };

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
          <select 
            value={filterPriority} 
            onChange={(e) => setFilterPriority(e.target.value)}
            style={{ 
              padding: '6px 12px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', 
              backgroundColor: filterPriority !== 'All' ? 'rgba(37,99,235,0.05)' : 'var(--card-white)', 
              color: filterPriority !== 'All' ? 'var(--primary-blue)' : 'var(--text-dark)',
              fontWeight: filterPriority !== 'All' ? 600 : 400,
              fontSize: '0.9rem', cursor: 'pointer' 
            }}
          >
            <option value="All">All Priorities</option>
            <option value="Critical">🔥 Critical Only</option>
            <option value="High">🔴 High Only</option>
            <option value="Medium">🟡 Medium Only</option>
          </select>
          <button 
            className={showMyBoard ? "btn-primary" : "btn-secondary"} 
            onClick={() => setShowMyBoard(!showMyBoard)}
          >
            {showMyBoard ? "Viewing My Board" : "My Board"}
          </button>
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
                {filteredTasks.filter(t => t.status === col.id).length}
              </span>
            </div>
            
            <div className="kanban-cards">
              {filteredTasks.filter(t => t.status === col.id).map(task => (
                <div key={task.id} className="kanban-card" onClick={() => setSelectedTask(task)}
                  style={{ border: task.isPotentialDuplicate ? '1px solid rgba(231,76,60,0.4)' : undefined }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{task.id}</span>
                    <button style={{ color: 'var(--text-muted)' }} onClick={(e) => e.stopPropagation()}><MoreHorizontal size={16} /></button>
                  </div>

                  {task.isPotentialDuplicate && task.duplicateOf && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 5, marginBottom: 8,
                      backgroundColor: 'rgba(231,76,60,0.08)', border: '1px solid rgba(231,76,60,0.25)',
                      borderRadius: 6, padding: '3px 8px', fontSize: '0.73rem', fontWeight: 600, color: '#C0392B'
                    }}>
                      ⚠️ Duplicate of <span style={{ textDecoration: 'underline', marginLeft: 2 }}>{task.duplicateOf}</span>
                    </div>
                  )}

                  <div className="card-title">{task.title}</div>
                  
                  {task.status === 'open' && task.isApproved && (
                    <div style={{ fontSize: '0.73rem', color: 'var(--success-green)', fontWeight: 600, marginBottom: 8 }}>
                      ✅ Approved on {task.approvedAt}
                    </div>
                  )}
                  {task.status === 'open' && task.isApproved === false && (
                    <div style={{ fontSize: '0.73rem', color: '#D68910', fontWeight: 600, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 4 }}>
                      🔒 Awaiting Manager Approval
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
                    <span className={`badge ${getPriorityColor(task.priority)}`}>{task.priority}</span>
                    <span className="badge badge-info">{task.category}</span>
                  </div>
                  
                  <div style={{ fontSize: '0.8rem', color: 'var(--success-green)', fontWeight: 500, marginBottom: 12 }}>
                    ~{task.hours} hrs/yr saved
                  </div>

                  <div className="card-meta">
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, flexWrap: 'wrap' }}>
                      <User size={14} /> 
                      {task.team.length > 0 ? task.team.map(m => m.name).join(', ') : 'Unassigned'}
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
            backgroundColor: 'var(--card-white)', width: '680px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', maxHeight: '90vh',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, marginBottom: 2 }}>{selectedTask.id}</div>
                <h2 style={{ fontSize: '1.1rem', color: 'var(--primary-blue)', margin: 0 }}>{selectedTask.title}</h2>
              </div>
              <button onClick={() => setSelectedTask(null)} style={{ color: 'var(--text-muted)' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '16px 24px', overflowY: 'auto', maxHeight: '65vh' }}>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
                <span className={`badge ${getPriorityColor(selectedTask.priority)}`}>Priority: {selectedTask.priority}</span>
                <span className="badge badge-info">Picked by: {selectedTask.pickedBy || 'Unassigned'}</span>
                <span className="badge badge-success">ROI: ~{selectedTask.hours} hrs/yr</span>
              </div>

              <h3 style={{ fontSize: '0.95rem', marginBottom: 6, color: 'var(--text-dark)' }}>Problem Description</h3>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.5, marginBottom: 16, padding: 12, backgroundColor: 'var(--bg-color)', borderRadius: 'var(--radius-md)' }}>
                "{selectedTask.desc}"
              </p>

              {/* Copilot Insights */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8, color: 'var(--accent-purple)', fontSize: '0.88rem', fontWeight: 600 }}>
                <Sparkles size={14} /> Copilot Insights
              </div>
              <div style={{
                backgroundColor: 'rgba(114, 19, 234, 0.04)', borderLeft: '3px solid var(--accent-purple)',
                padding: '10px 14px', borderRadius: '0 var(--radius-md) var(--radius-md) 0',
                display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, fontSize: '0.82rem'
              }}>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Technology</div>
                  <div style={{ fontWeight: 600, color: 'var(--primary-blue)' }}>{selectedTask.aiTech}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Complexity</div>
                  <div style={{ fontWeight: 600 }}>{selectedTask.aiComp}</div>
                </div>
                <div>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>Timeline</div>
                  <div style={{ fontWeight: 600 }}>{selectedTask.aiTime}</div>
                </div>
              </div>

              {/* Submission Details Grid */}
              <div style={{ marginTop: 14, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden', fontSize: '0.82rem' }}>
                <div style={{ padding: '8px 14px', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.83rem' }}>
                  📋 Submission Details (from requester)
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 0 }}>
                  {[  
                    { label: 'Department', value: selectedTask.dept },
                    { label: 'Frequency', value: selectedTask.frequency },
                    { label: 'Time Before Automation', value: selectedTask.timeBefore },
                    { label: 'Expected Time After', value: selectedTask.timeAfter },
                  ].map((item, i) => (
                    <div key={i} style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)', borderRight: i % 2 === 0 ? '1px solid var(--border-color)' : 'none' }}>
                      <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>{item.label}</div>
                      <div style={{ fontWeight: 600 }}>{item.value || '—'}</div>
                    </div>
                  ))}
                </div>
                <div style={{ padding: '8px 14px', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>💡 Ideal Solution (suggested by user)</div>
                  <div style={{ fontWeight: 500 }}>{selectedTask.idealSolution || '—'}</div>
                </div>
                <div style={{ padding: '8px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: 'var(--text-muted)', marginBottom: 2 }}>✅ Expected Benefits</div>
                    <div style={{ fontWeight: 500 }}>{selectedTask.benefits || '—'}</div>
                  </div>
                  {selectedTask.attachments > 0 && (
                    <div style={{ marginLeft: 12 }}>
                      <div style={{ color: 'var(--text-muted)', marginBottom: 2, fontSize: '0.75rem', textAlign: 'right' }}>Attachments</div>
                      <button style={{ 
                        display: 'flex', alignItems: 'center', gap: 6, 
                        backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--primary-blue)', 
                        border: '1px solid rgba(37,99,235,0.2)', borderRadius: '16px', 
                        padding: '4px 10px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' 
                      }}>
                        📎 View {selectedTask.attachments} file{selectedTask.attachments > 1 ? 's' : ''}
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Co-Owners / Assigned Team Section - Only for picked tasks */}
              {selectedTask.status !== 'open' && (
                <div style={{ marginTop: 24, border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
                  
                  {/* Section Header */}
                  <div style={{ padding: '12px 16px', backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '0.95rem', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Users size={15} /> Assigned Team & Points Share
                    </h3>
                    {/* Only Lead can Add Teammate — always visible to lead */}
                    {selectedTask.pickedBy === DEMO_CURRENT_USER && (
                      <button 
                        className="btn-secondary" 
                        style={{ fontSize: '0.75rem', padding: '4px 12px', display: 'flex', alignItems: 'center', gap: 4 }}
                        onClick={() => { setShowAddTeammate(!showAddTeammate); setNewMate({ name: '', share: '' }); }}
                      >
                        <Plus size={12} /> {showAddTeammate ? 'Cancel' : 'Add Teammate'}
                      </button>
                    )}
                  </div>

                  {/* Team members list */}
                  <div style={{ padding: 16 }}>
                    {selectedTask.team.map((member, i) => (
                      <div key={i} style={{ 
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '8px 12px', marginBottom: 8, borderRadius: 'var(--radius-md)',
                        backgroundColor: member.name === DEMO_CURRENT_USER ? 'rgba(37,99,235,0.05)' : 'var(--bg-color)',
                        border: `1px solid ${member.name === DEMO_CURRENT_USER ? 'var(--primary-blue)' : 'var(--border-color)'}`
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: 'var(--success-green)' }}></div>
                          <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{member.name}</span>
                          {member.name === selectedTask.pickedBy && (
                            <span style={{ fontSize: '0.7rem', backgroundColor: 'rgba(37,99,235,0.1)', color: 'var(--primary-blue)', padding: '1px 6px', borderRadius: 8, fontWeight: 600 }}>Lead</span>
                          )}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontWeight: 700, color: 'var(--success-green)', fontSize: '1rem' }}>{member.share}%</div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                              ~{Math.round(selectedTask.hours * member.share / 100)} pts earned
                            </div>
                          </div>
                          {/* Remove button - only Lead can remove, and can't remove themselves */}
                          {selectedTask.pickedBy === DEMO_CURRENT_USER && member.name !== DEMO_CURRENT_USER && (
                            <button onClick={() => handleRemoveTeammate(member.name)} style={{ color: '#E74C3C', background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                              <Trash2 size={14} />
                            </button>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* Remaining share indicator */}
                    {remainingShare(selectedTask) > 0 && (
                      <div style={{ textAlign: 'center', padding: '6px', fontSize: '0.78rem', color: '#E74C3C', borderTop: '1px dashed var(--border-color)', marginTop: 8 }}>
                        ⚠️ {remainingShare(selectedTask)}% unallocated
                      </div>
                    )}

                    {/* Add Teammate Form */}
                    {showAddTeammate && selectedTask.pickedBy === DEMO_CURRENT_USER && (
                      <div style={{ marginTop: 12, padding: 12, backgroundColor: 'rgba(37,99,235,0.04)', border: '1px solid var(--primary-blue)', borderRadius: 'var(--radius-md)' }}>
                        <div style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: 10, color: 'var(--primary-blue)' }}>+ Add New Teammate</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                          <div style={{ flex: 2 }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Select Developer / Designer</div>
                            <select 
                              value={newMate.name} 
                              onChange={e => setNewMate({ ...newMate, name: e.target.value })}
                              style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem', backgroundColor: 'var(--card-white)' }}
                            >
                              <option value="">-- Select Person --</option>
                              {ALL_DEVELOPERS.filter(d => !selectedTask.team.find(m => m.name === d)).map(d => (
                                <option key={d} value={d}>{d}</option>
                              ))}
                            </select>
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: 4 }}>Their Share %</div>
                            <input 
                              type="number" 
                              min="1" 
                              max="99"
                              placeholder="e.g. 30"
                              value={newMate.share}
                              onChange={e => setNewMate({ ...newMate, share: e.target.value })}
                              style={{ width: '100%', padding: '6px 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-color)', fontSize: '0.85rem' }}
                            />
                          </div>
                          <button 
                            className="btn-primary"
                            style={{ padding: '7px 16px', fontSize: '0.85rem', whiteSpace: 'nowrap' }}
                            onClick={handleAddTeammate}
                          >
                            Confirm
                          </button>
                        </div>
                        {newMate.share && (() => {
                          const leadShare = selectedTask.team.find(m => m.name === selectedTask.pickedBy)?.share || 0;
                          const newLeadShare = leadShare - Number(newMate.share);
                          return newLeadShare < 1 ? (
                            <div style={{ color: '#E74C3C', fontSize: '0.75rem', marginTop: 6 }}>⚠️ Max allowed: {leadShare - 1}%</div>
                          ) : (
                            <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', marginTop: 6 }}>Your share: {leadShare}% → {newLeadShare}%</div>
                          );
                        })()}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Footer with Duplicate Actions & Justification */}
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', flexDirection: 'column', gap: 12 }}>
              
              {/* Duplicate Text & Justification Input */}
              {selectedTask.status === 'open' && selectedTask.isPotentialDuplicate && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    🤖 <strong style={{ color: '#C0392B' }}>Duplicate Detected:</strong> Matches existing request 
                    <span style={{ color: '#C0392B', fontWeight: 700, marginLeft: 4 }}>
                      {selectedTask.duplicateOf ? selectedTask.duplicateOf : 'REQ-023'}
                    </span>
                    <span style={{ marginLeft: 4 }}>— "Banner Creator with React"</span>
                  </div>
                  
                  {showPickAnyway && (
                    <div style={{ marginTop: 4 }}>
                      <textarea
                        rows={2}
                        placeholder="Why are you picking this despite the duplicate flag? (mandatory)"
                        value={dupJustification}
                        onChange={e => setDupJustification(e.target.value)}
                        style={{
                          width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                          border: '1px solid #E74C3C', fontSize: '0.83rem', resize: 'none',
                          fontFamily: 'inherit', boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Flag Existing Form */}
              {selectedTask.status === 'open' && showFlagExisting && (
                <div style={{ marginBottom: 12, display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    🛑 <strong style={{ color: '#D68910' }}>Flag as Existing Solution:</strong> If another team already built this, provide details so we can redirect the user.
                  </div>
                  <textarea
                    rows={2}
                    placeholder="Which team has this? Please provide any link or contact info..."
                    value={existingTeamDetails}
                    onChange={e => setExistingTeamDetails(e.target.value)}
                    style={{
                      width: '100%', padding: '8px 12px', borderRadius: 'var(--radius-sm)',
                      border: '1px solid #D68910', fontSize: '0.83rem', resize: 'none',
                      fontFamily: 'inherit', boxSizing: 'border-box'
                    }}
                  />
                </div>
              )}

              {/* Footer Buttons (All in one row) */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: 10 }}>
                <button className="btn-secondary" onClick={() => { setSelectedTask(null); setShowPickAnyway(false); setDupJustification(''); setShowFlagExisting(false); setExistingTeamDetails(''); }}>Close</button>
                
                {selectedTask.status === 'open' && selectedTask.isPotentialDuplicate && !showPickAnyway && (
                  <>
                    <button 
                      style={{ 
                        backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', 
                        borderRadius: 'var(--radius-sm)', padding: '7px 14px', fontWeight: 600, fontSize: '0.84rem', cursor: selectedTask.isApproved === false ? 'not-allowed' : 'pointer', opacity: selectedTask.isApproved === false ? 0.5 : 1 
                      }} 
                      onClick={() => selectedTask.isApproved !== false && setShowPickAnyway(true)}
                      disabled={selectedTask.isApproved === false}
                    >
                      {selectedTask.isApproved === false ? '🔒 Locked' : 'Pick Anyway'}
                    </button>
                    <button 
                      style={{ 
                        backgroundColor: '#E74C3C', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', 
                        padding: '7px 16px', fontWeight: 700, fontSize: '0.84rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5 
                      }} 
                      onClick={() => setSelectedTask(null)}
                    >
                      <X size={14} /> Close as Duplicate
                    </button>
                  </>
                )}

                {selectedTask.status === 'open' && selectedTask.isPotentialDuplicate && showPickAnyway && (
                  <button
                    disabled={!dupJustification.trim()}
                    onClick={() => { 
                      setToastMessage('Task picked! Justification saved.');
                      setTimeout(() => setToastMessage(''), 3000);
                      setSelectedTask(null); 
                      setShowPickAnyway(false); 
                      setDupJustification(''); 
                    }}
                    className="btn-primary"
                    style={{ fontSize: '0.82rem', opacity: dupJustification.trim() ? 1 : 0.5 }}
                  >
                    Confirm Pick
                  </button>
                )}

                {selectedTask.status === 'open' && !selectedTask.isPotentialDuplicate && (
                  selectedTask.isApproved === false ? (
                    <button className="btn-primary" disabled style={{ opacity: 0.6, cursor: 'not-allowed' }}>🔒 Awaiting Approval</button>
                  ) : showFlagExisting ? (
                    <button
                      disabled={!existingTeamDetails.trim()}
                      onClick={() => { 
                        setToastMessage('Request redirected to existing team.');
                        setTimeout(() => setToastMessage(''), 3000);
                        setSelectedTask(null); 
                        setShowFlagExisting(false); 
                        setExistingTeamDetails(''); 
                      }}
                      className="btn-primary"
                      style={{ fontSize: '0.82rem', opacity: existingTeamDetails.trim() ? 1 : 0.5, backgroundColor: '#D68910', borderColor: '#D68910' }}
                    >
                      Confirm Redirect
                    </button>
                  ) : (
                    <>
                      <button 
                        style={{ 
                          backgroundColor: 'transparent', color: 'var(--text-muted)', border: '1px solid var(--border-color)', 
                          borderRadius: 'var(--radius-sm)', padding: '7px 14px', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer' 
                        }} 
                        onClick={() => setShowFlagExisting(true)}
                      >
                        Redirect / Already Exists
                      </button>
                      <button className="btn-primary" onClick={() => setSelectedTask(null)}>Pick This Task</button>
                    </>
                  )
                )}
                
                {selectedTask.status !== 'open' && (
                  <button className="btn-primary" disabled style={{ opacity: 0.6 }}>Already Assigned</button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
      {/* Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed', bottom: 24, right: 24, zIndex: 9999,
          backgroundColor: '#27ae60', color: '#fff', padding: '12px 20px',
          borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-lg)',
          display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.9rem', fontWeight: 600,
          animation: 'fadeSlideUp 0.3s ease-out'
        }}>
          <Sparkles size={16} /> {toastMessage}
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
};

export default BrowseRequests;
