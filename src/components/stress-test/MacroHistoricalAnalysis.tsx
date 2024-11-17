import React from 'react';
import { Info } from 'lucide-react';
import MacroeconomicInputs from './MacroeconomicInputs';
import HistoricalEvents from './HistoricalEvents';

export default function MacroHistoricalAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
          Historical Event Analysis & Stress Calibration
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Comprehensive analysis of historical stress events to calibrate scenario severity and validate stress testing assumptions.
        </p>
      </div>

      <div className="space-y-6">
        <MacroeconomicInputs />
        <HistoricalEvents />
      </div>
    </div>
  );
}