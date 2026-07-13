import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import SubmitRequest from './pages/SubmitRequest';
import BrowseRequests from './pages/BrowseRequests';
import MyRequests from './pages/MyRequests';
import MyTasks from './pages/MyTasks';
import Innovation from './pages/Innovation';
import Leaderboard from './pages/Leaderboard';
import Reports from './pages/Reports';
import KnowledgeBase from './pages/KnowledgeBase';
import AdminPanel from './pages/AdminPanel';
import { RoleProvider } from './context/RoleContext';

function App() {
  return (
    <RoleProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          <div className="main-content">
            <Header />
            <div className="page-content">
              <Routes>
                <Route path="/" element={<Navigate to="/dashboard" replace />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/submit" element={<SubmitRequest />} />
                <Route path="/browse" element={<BrowseRequests />} />
                <Route path="/my-requests" element={<MyRequests />} />
                <Route path="/my-tasks" element={<MyTasks />} />
                <Route path="/innovation" element={<Innovation />} />
                <Route path="/leaderboard" element={<Leaderboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/kb" element={<KnowledgeBase />} />
                <Route path="/admin" element={<AdminPanel />} />
                <Route path="*" element={
                  <div className="card" style={{ padding: 40, textAlign: 'center' }}>
                    <h2 style={{ color: 'var(--primary-blue)' }}>Coming Soon</h2>
                    <p style={{ color: 'var(--text-muted)' }}>This page is being developed.</p>
                  </div>
                } />
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </RoleProvider>
  );
}

export default App;
