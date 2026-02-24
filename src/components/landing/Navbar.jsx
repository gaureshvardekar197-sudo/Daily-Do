import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  ChevronRight,
  Calendar,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
              <Calendar className="w-7 h-7 text-white" />
            </div>
            <div>
              <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
                DailyDo
              </span>
              <div className="text-xs text-gray-500 -mt-1 font-medium">
                PRODUCTIVITY SUITE
              </div>
            </div>
          </Link>

          {/* Desktop */}
          <div className="hidden lg:flex items-center space-x-10">
            {/* Links */}
            <div className="flex items-center space-x-8">
              {["features", "how-it-works", "users"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className="text-gray-700 hover:text-blue-600 font-medium text-lg relative group"
                >
                  {item.replace("-", " ")}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 group-hover:w-full transition-all rounded-full" />
                </a>
              ))}
            </div>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300" />

            {/* Auth + Social */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-6 py-2.5 border border-gray-200 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition"
              >
                Sign In
              </Link>

              {/* Social Icons */}
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-black transition"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-500 transition"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-blue-700 transition"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-3 rounded-lg hover:bg-gray-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="p-4 space-y-2">
              {["features", "how-it-works", "users"].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsOpen(false)}
                  className="flex justify-between px-5 py-4 rounded-xl hover:bg-blue-50 text-lg"
                >
                  {item.replace("-", " ")}
                  <ChevronRight />
                </a>
              ))}

              <div className="pt-4 border-t space-y-4">
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-center px-5 py-4 border rounded-xl hover:bg-blue-50"
                >
                  Sign In
                </Link>

                {/* Mobile Social Icons */}
                <div className="flex justify-center gap-6 pt-2">
                  <Github />
                  <Twitter />
                  <Linkedin />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
