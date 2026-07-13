import React from 'react';
import { Trophy, Award, Star } from 'lucide-react';

const Leaderboard = () => {
  const leaders = [
    { rank: 1, name: 'Vikram', points: 4500, apps: 12, flows: 34, title: 'Automation Hero' },
    { rank: 2, name: 'Yuvraj', points: 3800, apps: 8, flows: 22, title: 'Cloud Code Master' },
    { rank: 3, name: 'Shantanu', points: 3200, apps: 5, flows: 40, title: 'React Expert' },
    { rank: 4, name: 'Sukhvinder', points: 2900, apps: 6, flows: 15, title: 'Vue.js Specialist' },
    { rank: 5, name: 'Kiran', points: 2100, apps: 2, flows: 18, title: 'Innovator' },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Leaderboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Top automation developers of the year.</p>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Rank</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Developer</th>
              <th style={{ padding: '16px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Badge</th>
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
                <td style={{ padding: '16px 24px', textAlign: 'right', fontWeight: 700, color: 'var(--success-green)' }}>
                  {leader.points} pts
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
