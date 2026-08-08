import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Bot, ShieldAlert, Globe, Clock, Smartphone } from 'lucide-react';

const features = [
  {
    icon: <Bot className="w-6 h-6" />,
    title: "Autonomous Agents",
    description: "Multi-agent systems handle scheduling, triage, and follow-ups without human intervention."
  },
  {
    icon: <FileText className="w-6 h-6" />,
    title: "Smart EMR",
    description: "Vector-search enabled electronic medical records for instant historical context retrieval."
  },
  {
    icon: <ShieldAlert className="w-6 h-6" />,
    title: "Anomaly Detection",
    description: "Proactive alerts for abnormal test results or conflicting medication prescriptions."
  },
  {
    icon: <Globe className="w-6 h-6" />,
    title: "Gov. Integration",
    description: "Seamless synchronization with national health registries and compliance schemes."
  },
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Zero Wait Time",
    description: "Intelligent queue management drastically reduces physical waiting room times."
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "Telehealth Native",
    description: "Built-in video consultations with live AI transcription and summarization."
  }
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary-500 font-semibold tracking-wide uppercase mb-3">Capabilities</h2>
          <h3 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6">Everything you need to run a modern hospital.</h3>
          <p className="text-slate-600 dark:text-slate-400 text-lg">
            We've completely re-engineered the healthcare stack from the ground up, placing artificial intelligence at the core of every workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-8 rounded-3xl transition-all hover:shadow-xl dark:hover:shadow-primary-500/10"
            >
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-2xl flex items-center justify-center text-primary-500 shadow-sm border border-slate-100 dark:border-slate-700 mb-6 transition-colors duration-300">
                {feature.icon}
              </div>
              <h4 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h4>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
