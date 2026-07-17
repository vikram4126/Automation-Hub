import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, Info, User, ThumbsUp, MessageCircle, Sparkles, Search, Zap, AlertCircle, X } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Home = () => {
  const { currentRole, ROLES } = useRole();
  const [showIdeaModal, setShowIdeaModal] = useState(false);
  const [newIdeaTitle, setNewIdeaTitle] = useState('');
  const [duplicateWarning, setDuplicateWarning] = useState(null);
  
  // Fake data for Leaders
  const leaders = [
    { rank: 1, name: 'Vikram', points: 4500, apps: 12, flows: 34, hrsSaved: 850, title: 'Automation Hero' },
    { rank: 2, name: 'Yuvraj', points: 3800, apps: 8, flows: 22, hrsSaved: 620, title: 'Cloud Code Master' },
    { rank: 3, name: 'Shantanu', points: 3200, apps: 5, flows: 40, hrsSaved: 590, title: 'React Expert' },
    { rank: 4, name: 'Sukhvinder', points: 2900, apps: 6, flows: 15, hrsSaved: 480, title: 'Vue.js Specialist' },
  ];

  // Fake data for Ideas
  const ideas = [
    { id: 1, title: 'AI Chatbot for IT Helpdesk', desc: 'A Copilot bot in Teams that answers basic IT questions and resets passwords automatically.', author: 'Vikram', votes: 45, comments: 12, tag: 'AI/ML' },
    { id: 2, title: 'Expense Claim OCR', desc: 'Scan receipts and automatically fill the expense SharePoint list using AI Builder.', author: 'Sukhvinder', votes: 32, comments: 8, tag: 'OCR' },
    { id: 3, title: 'Automated Birthday Greetings', desc: 'Power Automate flow to send personalized emails on employee birthdays.', author: 'Yuvraj', votes: 15, comments: 2, tag: 'Flow' },
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
    setShowIdeaModal(false);
    setNewIdeaTitle('');
  };

  return (
    <div style={{ position: 'relative', height: '100%', animation: 'fadeIn 0.5s ease-out' }}>
      
      {/* Header Section */}
      <div style={{ marginBottom: 32, textAlign: 'center', background: 'linear-gradient(135deg, var(--primary-blue), var(--pacific-blue))', padding: '40px 24px', borderRadius: 'var(--radius-xl)', color: 'white', boxShadow: 'var(--shadow-lg)' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: 12, color: 'white', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12 }}>
          <Sparkles size={32} /> Innovation & Leadership
        </h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
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
            <button className="btn-primary" onClick={() => setShowIdeaModal(true)} style={{ borderRadius: '30px', padding: '8px 20px' }}>
              <Zap size={16} /> Share Idea
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {ideas.map((idea, idx) => (
              <div key={idea.id} style={{
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '20px',
                display: 'flex',
                gap: '20px',
                boxShadow: 'var(--shadow-sm)',
                transition: 'transform 0.2s, box-shadow 0.2s',
                cursor: 'pointer',
                animationDelay: `${idx * 0.1}s`,
                animation: 'fadeSlideUp 0.5s ease-out forwards'
              }} className="idea-card">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                  <button style={{ color: 'var(--primary-blue)', backgroundColor: 'rgba(30,73,226,0.1)', padding: 12, borderRadius: 12, transition: 'all 0.2s' }} className="vote-btn">
                    <ThumbsUp size={20} />
                  </button>
                  <span style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--text-dark)' }}>{idea.votes}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <h3 style={{ fontSize: '1.1rem', marginBottom: 8, color: 'var(--text-dark)' }}>{idea.title}</h3>
                    <span className="badge badge-info">{idea.tag}</span>
                  </div>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5 }}>{idea.desc}</p>
                  <div style={{ display: 'flex', gap: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}><User size={14} /> {idea.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontWeight: 500 }}><MessageCircle size={14} /> {idea.comments} Comments</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

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
                ></textarea>
              </div>
            </div>

            <div style={{ padding: '20px 24px', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
              <button className="btn-secondary" onClick={() => setShowIdeaModal(false)} style={{ borderRadius: '30px' }}>Cancel</button>
              <button className="btn-primary" onClick={handlePostIdea} style={{ borderRadius: '30px', background: 'linear-gradient(to right, var(--primary-blue), var(--secondary-blue))' }}>Post to Board</button>
            </div>
          </div>
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
