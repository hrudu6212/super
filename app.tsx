import React, { useState } from 'react';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];

export default function ImprovementDashboard() {
  const [activeTab, setActiveTab] = useState('Tennis');

  // Study State
  const [studyProgress, setStudyProgress] = useState(
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: 0 }), {})
  );
  const [studyLogs, setStudyLogs] = useState([]);

  // Money State
  const [dailyPL, setDailyPL] = useState('');
  const [moneyLogs, setMoneyLogs] = useState([]);

  // Content State
  const [contentProgress, setContentProgress] = useState('');
  const [contentLogs, setContentLogs] = useState([]);

  const handleStudyChange = (subject, value) => {
    setStudyProgress((prev) => ({
      ...prev,
      [subject]: Math.min(100, Math.max(0, Number(value))),
    }));
  };

  const handleLogStudy = () => {
    const today = new Date().toLocaleDateString();
    setStudyLogs([{ date: today, progress: { ...studyProgress } }, ...studyLogs]);
    alert('Study progress logged for today!');
  };

  const handleLogMoney = () => {
    if (!dailyPL.trim()) return;
    const today = new Date().toLocaleDateString();
    setMoneyLogs([{ date: today, pl: dailyPL }, ...moneyLogs]);
    setDailyPL('');
    alert('Daily P&L logged!');
  };

  const handleLogContent = () => {
    if (!contentProgress.trim()) return;
    const today = new Date().toLocaleDateString();
    setContentLogs([{ date: today, note: contentProgress }, ...contentLogs]);
    setContentProgress('');
    alert('Content progress logged!');
  };

  return (
    <div className="dashboard-container">
      <h1>Hruddayansh's Improvement Dashboard</h1>

      <div className="tabs">
        <button className={activeTab === 'Tennis' ? 'active' : ''} onClick={() => setActiveTab('Tennis')}>🎾 Tennis</button>
        <button className={activeTab === 'Study' ? 'active' : ''} onClick={() => setActiveTab('Study')}>📚 Study</button>
        <button className={activeTab === 'Money' ? 'active' : ''} onClick={() => setActiveTab('Money')}>💰 Money</button>
      </div>

      {activeTab === 'Tennis' && (
        <section className="section-card">
          <h2 className="section-title">🎾 Tennis</h2>
          <div className="tennis-goal">
            <strong>Mindset Goal:</strong> Only hitting hard at any matter.
          </div>
          <p className="tennis-note">Focus on power and aggressive play style during all practice sessions and matches.</p>
          <div className="log-section">
             <h3>Improvement Tracking</h3>
             <p><em>Tennis improvement is currently tracked through mindset focus during matches.</em></p>
          </div>
        </section>
      )}

      {activeTab === 'Study' && (
        <section className="section-card">
          <h2 className="section-title">📚 Study (2026-27 CBSE Batch)</h2>
          <div>
            {subjects.map((subject) => (
              <div key={subject} className="study-item">
                <label className="study-label">{subject}</label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={studyProgress[subject]}
                  onChange={(e) => handleStudyChange(subject, e.target.value)}
                  className="study-range"
                />
                <span className="study-value">{studyProgress[subject]}%</span>
              </div>
            ))}
            <button className="log-btn" onClick={handleLogStudy}>Log Today's Progress</button>
          </div>

          <div className="log-section">
            <h3>Day-wise Tracking</h3>
            {studyLogs.length === 0 ? <p>No logs yet.</p> : (
              <table className="log-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Average Completion</th>
                  </tr>
                </thead>
                <tbody>
                  {studyLogs.map((log, i) => {
                    const avg = Object.values(log.progress).reduce((a, b) => a + b, 0) / subjects.length;
                    return (
                      <tr key={i}>
                        <td>{log.date}</td>
                        <td>{avg.toFixed(1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>
      )}

      {activeTab === 'Money' && (
        <section className="section-card">
          <h2 className="section-title">💰 Money & Content</h2>

          <div className="money-grid">
            <div className="input-group">
              <h3>Share Market</h3>
              <label className="input-label">Daily P&L:</label>
              <input
                type="text"
                placeholder="e.g. +$50 or -₹1000"
                value={dailyPL}
                onChange={(e) => setDailyPL(e.target.value)}
                className="text-input"
              />
              <button className="log-btn small-btn" onClick={handleLogMoney}>Log P&L</button>

              <div className="log-section">
                <h4>P&L History</h4>
                {moneyLogs.length === 0 ? <p>No logs yet.</p> : (
                  <ul className="log-list">
                    {moneyLogs.map((log, i) => <li key={i}><strong>{log.date}:</strong> {log.pl}</li>)}
                  </ul>
                )}
              </div>
            </div>

            <div className="input-group">
              <h3>Content Creation</h3>
              <p style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#6b7280' }}>
                <strong>Goal:</strong> 2 videos per week, reach 1k subscribers.
              </p>
              <label className="input-label">Progress/Notes:</label>
              <textarea
                rows={3}
                placeholder="Track uploads, views, etc."
                value={contentProgress}
                onChange={(e) => setContentProgress(e.target.value)}
                className="textarea-input"
              />
              <button className="log-btn small-btn" onClick={handleLogContent}>Log Progress</button>

              <div className="log-section">
                <h4>Content History</h4>
                {contentLogs.length === 0 ? <p>No logs yet.</p> : (
                  <ul className="log-list">
                    {contentLogs.map((log, i) => <li key={i}><strong>{log.date}:</strong> {log.note}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}