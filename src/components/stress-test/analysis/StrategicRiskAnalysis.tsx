import React from 'react';
import { Info } from 'lucide-react';

export default function StrategicRiskAnalysis() {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Strategic Risk analysis module will display business strategy analysis, market position assessment, and competitive analysis.
        </p>
      </div>
    </div>
  );
}