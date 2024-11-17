import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';

interface StressLevelSelectorProps {
  selectedLevel: 'moderate' | 'severe' | 'extreme';
  onChange: (level: 'moderate' | 'severe' | 'extreme') => void;
  recommendation: 'moderate' | 'severe' | 'extreme' | null;
  results?: {
    stressLevels: {
      var95: number;
      var99: number;
      var9999: number;
    };
  };
}

export default function StressLevelSelector({
  selectedLevel,
  onChange,
  recommendation,
  results
}: StressLevelSelectorProps) {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  const getRecommendationReason = () => {
    if (!results) return null;

    const totalExposure = results.stressLevels.var95 * 2;
    const maxLoss = results.stressLevels.var9999;
    const lossRatio = maxLoss / totalExposure;

    if (recommendation === 'extreme') {
      return {
        reason: 'High concentration and volatility detected',
        factors: [
          'Large position sizes relative to portfolio',
          'High market volatility in risk factors',
          'Significant correlation between positions',
          'Historical stress events show potential for extreme losses'
        ]
      };
    } else if (recommendation === 'severe') {
      return {
        reason: 'Moderate concentration with some risk factors',
        factors: [
          'Balanced position sizes but some concentration',
          'Normal market volatility conditions',
          'Some correlated positions identified',
          'Historical patterns suggest heightened risk'
        ]
      };
    } else {
      return {
        reason: 'Well-diversified portfolio with controlled risk',
        factors: [
          'Smaller position sizes relative to portfolio',
          'Low market volatility environment',
          'Good diversification across risk factors',
          'Historical analysis shows resilience to stress'
        ]
      };
    }
  };

  const levels = [
    {
      id: 'moderate',
      label: 'Moderate',
      description: '95% confidence level',
      multiplier: 1.5,
      value: results?.stressLevels.var95 ?? 0,
      capital: (results?.stressLevels.var95 ?? 0) * 1.5
    },
    {
      id: 'severe',
      label: 'Severe',
      description: '99% confidence level',
      multiplier: 2.0,
      value: results?.stressLevels.var99 ?? 0,
      capital: (results?.stressLevels.var99 ?? 0) * 2.0
    },
    {
      id: 'extreme',
      label: 'Extreme',
      description: '99.99% confidence level',
      multiplier: 3.0,
      value: results?.stressLevels.var9999 ?? 0,
      capital: (results?.stressLevels.var9999 ?? 0) * 3.0
    }
  ];

  const recommendationDetails = getRecommendationReason();

  return (
    <div className="space-y-6">
      {recommendation && recommendationDetails && (
        <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                {recommendationDetails.reason}
              </p>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                {recommendationDetails.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onChange(level.id as 'moderate' | 'severe' | 'extreme')}
            className={`p-4 rounded-lg border ${
              selectedLevel === level.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
            } ${
              recommendation === level.id
                ? 'ring-2 ring-green-500 dark:ring-green-400'
                : ''
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium">{level.label}</span>
              {recommendation === level.id && (
                <span className="text-xs text-green-600 dark:text-green-400">
                  Recommended
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {level.description}
            </p>
            <div className="mt-3 space-y-1">
              {results && (
                <>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    VaR: {formatCurrency(level.value)}
                  </p>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Capital: {formatCurrency(level.capital)}
                  </p>
                </>
              )}
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Multiplier: {level.multiplier}x
              </p>
            </div>
          </button>
        ))}
      </div>

      {selectedLevel !== recommendation && recommendation && (
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                Selected stress level differs from recommendation
              </h4>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                {selectedLevel === 'moderate' && recommendation !== 'moderate'
                  ? 'Current selection may underestimate potential losses given portfolio characteristics.'
                  : 'Current selection may be overly conservative for your portfolio profile.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}