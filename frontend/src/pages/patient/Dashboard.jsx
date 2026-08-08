import React, { useEffect, useState } from 'react';
import { api } from '../../lib/axios';
import { motion } from 'framer-motion';
import { Loader2, Activity, Calendar, FileText, HeartPulse, Pill, ShieldAlert, Sparkles, User, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await api.get('/patient/dashboard');
        setData(response.data);
      } catch (err) {
        console.error("Failed to load dashboard", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboard();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
      </div>
    );
  }

  if (!data) return <div className="p-8">Failed to load data.</div>;

  // Format vitals for recharts
  const chartData = data.vitals.map(v => ({
    time: new Date(v.recorded_at).toLocaleDateString(),
    systolic: v.blood_pressure_systolic,
    diastolic: v.blood_pressure_diastolic,
    hr: v.heart_rate
  }));

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary-500 p-2 rounded-xl text-white">
            <HeartPulse className="w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight">MediBot<span className="text-primary-500">.</span> Patient</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-full">
            <User className="w-4 h-4 text-slate-500" />
            <span className="text-sm font-medium">{user?.email}</span>
          </div>
          <button onClick={logout} className="p-2 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back.</h1>
          <p className="text-slate-500">Here is your AI-curated health overview.</p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          
          {/* Health Score */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm flex flex-col items-center justify-center relative overflow-hidden">
             <h3 className="font-semibold text-slate-500 mb-6 w-full">Health Score</h3>
             <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="80" cy="80" r="70" className="stroke-slate-100 dark:stroke-slate-800" strokeWidth="12" fill="none" />
                  <circle cx="80" cy="80" r="70" className={`${data.health_score > 80 ? 'stroke-emerald-500' : 'stroke-amber-500'}`} strokeWidth="12" fill="none" strokeDasharray="440" strokeDashoffset={440 - (440 * data.health_score) / 100} strokeLinecap="round" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-4xl font-bold">{data.health_score}</span>
                  <span className="text-xs text-slate-400">/ 100</span>
                </div>
             </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary-500 to-blue-600 rounded-3xl p-6 border border-white/10 shadow-lg text-white">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-yellow-300" />
              <h3 className="font-bold text-lg">AI Health Insights</h3>
            </div>
            <ul className="space-y-3">
              {data.insights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-3 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
                  <Activity className="w-5 h-5 flex-shrink-0 mt-0.5 opacity-80" />
                  <span className="font-medium leading-relaxed">{insight}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Vitals Chart */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="col-span-1 md:col-span-3 lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm h-80">
            <h3 className="font-semibold text-slate-500 mb-4 flex items-center gap-2"><Activity className="w-4 h-4"/> Blood Pressure Trend</h3>
            <div className="w-full h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorSys" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorDia" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} domain={['dataMin - 10', 'dataMax + 10']} />
                  <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Area type="monotone" dataKey="systolic" stroke="#ef4444" strokeWidth={3} fillOpacity={1} fill="url(#colorSys)" name="Systolic" />
                  <Area type="monotone" dataKey="diastolic" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorDia)" name="Diastolic" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Upcoming Appointments */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm overflow-y-auto h-80">
            <h3 className="font-semibold text-slate-500 mb-4 flex items-center gap-2"><Calendar className="w-4 h-4"/> Upcoming Visits</h3>
            {data.upcoming_appointments.length === 0 ? (
              <p className="text-sm text-slate-400">No upcoming appointments.</p>
            ) : (
              <div className="space-y-3">
                {data.upcoming_appointments.map(appt => (
                  <div key={appt.id} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5">
                    <p className="font-medium text-sm">{new Date(appt.scheduled_at).toLocaleDateString()}</p>
                    <p className="text-xs text-primary-500 mt-1">{appt.hospital_name}</p>
                    <span className="inline-block px-2 py-1 bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] rounded-md mt-2 font-medium uppercase tracking-wider">{appt.status}</span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Active Medication */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="col-span-1 md:col-span-1 lg:col-span-1 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm overflow-y-auto h-80">
            <h3 className="font-semibold text-slate-500 mb-4 flex items-center gap-2"><Pill className="w-4 h-4"/> Medication</h3>
            {data.active_medications.length === 0 ? (
              <p className="text-sm text-slate-400">No active medication.</p>
            ) : (
              <div className="space-y-3">
                {data.active_medications.map((med, idx) => (
                  <div key={idx} className="p-4 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-500/20 text-blue-500 flex items-center justify-center flex-shrink-0">
                      <Pill className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{med.name}</p>
                      <p className="text-xs text-slate-400 mt-1">{med.dosage} • {med.frequency}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>

          {/* Medical History & Gov Schemes (Side by side in remaining space) */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="col-span-1 md:col-span-2 lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-sm">
             <h3 className="font-semibold text-slate-500 mb-4 flex items-center gap-2"><FileText className="w-4 h-4"/> Conditions & Schemes</h3>
             <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">Active Conditions</h4>
                  <ul className="space-y-2">
                    {data.medical_history.map((hist, idx) => (
                      <li key={idx} className="text-sm font-medium p-2 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg flex items-center gap-2">
                        <ShieldAlert className="w-4 h-4" /> {hist.condition}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h4 className="text-xs font-semibold uppercase text-slate-400 mb-3 tracking-wider">Govt Schemes</h4>
                  <ul className="space-y-2">
                    {data.government_schemes.map((scheme, idx) => (
                      <li key={idx} className="text-sm font-medium p-2 bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-400 rounded-lg border border-primary-100 dark:border-primary-500/20">
                        {scheme.name}
                      </li>
                    ))}
                  </ul>
                </div>
             </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
