import React from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const data = [
    { name: 'Finance', value: 40 },
    { name: 'HR', value: 30 },
    { name: 'IT', value: 20 },
    { name: 'Operations', value: 10 },
  ];
  const COLORS = ['var(--primary-blue)', 'var(--secondary-blue)', 'var(--success-green)', 'var(--accent-purple)'];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', marginBottom: 8, color: 'var(--primary-blue)' }}>Reports & Analytics</h1>
        <p style={{ color: 'var(--text-muted)' }}>Detailed breakdown of automation ROI and departmental usage.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 24 }}>Requests by Department</h3>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 16 }}>
            {data.map((entry, index) => (
              <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.85rem' }}>
                <div style={{ width: 12, height: 12, backgroundColor: COLORS[index], borderRadius: 2 }}></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.1rem', marginBottom: 24 }}>Top Technologies Used</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 8 }}>
                <span>Power Automate</span>
                <span style={{ fontWeight: 600 }}>55%</span>
              </div>
              <div style={{ height: 8, backgroundColor: 'var(--border-color)', borderRadius: 4 }}>
                <div style={{ width: '55%', height: '100%', backgroundColor: 'var(--primary-blue)', borderRadius: 4 }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 8 }}>
                <span>Power Apps</span>
                <span style={{ fontWeight: 600 }}>30%</span>
              </div>
              <div style={{ height: 8, backgroundColor: 'var(--border-color)', borderRadius: 4 }}>
                <div style={{ width: '30%', height: '100%', backgroundColor: 'var(--secondary-blue)', borderRadius: 4 }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: 8 }}>
                <span>Power BI</span>
                <span style={{ fontWeight: 600 }}>15%</span>
              </div>
              <div style={{ height: 8, backgroundColor: 'var(--border-color)', borderRadius: 4 }}>
                <div style={{ width: '15%', height: '100%', backgroundColor: 'var(--success-green)', borderRadius: 4 }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
