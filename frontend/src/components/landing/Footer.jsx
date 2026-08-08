import React from 'react';
import { HeartPulse } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 border-t border-white/10 text-slate-400">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-primary-500 p-1.5 rounded-lg text-white">
              <HeartPulse className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">MediBot<span className="text-primary-500">.</span></span>
          </div>
          <p className="text-sm">Building the future of autonomous healthcare.</p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary-400">Features</a></li>
            <li><a href="#" className="hover:text-primary-400">Security</a></li>
            <li><a href="#" className="hover:text-primary-400">Pricing</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary-400">About Us</a></li>
            <li><a href="#" className="hover:text-primary-400">Careers</a></li>
            <li><a href="#" className="hover:text-primary-400">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-primary-400">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-primary-400">Terms of Service</a></li>
            <li><a href="#" className="hover:text-primary-400">HIPAA Compliance</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 pt-8 border-t border-white/10 text-sm text-center">
        &copy; {new Date().getFullYear()} MediBot Inc. All rights reserved.
      </div>
    </footer>
  );
}
