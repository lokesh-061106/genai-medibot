import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ShieldCheck, Activity, Brain } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary-500/10 dark:bg-primary-500/20 blur-[120px]" />
        <div className="absolute bottom-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-blue-500/10 dark:bg-blue-500/20 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-500/10 text-primary-600 dark:text-primary-400 font-medium text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              MediBot 3.0 is now live
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.1] mb-6"
            >
              The Future of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-blue-600">Healthcare AI.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            >
              Experience a paradigm shift in medical management. AI-driven diagnostics, seamless patient records, and intelligent automation built for modern hospitals.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/register" className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-semibold rounded-2xl transition-all shadow-lg shadow-primary-500/30 flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </Link>
              <a href="#how-it-works" className="w-full sm:w-auto px-8 py-4 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-700 dark:text-white font-semibold rounded-2xl transition-all flex items-center justify-center">
                See How It Works
              </a>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/20 to-blue-500/20 rounded-3xl blur-3xl transform rotate-3" />
            <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-2xl border border-slate-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                    <Brain className="w-8 h-8 text-primary-500 mb-4" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">AI Diagnostics</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">99.8% accuracy in preliminary screening</p>
                  </div>
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                    <Activity className="w-8 h-8 text-blue-500 mb-4" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">Real-time Vitals</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Continuous patient monitoring</p>
                  </div>
                </div>
                <div className="space-y-4 mt-8">
                  <div className="bg-slate-50 dark:bg-white/5 p-6 rounded-2xl border border-slate-100 dark:border-white/5">
                    <ShieldCheck className="w-8 h-8 text-emerald-500 mb-4" />
                    <h3 className="font-semibold text-slate-900 dark:text-white">Bank-grade Security</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">HIPAA compliant architecture</p>
                  </div>
                  <div className="bg-gradient-to-br from-primary-500 to-blue-600 p-6 rounded-2xl text-white shadow-xl">
                    <div className="text-4xl font-bold mb-2">24/7</div>
                    <p className="text-sm opacity-90">Autonomous Support</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
