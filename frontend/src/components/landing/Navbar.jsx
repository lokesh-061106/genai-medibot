import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { HeartPulse, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-7xl mx-auto bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200 dark:border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-sm transition-colors duration-300">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-500 p-2 rounded-xl text-white">
            <HeartPulse className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">MediBot<span className="text-primary-500">.</span></span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Features</a>
          <a href="#how-it-works" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">How it Works</a>
          <a href="#testimonials" className="text-sm font-medium text-slate-600 dark:text-slate-300 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Reviews</a>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={toggleTheme} className="p-2 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 rounded-full transition-colors">
            {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
          <Link to="/login" className="hidden md:block text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-primary-500 dark:hover:text-primary-400 transition-colors">Log In</Link>
          <Link to="/register" className="px-5 py-2.5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-sm font-medium rounded-xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform duration-200">
            Get Started
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}
