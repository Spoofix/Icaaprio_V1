import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface StressLevelSelectionProps {
  selectedStressLevels: {
    [key: string]: string;
  };
  recommendations: {
    [key: string]: string;
  };
  onStressLevelChange: (portfolio: string, level: string) => void;
  onPortfolioAnalysis: (portfolio: string, recommendedStress: string) => void;
}

export default function StressLevelSelection({
  selectedStressLevels,
  recommendations,
  onStressLevelChange,
  onPortfolioAnalysis
}: StressLevelSelectionProps) {
  const portfolios = [
    {
      id: 'retail',
      name: 'Retail Portfolio',
      description: 'Consumer loans, mortgages, and credit cards'
    },
    {
      id: 'business',
      name: 'Business Portfolio',
      description: 'Commercial loans and business credit'
    },
    {
      id: 'cre',
      name: 'CRE Portfolio',
      description: 'Commercial real estate exposures'
    },
    {
      id: 'securitization',
      name: 'Securitization Portfolio',
      description: 'Securitized assets and structured products'
    }
  ];

  const stressLevels = ['moderate', 'severe', 'extreme'];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Portfolio Stress Level Selection
        </h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Select appropriate stress levels for each portfolio based on risk characteristics
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {portfolios.map((portfolio) => (
          <div
            key={portfolio.id}
            className="p-4 rounded-lg border border-gray-200 dark:border-gray-700"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {portfolio.name}
                </h4>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {portfolio.description}
                </p>
              </div>
              {recommendations[portfolio.id] && (
                <div className="flex items-center">
                  <Info className="w-4 h-4 text-blue-500 mr-1" />
                  <span className="text-xs text-blue-600 dark:text-blue-400">
                    Recommended: {recommendations[portfolio.id]}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-2">
              {stressLevels.map((level) => (
                <button
                  key={level}
                  onClick={() => onStressLevelChange(portfolio.id, level)}
                  className={`flex-1 px-3 py-2 text-sm font-medium rounded-md ${
                    selectedStressLevels[portfolio.id] === level
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300'
                      : 'bg-gray-100 text-gray-700 dark:bg-gray-700/50 dark:text-gray-300'
                  }`}
                >
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </button>
              ))}
            </div>

            {recommendations[portfolio.id] && 
             recommendations[portfolio.id] !== selectedStressLevels[portfolio.id] && (
              <div className="mt-4 p-2 bg-yellow-50 dark:bg-yellow-900/30 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 mr-2" />
                  <p className="text-xs text-yellow-700 dark:text-yellow-300">
                    Selected stress level differs from recommendation based on portfolio characteristics
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}