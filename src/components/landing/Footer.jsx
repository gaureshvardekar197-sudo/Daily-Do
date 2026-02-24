import React from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Github,
  Twitter,
  Mail,
  Heart,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-gradient-to-b from-gray-900 to-black text-gray-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600
                              flex items-center justify-center shadow-lg">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">DailyDo</span>
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your daily productivity companion designed to help you focus,
              finish, and feel accomplished every day.
            </p>

            <div className="flex gap-4">
              {[Github, Twitter, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center
                             hover:bg-blue-600 transition-colors"
                >
                  <Icon className="w-5 h-5 text-gray-300 hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-5">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <a href="#features" className="hover:text-white transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-white transition">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#users" className="hover:text-white transition">
                  Our Users
                </a>
              </li>
              
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-5">Legal</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition">Cookie Policy</a></li>
              <li><a href="#" className="hover:text-white transition">GDPR</a></li>
            </ul>
          </div>

          {/* CTA */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-3">
              Ready to get started?
            </h3>
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              Join thousands of users boosting their productivity with DailyDo.
            </p>
            <Link
              to="/register"
              className="block text-center bg-gradient-to-r from-blue-500 to-indigo-600
                         text-white px-6 py-3 rounded-xl font-semibold
                         hover:opacity-90 transition"
            >
              Sign Up 
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 mt-14 pt-6 text-center text-sm text-gray-400">
          <p className="flex items-center justify-center gap-1">
            Made with Webtechnologies Group 
            {/* <Heart className="w-4 h-4 text-red-500" /> */}
             <span className="flex items-center justify-center gap-1"> © {currentYear} DailyDo</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
