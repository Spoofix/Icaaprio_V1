import React from 'react';
import { Info } from 'lucide-react';

export default function ClimateRiskAnalysis() {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Climate Risk analysis module will display physical risk exposure, transition risk analysis, and climate scenario results.
        </p>
      </div>
    </div>
  );
}