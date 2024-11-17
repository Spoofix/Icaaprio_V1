import React from 'react';
import { Info } from 'lucide-react';

export default function CyberRiskAnalysis() {
  return (
    <div className="mt-6 bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-start space-x-3">
        <Info className="w-5 h-5 text-blue-500 mt-0.5" />
        <p className="text-sm text-gray-600 dark:text-gray-300">
          Cyber Risk analysis module will display security incident analysis, vulnerability assessments, and cyber risk metrics.
        </p>
      </div>
    </div>
  );
}