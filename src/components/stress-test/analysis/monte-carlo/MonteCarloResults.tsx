import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info, AlertTriangle } from 'lucide-react';
import { generateCorrelatedRandoms, calculateConfidenceInterval, calculateRiskWeight } from './MonteCarloUtils';

interface MonteCarloResultsProps {
  macroFactors: {
    moderate: {
      gdpChange: number;
      unemploymentChange: number;
      housePriceChange: number;
      interestRateChange: number;
    };
    severe: {
      gdpChange: number;
      unemploymentChange: number;
      housePriceChange: number;
      interestRateChange: number;
    };
    extreme: {
      gdpChange: number;
      unemploymentChange: number;
      housePriceChange: number;
      interestRateChange: number;
    };
  };
}

export default function MonteCarloResults({ macroFactors }: MonteCarloResultsProps) {
  const ITERATIONS = 10000;
  const CONFIDENCE_LEVEL = 0.95;

  // Correlation matrix for macro factors (GDP, Unemployment, Housing, Interest Rate)
  const correlationMatrix = [
    [1.0, -0.7, 0.6, -0.3],
    [-0.7, 1.0, -0.5, 0.2],
    [0.6, -0.5, 1.0, -0.4],
    [-0.3, 0.2, -0.4, 1.0]
  ];

  const runScenario = (scenario: 'moderate' | 'severe' | 'extreme') => {
    const means = [
      macroFactors[scenario].gdpChange,
      macroFactors[scenario].unemploymentChange,
      macroFactors[scenario].housePriceChange,
      macroFactors[scenario].interestRateChange
    ];

    const scenarios = generateCorrelatedRandoms(means, correlationMatrix, ITERATIONS);
    const riskWeights = scenarios.map(scenario => {
      const factors = {
        gdpChange: scenario[0],
        unemploymentChange: scenario[1],
        housePriceChange: scenario[2],
        interestRateChange: scenario[3]
      };
      return calculateRiskWeight(700, factors);
    });

    return {
      riskWeights,
      confidenceIntervals: calculateConfidenceInterval(riskWeights, CONFIDENCE_LEVEL)
    };
  };

  const results = {
    moderate: runScenario('moderate'),
    severe: runScenario('severe'),
    extreme: runScenario('extreme')
  };

  // Generate distribution data for visualization
  const generateDistributionData = (riskWeights: number[]) => {
    const bins = 20;
    const min = Math.min(...riskWeights);
    const max = Math.max(...riskWeights);
    const binSize = (max - min) / bins;
    const distribution = Array(bins).fill(0);

    riskWeights.forEach(rw => {
      const binIndex = Math.min(Math.floor((rw - min) / binSize), bins - 1);
      distribution[binIndex]++;
    });

    return distribution.map((count, i) => ({
      riskWeight: min + (i + 0.5) * binSize,
      frequency: count / ITERATIONS
    }));
  };

  const distributionData = {
    moderate: generateDistributionData(results.moderate.riskWeights),
    severe: generateDistributionData(results.severe.riskWeights),
    extreme: generateDistributionData(results.extreme.riskWeights)
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Monte Carlo Simulation Results
        </h3>
        <div className="grid grid-cols-3 gap-4 mb-6">
          {(['moderate', 'severe', 'extreme'] as const).map(scenario => (
            <div key={scenario} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white capitalize mb-2">
                {scenario} Scenario
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Lower Bound</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {results[scenario].confidenceIntervals.lower.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Median</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {results[scenario].confidenceIntervals.median.toFixed(1)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Upper Bound</span>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {results[scenario].confidenceIntervals.upper.toFixed(1)}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="riskWeight"
                label={{ value: 'Risk Weight (%)', position: 'bottom' }}
              />
              <YAxis 
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Line 
                data={distributionData.moderate}
                type="monotone" 
                dataKey="frequency" 
                name="Moderate"
                stroke="#F59E0B" 
                dot={false}
              />
              <Line 
                data={distributionData.severe}
                type="monotone" 
                dataKey="frequency" 
                name="Severe"
                stroke="#EF4444" 
                dot={false}
              />
              <Line 
                data={distributionData.extreme}
                type="monotone" 
                dataKey="frequency" 
                name="Extreme"
                stroke="#7C3AED" 
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Simulation Details
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>10,000 iterations per scenario</li>
              <li>95% confidence intervals</li>
              <li>Correlated macro factors based on historical relationships</li>
              <li>Results incorporate credit quality migration effects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}