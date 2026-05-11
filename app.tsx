import React, { useState } from 'react';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];

export default function ImprovementDashboard() {
  const [studyProgress, setStudyProgress] = useState(
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: 0 }), {})
  );

  const [dailyPL, setDailyPL] = useState('');
  const [contentProgress, setContentProgress] = useState('');

  const handleStudyChange = (subject, value) => {
    setStudyProgress((prev) => ({
      ...prev,
      [subject]: Math.min(100, Math.max(0, Number(value))),
    }));
  };

  return (
    <div className="dashboard-container">
      <h1>Hruddayansh's Improvement Dashboard</h1>

      {/* Tennis Section */}
      <section className="section-card">
        <h2 className="section-title">🎾 Tennis</h2>
        <div className="tennis-goal">
          <strong>Mindset Goal:</strong> Only hitting hard at any matter.
        </div>
        <p className="tennis-note">Focus on power and aggressive play style during all practice sessions and matches.</p>
      </section>

      {/* Study Section */}
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
        </div>
      </section>

      {/* Money Section */}
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
          </div>
        </div>
      </section>
    </div>
  );
}