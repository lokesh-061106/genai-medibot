import React from 'react';
import { motion } from 'framer-motion';

const stats = [
  { value: "10M+", label: "Patient Records" },
  { value: "99.9%", label: "System Uptime" },
  { value: "500+", label: "Partner Hospitals" },
  { value: "24/7", label: "AI Monitoring" }
];

export default function StatisticsSection() {
  return (
    <section className="py-20 bg-primary-600 dark:bg-slate-900 border-y border-primary-500 dark:border-white/10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-x divide-primary-400 dark:divide-white/10">
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="text-center px-4"
            >
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2">{stat.value}</div>
              <div className="text-primary-100 dark:text-slate-400 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
