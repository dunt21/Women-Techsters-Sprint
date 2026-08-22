// import React from 'react'
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import HowItWorks from '@/components/landing/How-it-Works';

export const LandingPage = () => {
  return (
    <div className="flex flex-col w-full">
      <Hero />
      <Features />
      <HowItWorks />
    </div>
  );
};
