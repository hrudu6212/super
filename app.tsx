import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Target, BookOpen, TrendingUp, Calendar, Trophy, Briefcase, Plus, Save, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const subjects = ['Mathematics', 'Physics', 'Chemistry', 'English', 'Computer Science'];

export default function ImprovementDashboard() {
  const [activeTab, setActiveTab] = useState('Overview');

  // Streak State
  const [streak, setStreak] = useState(0);
  const [lastLogDate, setLastLogDate] = useState<string | null>(null);

  // Study State
  const [studyProgress, setStudyProgress] = useState(
    subjects.reduce((acc, subject) => ({ ...acc, [subject]: 0 }), {})
  );
  const [studyLogs, setStudyLogs] = useState<{date: string, avg: number}[]>([]);

  // Money State
  const [dailyPL, setDailyPL] = useState('');
  const [moneyLogs, setMoneyLogs] = useState<{date: string, pl: string}[]>([]);

  // Content State
  const [contentProgress, setContentProgress] = useState('');
  const [contentLogs, setContentLogs] = useState<{date: string, note: string}[]>([]);

  const handleStudyChange = (subject, value) => {
    setStudyProgress((prev) => ({
      ...prev,
      [subject]: Math.min(100, Math.max(0, Number(value))),
    }));
  };

  const updateStreak = () => {
    const today = new Date().toLocaleDateString('en-US');
    if (lastLogDate === today) return; // Already logged today

    if (lastLogDate) {
      const lastDate = new Date(lastLogDate);
      const currentDate = new Date(today);
      const diffTime = Math.abs(currentDate.getTime() - lastDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        setStreak(prev => prev + 1);
      } else if (diffDays > 1) {
        setStreak(1); // Streak broken
      }
    } else {
      setStreak(1); // First log
    }
    setLastLogDate(today);
  };

  const handleLogStudy = () => {
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    const avg = Object.values(studyProgress).reduce((a: any, b: any) => a + b, 0) / subjects.length;
    setStudyLogs([...studyLogs, { date: today, avg: Number(avg.toFixed(1)) }]);
    updateStreak();
  };

  const handleLogMoney = () => {
    if (!dailyPL.trim()) return;
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    setMoneyLogs([{ date: today, pl: dailyPL }, ...moneyLogs]);
    setDailyPL('');
    updateStreak();
  };

  const handleLogContent = () => {
    if (!contentProgress.trim()) return;
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' });
    setContentLogs([{ date: today, note: contentProgress }, ...contentLogs]);
    setContentProgress('');
    updateStreak();
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -20 }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'easeInOut',
    duration: 0.3
  };

  return (
    <div className="dashboard-container animated-bg">
      <header className="dashboard-header">
        <div>
          <h1 className="dashboard-title">Hruddayansh's Command Center</h1>
          <p className="dashboard-subtitle">Personal Growth & Tracking Dashboard</p>
        </div>
        <div className="header-actions">
           <motion.div
             className="streak-counter"
             whileHover={{ scale: 1.05 }}
             animate={{ scale: streak > 0 ? [1, 1.2, 1] : 1 }}
             transition={{ duration: 0.5 }}
           >
             <Flame size={20} color={streak > 0 ? "#f97316" : "#9ca3af"} className={streak > 0 ? "animate-flicker" : ""} />
             <span className="streak-number">{streak}</span>
             <span className="streak-label">Day Streak</span>
           </motion.div>
          <div className="header-status">
            <span className="status-dot"></span>
            <span>System Active</span>
          </div>
        </div>
      </header>

      <div className="tabs">
        <button className={activeTab === 'Overview' ? 'active' : ''} onClick={() => setActiveTab('Overview')}>
          <Target size={18} /> Overview
        </button>
        <button className={activeTab === 'Tennis' ? 'active' : ''} onClick={() => setActiveTab('Tennis')}>
          <Trophy size={18} /> Tennis
        </button>
        <button className={activeTab === 'Study' ? 'active' : ''} onClick={() => setActiveTab('Study')}>
          <BookOpen size={18} /> Study
        </button>
        <button className={activeTab === 'Money' ? 'active' : ''} onClick={() => setActiveTab('Money')}>
          <TrendingUp size={18} /> Money & Content
        </button>
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'Overview' && (
          <motion.section
            key="overview"
            initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
          >
            <div className="grid-2-col">
              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <div className="stat-card-header">
                  <h3>Overall Study Progress</h3>
                  <TrendingUp className="text-primary" />
                </div>
                <div className="chart-container">
                  <ResponsiveContainer width="100%" height={250}>
                    <AreaChart data={studyLogs}>
                      <defs>
                        <linearGradient id="colorAvg" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#4f46e5" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#4f46e5', fontWeight: 'bold' }}
                      />
                      <Area type="monotone" dataKey="avg" stroke="#4f46e5" strokeWidth={3} fillOpacity={1} fill="url(#colorAvg)" animationDuration={1500} />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </motion.div>

              <motion.div className="stat-card" whileHover={{ y: -5 }}>
                <div className="stat-card-header">
                  <h3>Recent Activity</h3>
                  <Calendar className="text-primary" />
                </div>
                <div className="activity-feed">
                  {moneyLogs.length === 0 && contentLogs.length === 0 && <p className="text-gray italic">No recent activity.</p>}

                  {moneyLogs.slice(0,2).map((log, i) => (
                    <motion.div key={`m-${i}`} className="activity-item" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: i * 0.1}}>
                      <div className="activity-icon bg-green-100 text-green-600"><Briefcase size={16}/></div>
                      <div className="activity-details">
                        <p className="activity-text">Logged Share Market P&L: <strong>{log.pl}</strong></p>
                        <span className="activity-date">{log.date}</span>
                      </div>
                    </motion.div>
                  ))}
                  {contentLogs.slice(0,2).map((log, i) => (
                    <motion.div key={`c-${i}`} className="activity-item" initial={{opacity: 0, x: -20}} animate={{opacity: 1, x: 0}} transition={{delay: (i+2) * 0.1}}>
                      <div className="activity-icon bg-purple-100 text-purple-600"><Save size={16}/></div>
                      <div className="activity-details">
                        <p className="activity-text">Content Update: {log.note}</p>
                        <span className="activity-date">{log.date}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {activeTab === 'Tennis' && (
          <motion.section
            key="tennis" className="section-card"
            initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">Tennis Performance</h2>
                <p className="section-subtitle">Court aggression and tactical mindset.</p>
              </div>
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}>
                <Trophy className="text-orange" size={32} />
              </motion.div>
            </div>

            <motion.div className="tennis-goal" whileHover={{ scale: 1.02 }}>
              <Target className="mr-2" />
              <span><strong>Primary Mindset Directive:</strong> Only hitting hard at any matter.</span>
            </motion.div>

            <div className="info-box mt-4">
              <h4>Strategic Focus</h4>
              <p>Maintain power and aggressive play style during all practice sessions and matches. Do not compromise on swing speed, even under pressure.</p>
            </div>
          </motion.section>
        )}

        {activeTab === 'Study' && (
          <motion.section
            key="study" className="section-card"
            initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
          >
            <div className="section-header">
              <div>
                <h2 className="section-title">Academic Syllabus Tracker</h2>
                <p className="section-subtitle">2026-27 CBSE Batch</p>
              </div>
              <BookOpen className="text-blue" size={32} />
            </div>

            <div className="study-grid mt-4">
              <div className="study-controls">
                {subjects.map((subject) => (
                  <div key={subject} className="study-item">
                    <div className="study-item-header">
                      <label className="study-label">{subject}</label>
                      <span className="study-value">{studyProgress[subject]}%</span>
                    </div>
                    <div className="range-wrapper">
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={studyProgress[subject]}
                        onChange={(e) => handleStudyChange(subject, e.target.value)}
                        className="study-range"
                      />
                      <motion.div
                        className="range-progress"
                        initial={{ width: 0 }}
                        animate={{ width: `${studyProgress[subject]}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
                <motion.button
                  className="btn-primary w-full mt-4"
                  onClick={handleLogStudy}
                  whileHover={{ scale: 1.03, boxShadow: "0px 0px 8px rgb(79,70,229)" }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Plus size={18} /> Log Today's Progress
                </motion.button>
              </div>

              <div className="study-chart">
                <h3>Progress Trajectory</h3>
                <div className="chart-container" style={{ height: '300px', marginTop: '20px' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={studyLogs}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                      <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dy={10} />
                      <YAxis axisLine={false} tickLine={false} tick={{fill: '#6b7280', fontSize: 12}} dx={-10} domain={[0, 100]} />
                      <Tooltip
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
                      />
                      <Line type="monotone" dataKey="avg" stroke="#3b82f6" strokeWidth={4} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 8 }} animationDuration={1500} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === 'Money' && (
          <motion.section
             key="money" className="section-card"
             initial="initial" animate="in" exit="out" variants={pageVariants} transition={pageTransition}
          >
             <div className="section-header">
              <div>
                <h2 className="section-title">Wealth & Brand Builder</h2>
                <p className="section-subtitle">Financial tracking and content pipeline.</p>
              </div>
              <TrendingUp className="text-green" size={32} />
            </div>

            <div className="grid-2-col mt-4">
              <motion.div className="input-group card-inner" whileHover={{ y: -5 }}>
                <div className="flex-between mb-4">
                  <h3>Share Market P&L</h3>
                  <Briefcase className="text-gray" size={20} />
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. +$50 or -₹1000"
                    value={dailyPL}
                    onChange={(e) => setDailyPL(e.target.value)}
                    className="text-input"
                  />
                  <motion.button
                    className="btn-primary"
                    onClick={handleLogMoney}
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(79,70,229)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Save
                  </motion.button>
                </div>

                <div className="log-section mt-4">
                  <h4>Recent P&L History</h4>
                  {moneyLogs.length === 0 ? <p className="text-gray italic">No logs yet.</p> : (
                    <ul className="log-list">
                      <AnimatePresence>
                        {moneyLogs.map((log, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <span className="text-sm text-gray">{log.date}</span>
                            <span className={`font-semibold ${log.pl.includes('-') ? 'text-red-500' : 'text-green-600'}`}>{log.pl}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>
              </motion.div>

              <motion.div className="input-group card-inner" whileHover={{ y: -5 }}>
                <div className="flex-between mb-2">
                  <h3>Content Creation</h3>
                  <Save className="text-gray" size={20} />
                </div>
                <p className="text-sm text-gray mb-4">
                  <strong>Current Target:</strong> 2 videos/week, 1k subscribers.
                </p>

                <div className="flex-col gap-2">
                  <textarea
                    rows={2}
                    placeholder="What did you create today?"
                    value={contentProgress}
                    onChange={(e) => setContentProgress(e.target.value)}
                    className="textarea-input"
                  />
                  <motion.button
                    className="btn-primary self-end"
                    onClick={handleLogContent}
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgb(79,70,229)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Post Update
                  </motion.button>
                </div>

                <div className="log-section mt-4">
                  <h4>Content Log</h4>
                  {contentLogs.length === 0 ? <p className="text-gray italic">No logs yet.</p> : (
                    <ul className="log-list">
                      <AnimatePresence>
                        {contentLogs.map((log, i) => (
                          <motion.li
                            key={i} className="flex-col items-start gap-1"
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                          >
                            <span className="text-xs text-gray uppercase tracking-wider">{log.date}</span>
                            <span className="text-sm">{log.note}</span>
                          </motion.li>
                        ))}
                      </AnimatePresence>
                    </ul>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}