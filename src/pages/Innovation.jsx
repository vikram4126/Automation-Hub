import React, { useState, useEffect } from 'react';
import { ThumbsUp, MessageCircle, User, X, Sparkles, Search, AlertCircle } from 'lucide-react';

const Innovation = () => {
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(null);

  const ideas = [
    { id: 1, title: 'AI Chatbot for IT Helpdesk', desc: 'A Copilot bot in Teams that answers basic IT questions and resets passwords automatically.', author: 'Vikram', votes: 45, comments: 12 },
    { id: 2, title: 'Expense Claim OCR', desc: 'Scan receipts and automatically fill the expense SharePoint list using AI Builder.', author: 'Sukhvinder', votes: 32, comments: 8 },
    { id: 3, title: 'Automated Birthday Greetings', desc: 'Power Automate flow to send personalized emails on employee birthdays.', author: 'Yuvraj', votes: 15, comments: 2 },
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

  const handlePostIdea = () => {
    // Dummy action
    setShowIdeaModal(false);
    setNewIdeaTitle('');
  };

  return (
    <div style={{ position: 'relative', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Innovation Board</h1>
          <p style={{ color: 'var(--text-muted)' }}>Share ideas, vote for the best ones, and spark new automations.</p>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <div className="search-bar" style={{ width: 250 }}>
            <Search size={16} />
            <input type="text" placeholder="Search ideas before posting..." />
          </div>
          <button className="btn-primary" onClick={() => setShowIdeaModal(true)}>Post an Idea</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ideas.map(idea => (
          <div key={idea.id} className="card" style={{ display: 'flex', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 60 }}>
              <button style={{ color: 'var(--primary-blue)', backgroundColor: 'rgba(30,73,226,0.1)', padding: 12, borderRadius: 8 }}>
                <ThumbsUp size={20} />
              </button>
              <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>{idea.votes}</span>
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: 8 }}>{idea.title}</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginBottom: 16 }}>{idea.desc}</p>
              <div style={{ display: 'flex', gap: 16, fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={14} /> {idea.author}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MessageCircle size={14} /> {idea.comments} Comments</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Post an Idea Modal */}
      {showIdeaModal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowIdeaModal(false)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '500px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontSize: '1.2rem', color: 'var(--primary-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
                <Sparkles size={18} /> Share a New Idea
              </h2>
              <button onClick={() => setShowIdeaModal(false)} style={{ color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ padding: '24px' }}>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 20 }}>
                Have a great idea that could help the whole company? Share it here! If it gets enough votes, the team might build it.
              </p>

              <div className="form-group" style={{ marginBottom: 16 }}>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Idea Title</label>
                <input 
                  type="text" 
                  className="form-control" 
                  style={{ fontSize: '0.9rem' }} 
                  placeholder='e.g. Try typing "Chatbot" or "Expense"' 
                  value={newIdeaTitle}
                  onChange={(e) => setNewIdeaTitle(e.target.value)}
                />
              </div>

              {duplicateWarning && (
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', backgroundColor: 'rgba(243, 156, 18, 0.1)', color: '#D68910', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', marginBottom: 16 }}>
                  <AlertCircle size={16} />
                  <span><strong>Similar Idea Exists:</strong> "{duplicateWarning}". Consider upvoting it!</span>
                </div>
              )}

              <div className="form-group" style={{ marginBottom: 0 }}>
                <label className="form-label" style={{ fontSize: '0.95rem' }}>Description</label>
                <textarea 
                  className="form-control" 
                  style={{ minHeight: '100px', fontSize: '0.9rem' }}
                  placeholder="Explain your idea briefly..."
                ></textarea>
              </div>
            </div>

            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowIdeaModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handlePostIdea}>Post to Board</button>
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

export default Innovation;
