import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const doctors = [
  { name: "Dr. Sarah Jenkins", role: "Chief Cardiologist", img: "https://i.pravatar.cc/300?img=1" },
  { name: "Dr. Michael Chen", role: "Lead Neurologist", img: "https://i.pravatar.cc/300?img=11" },
  { name: "Dr. Emily Roberts", role: "Pediatric Specialist", img: "https://i.pravatar.cc/300?img=5" }
];

export default function DoctorsSection() {
  return (
    <section className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-500 font-semibold tracking-wide uppercase mb-3">Top Medical Minds</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">World-class doctors, empowered by AI.</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {doctors.map((doc, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 transition-colors duration-300"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img src={doc.img} alt={doc.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-1 text-amber-400 mb-2">
                  <Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" /><Star className="w-4 h-4 fill-current" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-1">{doc.name}</h4>
                <p className="text-primary-600 dark:text-primary-400 font-medium">{doc.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
