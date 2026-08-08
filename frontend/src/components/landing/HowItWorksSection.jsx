import React from 'react';
import { motion } from 'framer-motion';

const steps = [
  { num: "01", title: "Create Profile", desc: "Sign up securely using your national ID. Our system automatically fetches your historical data securely." },
  { num: "02", title: "AI Triage", desc: "Chat with MediBot to describe your symptoms. It schedules the right specialist instantly." },
  { num: "03", title: "Consult & Treat", desc: "Attend telehealth or in-person visits. Vitals and notes are updated in real-time." }
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-primary-500 font-semibold tracking-wide uppercase mb-3">Workflow</h2>
            <h3 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-8">Frictionless healthcare, from start to finish.</h3>
            
            <div className="space-y-8">
              {steps.map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.2 }}
                  className="flex gap-6"
                >
                  <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-xl font-bold text-primary-500 shadow-sm transition-colors duration-300">
                    {step.num}
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">{step.title}</h4>
                    <p className="text-slate-600 dark:text-slate-400">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-primary-100 to-blue-50 dark:from-primary-900/30 dark:to-blue-900/20 p-8 flex items-center justify-center transition-colors duration-300">
               {/* Abstract placeholder for app interface */}
               <div className="w-full h-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col">
                 <div className="h-12 border-b border-slate-100 dark:border-white/5 flex items-center px-4 gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                 </div>
                 <div className="p-6 flex-1 flex flex-col gap-4">
                   <div className="w-3/4 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg animate-pulse"></div>
                   <div className="w-full h-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse delay-75"></div>
                   <div className="w-5/6 h-24 bg-slate-100 dark:bg-slate-800 rounded-xl animate-pulse delay-150"></div>
                 </div>
               </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
