import React, { useState } from 'react';
import { Trophy, Award, Star, Info, X, Zap } from 'lucide-react';

const Leaderboard = () => {
  const [showGuide, setShowGuide] = useState(false);
  // In the real Power App, Apps, Flows, Points and Hours Saved are calculated dynamically
  // by Flow 2 (which updates the User_Stats list based on completed tasks & categories)
  const leaders = [
    { rank: 1, name: 'Vikram', points: 4500, apps: 12, flows: 34, hrsSaved: 850, title: 'Automation Hero' },
    { rank: 2, name: 'Yuvraj', points: 3800, apps: 8, flows: 22, hrsSaved: 620, title: 'Cloud Code Master' },
    { rank: 3, name: 'Shantanu', points: 3200, apps: 5, flows: 40, hrsSaved: 590, title: 'React Expert' },
    { rank: 4, name: 'Sukhvinder', points: 2900, apps: 6, flows: 15, hrsSaved: 480, title: 'Vue.js Specialist' },
    { rank: 5, name: 'Kiran', points: 2100, apps: 2, flows: 18, hrsSaved: 320, title: 'Innovator' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Leaderboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Top automation developers and ideas of the year.</p>
        </div>
        <button 
          onClick={() => setShowGuide(true)}
          style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', backgroundColor: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', cursor: 'pointer', fontWeight: 600, color: 'var(--primary-blue)' }}
        >
          <Info size={16} /> How Points Work
        </button>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Rank</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Developer</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Badge</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Hours Saved</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Points</th>
            </tr>
          </thead>
          <tbody>
            {leaders.map((leader) => (
              <tr key={leader.rank} style={{ borderBottom: leader.rank !== 5 ? '1px solid var(--border-color)' : 'none' }}>
                <td style={{ padding: '16px 24px', fontWeight: 700, fontSize: '1.1rem', color: leader.rank === 1 ? '#F1C40F' : leader.rank === 2 ? '#BDC3C7' : leader.rank === 3 ? '#CD7F32' : 'var(--text-dark)' }}>
                  #{leader.rank}
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div className="user-avatar" style={{ backgroundColor: 'var(--primary-blue)', width: 32, height: 32, fontSize: '0.8rem' }}>
                      {leader.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600 }}>{leader.name}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{leader.apps} Apps • {leader.flows} Flows</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ 
                    display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', 
                    backgroundColor: 'rgba(114, 19, 234, 0.1)', color: 'var(--accent-purple)', 
                    borderRadius: 16, fontSize: '0.8rem', fontWeight: 600
                  }}>
                    {leader.rank === 1 ? <Trophy size={14}/> : leader.rank === 2 ? <Award size={14}/> : <Star size={14}/>}
                    {leader.title}
                  </span>
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--text-dark)' }}>
                  {leader.hrsSaved} hrs/yr
                </td>
                <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 700, color: 'var(--success-green)' }}>
                  {leader.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gamification Guide Modal */}
      {showGuide && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          animation: 'fadeIn 0.2s ease-out'
        }} onClick={() => setShowGuide(false)}>
          <div style={{
            backgroundColor: 'var(--card-white)', width: '760px', borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-lg)', overflow: 'hidden',
            display: 'flex', flexDirection: 'column',
            animation: 'fadeSlideUp 0.3s ease-out',
            maxHeight: '90vh'
          }} onClick={(e) => e.stopPropagation()}>
            
            <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'var(--primary-blue)', color: 'white' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <Trophy size={20} />
                <h2 style={{ fontSize: '1.2rem', margin: 0, color: 'white' }}>How Points & Badges Work</h2>
              </div>
              <button onClick={() => setShowGuide(false)} style={{ color: 'white', background: 'transparent', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
            </div>

            <div style={{ padding: '20px 24px', overflowY: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
                
                {/* Left Column - Logic */}
                <div>
                  <div style={{ marginBottom: 20 }}>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Star size={18} color="#F39C12" /> For Requesters
                    </h3>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Submit an approved idea</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>+50 pts</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>When your idea is deployed</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>+50 bonus</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Award size={18} color="var(--primary-blue)" /> For Developers
                    </h3>
                    <div style={{ display: 'grid', gap: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Base (Annual ROI)</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>10 pts / hr saved</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Complexity (Simple)</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>+100 bonus</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Complexity (Medium)</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>+250 bonus</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Complexity (High)</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>+500 bonus</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 12px', backgroundColor: 'var(--bg-color)', borderRadius: 8, fontSize: '0.9rem' }}>
                        <span style={{ fontWeight: 500 }}>Team Projects</span>
                        <span style={{ fontWeight: 700, color: 'var(--success-green)' }}>Split by %</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Column - Badges */}
                <div>
                  <h3 style={{ fontSize: '1.05rem', color: 'var(--text-dark)', marginBottom: 10 }}>Badge Levels</h3>
                  <div style={{ display: 'grid', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#F1C40F' }}><Trophy size={16}/> Automation Hero</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>5,000+ pts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#BDC3C7' }}><Award size={16}/> Flow Expert</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>3,000+ pts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: '#CD7F32' }}><Star size={16}/> Rising Star</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>1,000+ pts</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px', border: '1px solid var(--border-color)', borderRadius: 8 }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontWeight: 600, color: 'var(--text-dark)' }}>Innovator</span>
                      <span style={{ fontWeight: 600, color: 'var(--text-muted)' }}>0+ pts</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            <div style={{ padding: '16px 24px', borderTop: '1px solid var(--border-color)', backgroundColor: 'var(--bg-color)', display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn-primary" onClick={() => setShowGuide(false)}>Got it!</button>
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

export default Leaderboard;
