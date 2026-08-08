import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  { text: "MediBot transformed our triage process. Waiting times dropped by 70%.", author: "Dr. A. Smith", role: "Hospital Director" },
  { text: "The most intuitive platform I've used in my 20 years of practice.", author: "Dr. B. Jones", role: "Lead Surgeon" },
  { text: "Patients love the instant AI responses before their actual appointments.", author: "C. Davis", role: "Head Nurse" }
];

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white">Trusted by the best.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((test, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-white/10"
            >
              <p className="text-slate-600 dark:text-slate-300 text-lg italic mb-6">"{test.text}"</p>
              <div>
                <p className="font-bold text-slate-900 dark:text-white">{test.author}</p>
                <p className="text-primary-500 text-sm">{test.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
