import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, Info, User, ThumbsUp, MessageCircle, Sparkles, Search, Zap, AlertCircle, X } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Home = () => {
  const { currentRole, ROLES } = useRole();
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [newIdeaDesc, setNewIdeaDesc] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  const [showGuide, setShowGuide] = useState(false);
  const [activeTab, setActiveTab] = useState('All');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  // Idea Board - Simple Community-First Approach
  // Ideas are visible to ALL immediately. Manager gets email. Community votes = social pressure.
  const [ideas, setIdeas] = useState([
    { id: 1, title: 'AI Chatbot for IT Helpdesk',   desc: 'A Copilot bot in Teams that answers basic IT questions and resets passwords automatically.', author: 'Vikram',      votes: 45, comments: 12, tag: 'AI/ML', approved: true,  approvedAt: '14 Jul 2026, 10:30 AM', deployed: false, pts: 60 },
    { id: 2, title: 'Expense Claim OCR',             desc: 'Scan receipts and automatically fill the expense SharePoint list using AI Builder.',          author: 'Sukhvinder', votes: 32, comments: 8,  tag: 'OCR',   approved: true,  approvedAt: '10 Jun 2026, 09:15 AM', deployed: true,  pts: 110 },
    { id: 3, title: 'Automated Birthday Greetings', desc: 'Power Automate flow to send personalized emails on employee birthdays.',                       author: 'Yuvraj',      votes: 15, comments: 4,  tag: 'Flow',  approved: false, approvedAt: null,                  deployed: false, pts: 10 },
    { id: 4, title: 'Auto Leave Approval Workflow', desc: 'Automate leave request approvals via Power Automate with manager notification emails.',        author: 'Kiran',       votes: 10, comments: 3,  tag: 'Flow',  approved: false, approvedAt: null,                  deployed: false, pts: 10 },
    { id: 5, title: 'Invoice Processing Bot',       desc: 'Read invoices from email and upload data to ERP system.',                                      author: 'Vikram',      votes: 22, comments: 5,  tag: 'RPA',   approved: true,  approvedAt: '12 Jul 2026, 04:20 PM', deployed: false, pts: 60 },
    { id: 6, title: 'New Hire Onboarding App',      desc: 'PowerApp for new hires to request equipment and access.',                                      author: 'Shantanu',    votes: 8,  comments: 1,  tag: 'App',   approved: false, approvedAt: null,                  deployed: false, pts: 10 },
  ]);

  // Tabs: All | Trending | Manager Approved | Deployed
  const tabs = ['All', 'Trending', 'Manager Approved', 'Deployed'];
  const filteredIdeas = (() => {
    if (activeTab === 'Trending')        return [...ideas].sort((a, b) => b.votes - a.votes);
    if (activeTab === 'Manager Approved') return ideas.filter(i => i.approved && !i.deployed);
    if (activeTab === 'Deployed')        return ideas.filter(i => i.deployed);
    return ideas;
  })();

  const getTabCount = (tabName) => {
    if (tabName === 'All') return ideas.length;
    if (tabName === 'Trending') return ideas.length;
    if (tabName === 'Manager Approved') return ideas.filter(i => i.approved && !i.deployed).length;
    if (tabName === 'Deployed') return ideas.filter(i => i.deployed).length;
    return 0;
  };

  const handleVote = (id) => {
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, votes: i.votes + 1 } : i));
  };

  const handleApprove = (id) => {
    const now = new Date();
    const formatted = now.toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, approved: true, approvedAt: formatted, pts: i.pts + 50 } : i));
  };

  const handlePostIdea = () => {
    const newIdea = {
      id: Date.now(),
      title: newIdeaTitle,
      desc: newIdeaDesc,
      author: 'You',
      votes: 0,
      comments: 0,
      tag: 'New',
      approved: false,
      approvedAt: null,
      deployed: false,
      pts: 10, // +10 for sharing
    };
    setIdeas(prev => [newIdea, ...prev]);
    setShowIdeaModal(false);
    setNewIdeaTitle('');
    setNewIdeaDesc('');
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 4000);
  };

  // Leaders data
  const leaders = [
    { rank: 1, name: 'Vikram',      points: 4500, apps: 12, flows: 34, hrsSaved: 850, title: 'Flow Expert' },
    { rank: 2, name: 'Yuvraj',      points: 3800, apps: 8,  flows: 22, hrsSaved: 620, title: 'Flow Expert' },
    { rank: 3, name: 'Shantanu',    points: 3200, apps: 5,  flows: 40, hrsSaved: 590, title: 'Flow Expert' },
    { rank: 4, name: 'Sukhvinder', points: 2900, apps: 6,  flows: 15, hrsSaved: 480, title: 'Rising Star' },
    { rank: 5, name: 'Kiran',       points: 1400, apps: 2,  flows: 10, hrsSaved: 210, title: 'Rising Star' },
  ];

  useEffect(() => {
    const text = newIdeaTitle.toLowerCase();
    if (text.includes('chatbot') || text.includes('helpdesk')) {
      setDuplicateWarning('AI Chatbot for IT Helpdesk');
    } else if (text.includes('expense') || text.includes('receipt')) {
      setDuplicateWarning('Expense Claim OCR');
    } else {
      setDuplicateWarning(null);
    }
  }, [newIdeaTitle]);

  return (
    <div style={{ position: 'relative', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: 24, textAlign: 'center', background: 'linear-gradient(135deg, var(--primary-blue), var(--pacific-blue))', padding: '24px', borderRadius: 'var(--radius-xl)', color: 'white', boxShadow: 'var(--shadow-md)' }}>
        <h1 style={{ fontSize: '1.8rem', marginBottom: 8, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
          <Sparkles size={24} /> Innovation & Leadership
        </h1>
        <p style={{ fontSize: '1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
          Discover the top contributors leading the automation revolution, and share your groundbreaking ideas to shape our future.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        
        {/* Left Column - Leadership Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Trophy color="#F1C40F" size={24} /> Top Innovators
            </h2>
            <button onClick={() => setShowGuide(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 16px', backgroundColor: 'transparent', border: '2px solid var(--primary-blue)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--primary-blue)', fontSize: '0.9rem', transition: 'all 0.2s' }} className="outline-btn">
              <Info size={15} /> How Points Work
            </button>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {leaders.map((leader, idx) => (
              <div key={leader.rank} style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                animationDelay: `${idx * 0.1}s`,
                animation: 'fadeSlideUp 0.5s ease-out forwards'
              }} className="leader-card">
                <div style={{ fontSize: '1.8rem', fontWeight: 800, color: leader.rank === 1 ? '#F1C40F' : leader.rank === 2 ? '#BDC3C7' : leader.rank === 3 ? '#CD7F32' : 'var(--border-color)', minWidth: '40px' }}>
                  #{leader.rank}
                </div>
                <div className="user-avatar" style={{ backgroundColor: 'var(--primary-blue)', width: 48, height: 48, fontSize: '1rem', flexShrink: 0 }}>
                  {leader.name.split(' ').map(n=>n[0]).join('')}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)' }}>{leader.name}</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{leader.title}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 800, color: 'var(--success-green)', fontSize: '1.2rem' }}>{leader.points} pts</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{leader.hrsSaved} hrs saved</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - Innovation Board */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '1.5rem', color: 'var(--dark-blue)', display: 'flex', alignItems: 'center', gap: 8 }}>
              <LightbulbIcon color="var(--primary-blue)" size={24} /> Idea Board
            </h2>
            <button className="btn-primary" onClick={() => setShowIdeaModal(true)} style={{ padding: '8px 18px', fontSize: '0.9rem', borderRadius: 'var(--radius-md)' }}>
              <Zap size={15} /> Share Idea
            </button>
          </div>

          {/* Status Tabs */}
          <div style={{ display: 'flex', gap: 8 }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setCurrentPage(1); }} style={{
                padding: '6px 14px', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', fontWeight: 600,
                border: '1px solid', cursor: 'pointer', transition: 'all 0.15s',
                backgroundColor: activeTab === tab ? 'var(--primary-blue)' : 'var(--bg-color)',
                color: activeTab === tab ? 'white' : 'var(--text-muted)',
                borderColor: activeTab === tab ? 'var(--primary-blue)' : 'var(--border-color)',
              }}>
                {tab} <span style={{ opacity: 0.8, fontSize: '0.75rem', marginLeft: 4 }}>({getTabCount(tab)})</span>
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {filteredIdeas.length === 0 && (
              <div style={{ textAlign: 'center', padding: '32px', color: 'var(--text-muted)', background: 'var(--bg-color)', borderRadius: 'var(--radius-lg)' }}>
                No ideas in this category yet.
              </div>
            )}
            {filteredIdeas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((idea, idx) => (
              <div key={idea.id} style={{
                background: idea.status === 'Pending Review' ? 'rgba(243,156,18,0.04)' : 'rgba(255,255,255,0.7)',
                backdropFilter: 'blur(10px)',
                border: `1px solid ${idea.status === 'Pending Review' ? '#F39C12' : 'var(--border-color)'}`,
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                gap: '20px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                animationDelay: `${idx * 0.1}s`,
                animation: 'fadeSlideUp 0.5s ease-out forwards'
              }} className="idea-card">

                {/* Vote Column */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, minWidth: 52 }}>
                  <button onClick={() => handleVote(idea.id)} style={{ color: 'var(--primary-blue)', backgroundColor: 'rgba(30,73,226,0.1)', padding: 10, borderRadius: 10, transition: 'all 0.2s', border: 'none', cursor: 'pointer' }} className="vote-btn">
                    <ThumbsUp size={18} />
                  </button>
                  <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-dark)' }}>{idea.votes}</span>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>votes</span>
                </div>

                {/* Content */}
                <div style={{ flex: 1 }}>
                  {/* Title + badges */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-dark)', margin: 0, flex: 1, marginRight: 8 }}>{idea.title}</h3>
                    <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                      <span className="badge badge-info">{idea.tag}</span>
                      {idea.deployed && <span className="badge badge-success">Deployed</span>}
                      {idea.approved && !idea.deployed && <span className="badge badge-success">Approved</span>}
                      {!idea.approved && <span style={{ fontSize: '0.72rem', padding: '2px 8px', borderRadius: 12, backgroundColor: 'rgba(243,156,18,0.12)', color: '#D68910', fontWeight: 600 }}>Awaiting Approval</span>}
                    </div>
                  </div>

                  <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 10, lineHeight: 1.5 }}>{idea.desc}</p>

                  {/* Bottom row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
                    <div style={{ display: 'flex', gap: 14, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={13} /> {idea.author}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={13} /> {idea.comments} Comments</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: '#F1C40F', fontWeight: 700 }}>{idea.pts} pts earned</span>
                    </div>

                    {/* Leadership: Approve button (only for unapproved ideas) */}
                    {!idea.approved && currentRole === ROLES.LEADERSHIP && (
                      <button onClick={() => handleApprove(idea.id)} style={{ padding: '4px 14px', backgroundColor: 'var(--success-green)', color: 'white', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer' }}>
                        ✓ Approve (+50 pts)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            {filteredIdeas.length > itemsPerPage && (
              <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage(p => p - 1)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', opacity: currentPage === 1 ? 0.5 : 1, fontWeight: 600, color: 'var(--primary-blue)' }}
                >
                  Previous
                </button>
                <span style={{ display: 'flex', alignItems: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Page {currentPage} of {Math.ceil(filteredIdeas.length / itemsPerPage)}
                </span>
                <button
                  disabled={currentPage === Math.ceil(filteredIdeas.length / itemsPerPage)}
                  onClick={() => setCurrentPage(p => p + 1)}
                  style={{ padding: '6px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', cursor: currentPage === Math.ceil(filteredIdeas.length / itemsPerPage) ? 'not-allowed' : 'pointer', opacity: currentPage === Math.ceil(filteredIdeas.length / itemsPerPage) ? 0.5 : 1, fontWeight: 600, color: 'var(--primary-blue)' }}
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>


      </div>{/* end 2-col grid */}

      {/* Points Guide Modal */}
      {showGuide && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(12, 35, 60, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowGuide(false)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '780px', borderRadius: 'var(--radius-xl)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column', maxHeight: '90vh',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>

            {/* Modal Header */}
            <div style={{ padding: '20px 28px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--primary-blue)', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Trophy size={22} />
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'white' }}>How Points & Badges Work</h2>
              </div>
              <button onClick={() => setShowGuide(false)} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '28px', overflowY: 'auto' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 28 }}>

                {/* Left: Earning Rules */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Star size={18} color="#F39C12" /> For Requesters
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[['Submit an approved idea', '+50 pts'], ['When your idea is deployed', '+50 bonus']].map(([label, pts]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                          <span style={{ fontWeight: 500 }}>{label}</span>
                          <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>{pts}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Award size={18} color="var(--primary-blue)" /> For Developers
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {[['Base (Annual ROI)', '10 pts / hr saved'], ['Complexity (Simple)', '+100 bonus'], ['Complexity (Medium)', '+250 bonus'], ['Complexity (High)', '+500 bonus'], ['Team Projects', 'Split by %']].map(([label, pts]) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                          <span style={{ fontWeight: 500 }}>{label}</span>
                          <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>{pts}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right: Badge Levels */}
                <div>
                  <h3 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 12 }}>Badge Levels</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { label: 'Automation Hero', pts: '5,000+ pts', color: '#F1C40F', icon: '🥇' },
                      { label: 'Flow Expert',      pts: '3,000+ pts', color: '#BDC3C7', icon: '🥈' },
                      { label: 'Rising Star',      pts: '1,000+ pts', color: '#CD7F32', icon: '🥉' },
                      { label: 'Innovator',         pts: '0+ pts',     color: 'var(--text-muted)', icon: '⭐' },
                    ].map(({ label, pts, color, icon }) => (
                      <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                        <span style={{ fontWeight: 700, color, fontSize: '0.95rem' }}>{icon} {label}</span>
                        <span style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '0.9rem' }}>{pts}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Footer */}
            <div style={{ padding: '16px 28px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={() => setShowGuide(false)}>Got it!</button>
            </div>
          </div>
        </div>
      )}

      {/* Post Idea Modal */}
      {showIdeaModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(12, 35, 60, 0.6)', backdropFilter: 'blur(4px)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowIdeaModal(false)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '550px', borderRadius: 'var(--radius-xl)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'linear-gradient(to right, var(--bg-color), white)' }}>
              <h2 style={{ fontSize: '1.3rem', color: 'var(--primary-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={20} color="var(--accent-purple)" /> Share a New Idea
              </h2>
              <button onClick={() => setShowIdeaModal(false)} style={{ color: 'var(--text-muted)', background: 'rgba(0,0,0,0.05)', padding: 8, borderRadius: '50%' }}><X size={18} /></button>
            </div>

            <div style={{ padding: '32px 24px' }}>
              {/* Workflow info banner */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: 'rgba(30,73,226,0.06)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--primary-blue)', marginBottom: 20, borderLeft: '3px solid var(--primary-blue)' }}>
                <AlertCircle size={16} />
                <span>Your idea will go to <strong>Manager for review</strong> first. Once approved, it becomes visible to all.</span>
              </div>

              <div className="form-group" style={{ marginBottom: 20 }}>
                <label className="form-label">Idea Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ fontSize: '1rem', padding: '12px 16px' }} 
                  placeholder='e.g. Automate monthly reports...' 
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                />
              </div>

              {duplicateWarning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', backgroundColor: 'rgba(243, 156, 18, 0.1)', color: '#D68910', borderRadius: 'var(--radius-md)', fontSize: '0.9rem', marginBottom: 20, borderLeft: '4px solid #D68910' }}>
                  <AlertCircle size={18} />
                  <span><strong>Similar Idea Exists:</strong> "{duplicateWarning}". Consider upvoting it!</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label">Description</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '120px', fontSize: '1rem', padding: '12px 16px' }}
                  placeholder="Explain how this will help the team..."
                  value={newIdeaDesc}
                  onChange={(e) => setNewIdeaDesc(e.target.value)}
                ></textarea>
              </div>
            </div>

            <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowIdeaModal(false)} style={{ borderRadius: '30px' }}>Cancel</button>
              <button className="btn-primary" onClick={handlePostIdea} disabled={!newIdeaTitle.trim()} style={{ borderRadius: '30px', background: 'linear-gradient(to right, var(--primary-blue), var(--secondary-blue))', opacity: newIdeaTitle.trim() ? 1 : 0.5 }}>Submit for Review</button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      {showSuccessToast && (
        <div style={{
          position: 'fixed', bottom: 32, right: 32, zIndex: 2000,
          backgroundColor: 'var(--success-green)', color: 'white',
          padding: '14px 24px', borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-lg)', display: 'flex', alignItems: 'center', gap: 10,
          animation: 'fadeSlideUp 0.3s ease-out', fontWeight: 600
        }}>
          ✅ Idea submitted! Sent to Manager for review.
        </div>
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes fadeSlideUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        .leader-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--primary-blue); }
        .idea-card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: var(--pacific-blue); }
        .vote-btn:hover { background-color: var(--primary-blue) !important; color: white !important; }
      `}</style>
    </div>
  );
};

// Dummy component since Lightbulb isn't exported from lucide-react in some versions but I can just use a normal import or use Sparkles
const LightbulbIcon = ({ size, color }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.9 1.2 1.5 1.5 2.5"/>
    <path d="M9 18h6"/>
    <path d="M10 22h4"/>
  </svg>
);

export default Home;
