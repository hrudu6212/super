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
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto', padding: '20px' }}>
      <h1>Hruddayansh's Improvement Dashboard</h1>

      {/* Tennis Section */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>🎾 Tennis</h2>
        <p><strong>Mindset Goal:</strong> Only hitting hard at any matter.</p>
        <p><em>Focus on power and aggressive play style during all practice sessions and matches.</em></p>
      </section>

      {/* Study Section */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>📚 Study (2026-27 CBSE Batch)</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {subjects.map((subject) => (
            <div key={subject} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <label style={{ width: '150px' }}>{subject}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={studyProgress[subject]}
                onChange={(e) => handleStudyChange(subject, e.target.value)}
                style={{ flexGrow: 1, margin: '0 15px' }}
              />
              <span style={{ width: '50px', textAlign: 'right' }}>{studyProgress[subject]}%</span>
            </div>
          ))}
        </div>
      </section>

      {/* Money Section */}
      <section style={{ marginBottom: '30px', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h2>💰 Money & Content</h2>

        <div style={{ marginBottom: '20px' }}>
          <h3>Share Market</h3>
          <label>
            <strong>Daily P&L: </strong>
            <input
              type="text"
              placeholder="e.g. +$50 or -₹1000"
              value={dailyPL}
              onChange={(e) => setDailyPL(e.target.value)}
              style={{ padding: '5px', marginLeft: '10px' }}
            />
          </label>
        </div>

        <div>
          <h3>Content Creation</h3>
          <p><strong>Goal:</strong> 2 videos per week, reach 1k subscribers.</p>
          <label style={{ display: 'block', marginTop: '10px' }}>
            <strong>Progress/Notes:</strong>
            <textarea
              rows="3"
              style={{ width: '100%', marginTop: '5px', padding: '8px' }}
              placeholder="Track uploads, views, etc."
              value={contentProgress}
              onChange={(e) => setContentProgress(e.target.value)}
            />
          </label>
        </div>
      </section>
    </div>
  );
}
