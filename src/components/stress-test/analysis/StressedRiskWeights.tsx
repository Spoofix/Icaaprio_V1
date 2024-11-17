import React, { useState } from 'react';
import { Building2, Users, CreditCard, Info } from 'lucide-react';
import PDDistribution from './stress-components/PDDistribution';
import LGDDistribution from './stress-components/LGDDistribution';
import RetailStressedRiskWeights from './stress-components/RetailStressedRiskWeights';
import BusinessStressedRiskWeights from './stress-components/BusinessStressedRiskWeights';

export default function StressedRiskWeights() {
  const [selectedPortfolio, setSelectedPortfolio] = useState('retail');
  
  const macroFactors = {
    moderate: {
      gdpChange: -2.1,
      unemploymentChange: 2.5,
      housePriceChange: -12.5,
      interestRateChange: 2.0
    },
    severe: {
      gdpChange: -4.7,
      unemploymentChange: 4.8,
      housePriceChange: -25.0,
      interestRateChange: 3.5
    },
    extreme: {
      gdpChange: -7.2,
      unemploymentChange: 7.2,
      housePriceChange: -35.0,
      interestRateChange: 5.0
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Monte Carlo simulation using macro factors to estimate stressed risk weights.
              Results show distribution of potential risk weight changes under different scenarios.
            </p>
          </div>
        </div>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={() => setSelectedPortfolio('retail')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            selectedPortfolio === 'retail'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Retail Portfolio
        </button>
        <button
          onClick={() => setSelectedPortfolio('business')}
          className={`flex items-center px-4 py-2 rounded-lg ${
            selectedPortfolio === 'business'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
          }`}
        >
          <Building2 className="w-4 h-4 mr-2" />
          Business Portfolio
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PDDistribution portfolioType={selectedPortfolio} />
        <LGDDistribution portfolioType={selectedPortfolio} />
      </div>

      {selectedPortfolio === 'retail' && (
        <RetailStressedRiskWeights macroFactors={macroFactors} />
      )}
      {selectedPortfolio === 'business' && (
        <BusinessStressedRiskWeights macroFactors={macroFactors} />
      )}
    </div>
  );
}