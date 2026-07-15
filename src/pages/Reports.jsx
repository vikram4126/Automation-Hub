import React from 'react';
import { PieChart, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

const Reports = () => {
  const data = [
    { name: 'Finance', value: 40 },
    { name: 'HR', value: 30 },
    { name: 'IT', value: 20 },
    { name: 'Operations', value: 10 },
  ];
  const COLORS = ['var(--primary-blue)', 'var(--secondary-blue)', 'var(--success-green)', 'var(--accent-purple)'];

  const monthlyData = [
    { name: 'Oct', requests: 28, timeSaved: 320 },
    { name: 'Nov', requests: 35, timeSaved: 480 },
    { name: 'Dec', requests: 22, timeSaved: 390 },
    { name: 'Jan', requests: 45, timeSaved: 600 },
    { name: 'Feb', requests: 52, timeSaved: 780 },
    { name: 'Mar', requests: 61, timeSaved: 1050 },
    { name: 'Apr', requests: 70, timeSaved: 1200 },
    { name: 'May', requests: 78, timeSaved: 1450 },
    { name: 'Jun', requests: 85, timeSaved: 1800 },
    { name: 'Jul', requests: 0, timeSaved: 0 },
    { name: 'Aug', requests: 0, timeSaved: 0 },
    { name: 'Sep', requests: 0, timeSaved: 0 },
  ];

  const tableData = [
    { project: 'Email Attachment Extraction', dept: 'Finance', dev: 'Vikram', tech: 'Power Automate', hours: 540 },
    { project: 'HR Onboarding Portal', dept: 'HR', dev: 'Shantanu', tech: 'React', hours: 420 },
    { project: 'Monthly Server Health Check', dept: 'IT', dev: 'Yuvraj', tech: 'Cloud Code', hours: 120 }
  ];

  const handleExport = () => {
    // 1. Create CSV content
    const headers = ['Project Name', 'Department', 'Developer', 'Technology', 'Hours Saved (Annual)'];
    const rows = tableData.map(row => [row.project, row.dept, row.dev, row.tech, row.hours]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(r => r.join(','))
    ].join('\n');

    // 2. Create a Blob from the CSV string
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    // 3. Create a download link and trigger it
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Automation_Hub_Detailed_Report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

      {/* Monthly Bar Chart */}
      <div className="card" style={{ marginTop: 24 }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: 8 }}>Monthly Requests &amp; Hours Saved — FY Oct to Sep</h3>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: 24 }}>Jul, Aug, Sep will update as the financial year progresses.</p>
        <div style={{ height: 300 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} />
              <YAxis axisLine={false} tickLine={false} />
              <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
              <Bar dataKey="requests" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} name="Requests Submitted" />
              <Bar dataKey="timeSaved" fill="var(--success-green)" radius={[4, 4, 0, 0]} name="Hours Saved" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div style={{ display: 'flex', gap: 20, marginTop: 16, fontSize: '0.85rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--primary-blue)', display: 'inline-block' }}></span> Requests Submitted</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><span style={{ width: 12, height: 12, borderRadius: 2, backgroundColor: 'var(--success-green)', display: 'inline-block' }}></span> Hours Saved</span>
        </div>
      </div>

      {/* Detail Breakdown Table */}
      <div className="card" style={{ marginTop: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: 4 }}>Project Detailed Breakdown</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Drill-down view of all completed automations (Power BI Matrix View simulation).</p>
          </div>
          <button className="btn-secondary" style={{ fontSize: '0.85rem' }} onClick={handleExport}>Export to Excel</button>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--bg-color)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '12px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Project Name</th>
              <th style={{ padding: '12px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Department</th>
              <th style={{ padding: '12px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Developer</th>
              <th style={{ padding: '12px 24px', fontWeight: 600, color: 'var(--text-muted)' }}>Technology</th>
              <th style={{ padding: '12px 24px', fontWeight: 600, color: 'var(--text-muted)', textAlign: 'right' }}>Hours Saved (Annual)</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px 24px', fontWeight: 500 }}>Email Attachment Extraction</td>
              <td style={{ padding: '12px 24px' }}>Finance</td>
              <td style={{ padding: '12px 24px' }}>Vikram</td>
              <td style={{ padding: '12px 24px' }}><span className="badge badge-info">Power Automate</span></td>
              <td style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--success-green)' }}>540 hrs</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px 24px', fontWeight: 500 }}>HR Onboarding Portal</td>
              <td style={{ padding: '12px 24px' }}>HR</td>
              <td style={{ padding: '12px 24px' }}>Shantanu</td>
              <td style={{ padding: '12px 24px' }}><span className="badge badge-info" style={{ backgroundColor: 'rgba(114, 19, 234, 0.1)', color: 'var(--accent-purple)' }}>React</span></td>
              <td style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--success-green)' }}>420 hrs</td>
            </tr>
            <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
              <td style={{ padding: '12px 24px', fontWeight: 500 }}>Monthly Server Health Check</td>
              <td style={{ padding: '12px 24px' }}>IT</td>
              <td style={{ padding: '12px 24px' }}>Yuvraj</td>
              <td style={{ padding: '12px 24px' }}><span className="badge badge-info">Cloud Code</span></td>
              <td style={{ padding: '12px 24px', textAlign: 'right', fontWeight: 600, color: 'var(--success-green)' }}>120 hrs</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reports;
