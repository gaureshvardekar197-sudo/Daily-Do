import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Zap, TrendingUp, Target, Star } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-5 md:py-8">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full opacity-40 blur-3xl" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full opacity-40 blur-3xl" />
      
      <div className="relative max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-blue-200 rounded-full text-blue-700 font-medium mb-8 shadow-sm">
              <Star className="w-4 h-4" />
              <span>Smart Daily Planning</span>
            </div>
            
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Organize Your Day
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 block">
                Focus on Priorities
              </span>
            </h1>
            
            {/* Description */}
            <p className="text-xl text-gray-600 mb-10 max-w-xl leading-relaxed">
              Manage your daily tasks effectively. Organize by priority, track progress, 
              and carry forward unfinished work automatically.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link 
                to="/register"
                className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105 font-medium flex items-center justify-center gap-3 text-lg"
              >
                <span>Get Started </span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
              {/* <Link 
                to="/login"
                className="group bg-white border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 font-medium flex items-center justify-center gap-2 text-lg"
              >
                <span>Sign In</span>
              </Link> */}
            </div>
            
            {/* Stats */}
            <div className="flex flex-wrap gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">5K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">96%</div>
                <div className="text-sm text-gray-500">Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">4.8</div>
                <div className="text-sm text-gray-500">Average Rating</div>
              </div>
            </div>
          </div>
          
          {/* Feature cards grid */}
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Daily Focus</h3>
              <p className="text-gray-600 text-sm">Start each day with organized priority tasks</p>
            </div>
            
            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Auto Carry-Over</h3>
              <p className="text-gray-600 text-sm">Unfinished tasks move to the next day automatically</p>
            </div>
            
            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Progress Tracking</h3>
              <p className="text-gray-600 text-sm">Monitor daily completion rates and productivity</p>
            </div>
            
            {/* Card 4 - Priority Levels */}
            <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Priority Levels</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">High Priority - Must do today</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Medium Priority - Should do</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-700">Low Priority - Nice to have</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute top-1/4 -left-4 w-8 h-8 bg-blue-400 rounded-full opacity-20" />
        <div className="absolute bottom-1/4 -right-4 w-12 h-12 bg-indigo-400 rounded-full opacity-20" />
        <div className="absolute top-1/2 left-1/4 w-6 h-6 bg-purple-300 rounded-full opacity-30" />
      </div>
    </section>
  );
};

export default Hero;