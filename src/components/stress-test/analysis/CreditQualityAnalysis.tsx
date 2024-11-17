import React, { useState } from 'react';
import { Info, AlertTriangle } from 'lucide-react';
import OddsRatioAnalysis from './credit-quality/OddsRatioAnalysis';
import { CreditScoreTransition } from './stress-components/CreditScoreTransition';

export default function CreditQualityAnalysis() {
  const [macroFactors] = useState({
    gdpChange: -2.5,
    unemploymentChange: 3.2,
    housePriceChange: -15.0
  });

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Credit quality analysis integrates historical odds ratios with macro-driven score migration patterns.
              Model validated against historical stress events and industry benchmarks.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OddsRatioAnalysis />
        <CreditScoreTransition macroFactors={macroFactors} />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Model Assumptions and Limitations
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>Score migration based on empirical studies and historical patterns</li>
              <li>Odds ratios updated monthly using credit bureau data</li>
              <li>Model assumes similar behavior patterns across stress events</li>
              <li>Regional economic variations may impact migration patterns</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}