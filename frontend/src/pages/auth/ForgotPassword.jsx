import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../../lib/axios';
import { motion } from 'framer-motion';
import { Mail, Loader2, ArrowLeft } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus('');
    try {
      await api.post('/auth/forgot-password', { email });
      setStatus('If an account exists, a reset code has been sent.');
    } catch (err) {
      setStatus('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="mb-6">
            <Link to="/login" className="inline-flex items-center text-sm font-medium text-slate-400 hover:text-white transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to login
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Reset Password</h1>
          <p className="text-slate-400 mb-8 text-sm">Enter your email and we'll send you a code to reset your password.</p>

          {status && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-blue-500/10 border border-blue-500/50 text-blue-400 p-3 rounded-xl text-sm mb-6">
              {status}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  placeholder="Email Address"
                  required
                />
              </div>
            </div>
            
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={isLoading} className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 text-white font-medium rounded-xl transition-all disabled:opacity-70 flex justify-center border border-white/20">
              {isLoading ? <Loader2 className="animate-spin h-5 w-5" /> : 'Send Reset Code'}
            </motion.button>
            <div className="text-center mt-4">
              <Link to="/reset-password" className="text-sm font-medium text-blue-400 hover:text-blue-300">
                Already have a code?
              </Link>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
