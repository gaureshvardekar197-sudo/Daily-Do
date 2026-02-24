import React from 'react';
import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import ProblemSolution from '../components/landing/ProblemSolution';
import UserStories from '../components/landing/UserStories';
import Footer from '../components/landing/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />
      <ProblemSolution />
      <UserStories />
      <Footer />
    </div>
  );
};

export default LandingPage;