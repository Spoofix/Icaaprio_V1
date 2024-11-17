import React from 'react';
import { Shield, LineChart, Lock } from 'lucide-react';

export default function Hero() {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
          <span className="block">Streamline Your</span>
          <span className="block text-blue-600 dark:text-blue-400">ICAAP Process</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 dark:text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Comprehensive ICAAP management solution aligned with OSFI and BCFSA guidelines. 
          Ensure regulatory compliance with powerful stress testing and reporting tools.
        </p>
        
        <div className="mt-10 flex justify-center gap-3">
          <button className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:text-lg">
            Get Started
          </button>
          <button className="px-8 py-3 border border-gray-300 dark:border-gray-700 text-base font-medium rounded-md text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 md:text-lg">
            Learn More
          </button>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Regulatory Compliance</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Aligned with OSFI and BCFSA guidelines
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Advanced Analytics</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Comprehensive stress testing and reporting
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">Data Security</h3>
            <p className="mt-2 text-base text-gray-500 dark:text-gray-400">
              Enterprise-grade security and encryption
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}