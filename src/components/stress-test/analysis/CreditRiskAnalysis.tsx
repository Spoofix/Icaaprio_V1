import React, { useState } from 'react';
import { Building2, Users, CreditCard, Scale } from 'lucide-react';
import RetailStressAnalysis from './portfolio-stress/RetailStressAnalysis';
import BusinessStressAnalysis from './portfolio-stress/BusinessStressAnalysis';
import CREStressAnalysis from './portfolio-stress/CREStressAnalysis';
import SecuritizationStressAnalysis from './portfolio-stress/SecuritizationStressAnalysis';

export default function CreditRiskAnalysis() {
  const [selectedPortfolio, setSelectedPortfolio] = useState('retail');
  const [selectedStressLevel, setSelectedStressLevel] = useState<'moderate' | 'severe' | 'extreme'>('moderate');

  const portfolios = [
    { id: 'retail', name: 'Retail Portfolio', icon: Users },
    { id: 'business', name: 'Business Portfolio', icon: Building2 },
    { id: 'cre', name: 'CRE Portfolio', icon: Building2 },
    { id: 'securitization', name: 'Securitization', icon: Scale }
  ];

  const handleStressAnalysisComplete = (recommendedStress: string) => {
    if (recommendedStress !== selectedStressLevel) {
      console.log(`Recommended stress level: ${recommendedStress}`);
    }
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex space-x-4 overflow-x-auto">
          {portfolios.map((portfolio) => {
            const Icon = portfolio.icon;
            return (
              <button
                key={portfolio.id}
                onClick={() => setSelectedPortfolio(portfolio.id)}
                className={`flex items-center whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  selectedPortfolio === portfolio.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {portfolio.name}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Portfolio Content */}
      <div className="mt-4">
        {selectedPortfolio === 'retail' && (
          <RetailStressAnalysis
            selectedStressLevel={selectedStressLevel}
            onAnalysisComplete={handleStressAnalysisComplete}
          />
        )}
        {selectedPortfolio === 'business' && (
          <BusinessStressAnalysis
            selectedStressLevel={selectedStressLevel}
            onAnalysisComplete={handleStressAnalysisComplete}
          />
        )}
        {selectedPortfolio === 'cre' && (
          <CREStressAnalysis
            selectedStressLevel={selectedStressLevel}
            onAnalysisComplete={handleStressAnalysisComplete}
          />
        )}
        {selectedPortfolio === 'securitization' && (
          <SecuritizationStressAnalysis
            selectedStressLevel={selectedStressLevel}
            onAnalysisComplete={handleStressAnalysisComplete}
          />
        )}
      </div>
    </div>
  );
}