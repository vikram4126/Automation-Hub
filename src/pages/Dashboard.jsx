import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Clock, CheckCircle, AlertCircle, Zap, Users, TrendingUp } from 'lucide-react';
import { useRole } from '../context/RoleContext';

const Dashboard = () => {
  const { currentRole, ROLES } = useRole();

  const handleExport = () => {
    const csvContent = "Project Name,Department,Developer,Technology,Hours Saved (Annual)\nEmail Attachment Extraction,Finance,Vikram,Power Automate,540\nHR Onboarding Portal,HR,Shantanu,React,420\nMonthly Server Health Check,IT,Yuvraj,Cloud Code,120";
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'Leadership_Overview_Report.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const executiveData = [
    { name: 'Oct', requests: 28, completed: 18, roi: 320 },
    { name: 'Nov', requests: 35, completed: 24, roi: 480 },
    { name: 'Dec', requests: 22, completed: 19, roi: 390 },
    { name: 'Jan', requests: 45, completed: 30, roi: 600 },
    { name: 'Feb', requests: 52, completed: 38, roi: 780 },
    { name: 'Mar', requests: 61, completed: 47, roi: 1050 },
    { name: 'Apr', requests: 70, completed: 55, roi: 1200 },
    { name: 'May', requests: 78, completed: 63, roi: 1450 },
    { name: 'Jun', requests: 85, completed: 72, roi: 1800 },
  ];

  const deptData = [
    { name: 'Finance', value: 4500 },
    { name: 'IT/Ops', value: 3200 },
    { name: 'HR', value: 2800 },
    { name: 'Marketing', value: 1950 }
  ];
  const COLORS = ['#00338d', '#00b8f5', '#7213ea', '#fd349c']; // KPMG Brand Colors

  const recentActivity = [
    { id: 1, title: 'Microsite Builder with React', status: 'Completed', time: '2 hours ago', user: 'Vikram' },
    { id: 2, title: 'Banner Creator with React', status: 'Completed', time: '5 hours ago', user: 'Shantanu' },
    { id: 3, title: 'QC Automate with Cloud Code', status: 'In Progress', time: '1 day ago', user: 'Yuvraj' },
    { id: 4, title: 'Leave Request System', status: 'Submitted', time: '2 days ago', user: 'Kiran' },
  ];

  const renderExecutiveView = () => (
    <>
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="card kpi-card">
          <div className="kpi-title">Total Hours Saved (YTD)</div>
          <div className="kpi-value">12,450</div>
          <div className="kpi-trend up"><TrendingUp size={14}/> ↑ 15% vs FY Last Year</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-title">Est. Financial Value</div>
          <div className="kpi-value" style={{ color: 'var(--success-green)' }}>$498K</div>
          <div className="kpi-trend">Calculated at $40/hr average</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-title">Active Projects</div>
          <div className="kpi-value">34</div>
          <div className="kpi-trend up">Across 6 Departments (Oct–Jun)</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-title">Avg. Time to Market</div>
          <div className="kpi-value" style={{ fontSize: '1.5rem', marginTop: 8 }}>2.5 Weeks</div>
          <div className="kpi-trend">From Idea to Deployment</div>
        </div>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
            <h2 style={{ fontSize: '1.1rem', margin: 0 }}>ROI Trend — Hours Saved (Oct–Sep FY)</h2>
            <button className="btn-secondary" style={{ fontSize: '0.85rem' }} onClick={handleExport}>Export</button>
          </div>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executiveData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="roi" fill="var(--success-green)" radius={[4, 4, 0, 0]} name="Hours Saved" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 24 }}>ROI by Department</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={deptData} cx="50%" cy="45%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {deptData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} hrs`} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );

  const renderStandardView = () => (
    <>
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-title">My Open Requests</div>
          <div className="kpi-value">2</div>
          <div className="kpi-trend">1 in Development</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-title">Ideas Submitted</div>
          <div className="kpi-value">5</div>
          <div className="kpi-trend up">2 picked up by Team</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-title">My Time Saved</div>
          <div className="kpi-value">45 hrs</div>
          <div className="kpi-trend up">This financial year (Oct–Sep)</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, marginBottom: 24 }}>
        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 24 }}>Automation Pipeline (Oct–Sep FY)</h2>
          <div style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executiveData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-color)" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} />
                <Bar dataKey="requests" fill="var(--primary-blue)" radius={[4, 4, 0, 0]} name="New Requests" />
                <Bar dataKey="completed" fill="var(--success-green)" radius={[4, 4, 0, 0]} name="Completed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 style={{ fontSize: '1.1rem', marginBottom: 24 }}>Recent Activity</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {recentActivity.map(activity => (
              <div key={activity.id} style={{ display: 'flex', gap: 12, borderBottom: '1px solid var(--border-color)', paddingBottom: 16 }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%', backgroundColor: 'var(--bg-color)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-blue)'
                }}>
                  {activity.status === 'Completed' ? <CheckCircle size={20} color="var(--success-green)" /> : 
                   activity.status === 'In Progress' ? <Clock size={20} color="var(--secondary-blue)" /> :
                   <AlertCircle size={20} color="var(--accent-purple)" />}
                </div>
                <div>
                  <div style={{ fontWeight: 500, fontSize: '0.95rem' }}>{activity.title}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 4 }}>
                    {activity.user} • {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', color: 'var(--primary-blue)' }}>
          {currentRole === ROLES.LEADERSHIP ? 'Executive Dashboard' : 'Automation Dashboard'}
        </h1>
        {currentRole === ROLES.LEADERSHIP && (
          <button className="btn-primary">
            <Zap size={16} /> Export Report
          </button>
        )}
      </div>

      {currentRole === ROLES.LEADERSHIP ? renderExecutiveView() : renderStandardView()}
    </div>
  );
};

export default Dashboard;
