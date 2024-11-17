import React, { useState, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Play, AlertTriangle, Info, Activity } from 'lucide-react';
import { generateCorrelatedRandoms, calculateConfidenceInterval, calculateRiskWeight } from './MonteCarloUtils';

interface SimulationConfig {
  iterations: number;
  confidenceLevel: number;
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
}

interface SimulationResult {
  riskWeights: number[];
  confidenceIntervals: {
    lower: number;
    median: number;
    upper: number;
  };
  distributionData: Array<{
    riskWeight: number;
    frequency: number;
  }>;
  timeSeriesData: Array<{
    iteration: number;
    riskWeight: number;
    confidenceLower: number;
    confidenceUpper: number;
  }>;
}

export default function MonteCarloEngine() {
  const [isRunning, setIsRunning] = useState(false);
  const [config, setConfig] = useState<SimulationConfig>({
    iterations: 10000,
    confidenceLevel: 0.95,
    macroFactors: {
      gdpChange: -2.5,
      unemploymentChange: 3.2,
      housePriceChange: -15.0,
      interestRateChange: 2.0
    }
  });
  const [results, setResults] = useState<SimulationResult | null>(null);

  const runSimulation = useCallback(() => {
    setIsRunning(true);

    // Correlation matrix for macro factors (GDP, Unemployment, Housing, Interest Rate)
    const correlationMatrix = [
      [1.0, -0.7, 0.6, -0.3],
      [-0.7, 1.0, -0.5, 0.2],
      [0.6, -0.5, 1.0, -0.4],
      [-0.3, 0.2, -0.4, 1.0]
    ];

    const means = [
      config.macroFactors.gdpChange,
      config.macroFactors.unemploymentChange,
      config.macroFactors.housePriceChange,
      config.macroFactors.interestRateChange
    ];

    // Generate correlated random scenarios
    const scenarios = generateCorrelatedRandoms(means, correlationMatrix, config.iterations);

    // Calculate risk weights for each scenario
    const riskWeights = scenarios.map(scenario => {
      const macroFactors = {
        gdpChange: scenario[0],
        unemploymentChange: scenario[1],
        housePriceChange: scenario[2],
        interestRateChange: scenario[3]
      };
      return calculateRiskWeight(700, macroFactors); // Using 700 as example credit score
    });

    // Calculate confidence intervals
    const confidenceIntervals = calculateConfidenceInterval(riskWeights, config.confidenceLevel);

    // Generate distribution data
    const bins = 20;
    const min = Math.min(...riskWeights);
    const max = Math.max(...riskWeights);
    const binSize = (max - min) / bins;
    const distribution = Array(bins).fill(0);

    riskWeights.forEach(rw => {
      const binIndex = Math.min(Math.floor((rw - min) / binSize), bins - 1);
      distribution[binIndex]++;
    });

    const distributionData = distribution.map((count, i) => ({
      riskWeight: min + (i + 0.5) * binSize,
      frequency: count / config.iterations
    }));

    // Generate time series data
    const timeSeriesData = riskWeights.map((rw, i) => ({
      iteration: i,
      riskWeight: rw,
      confidenceLower: confidenceIntervals.lower,
      confidenceUpper: confidenceIntervals.upper
    }));

    setResults({
      riskWeights,
      confidenceIntervals,
      distributionData,
      timeSeriesData
    });

    setIsRunning(false);
  }, [config]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Monte Carlo simulation using correlated macro factors from stress scenarios.
              Confidence intervals calculated at {config.confidenceLevel * 100}% level.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
            Simulation Configuration
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Number of Iterations
              </label>
              <input
                type="number"
                value={config.iterations}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  iterations: parseInt(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confidence Level
              </label>
              <select
                value={config.confidenceLevel}
                onChange={(e) => setConfig(prev => ({
                  ...prev,
                  confidenceLevel: parseFloat(e.target.value)
                }))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              >
                <option value="0.90">90%</option>
                <option value="0.95">95%</option>
                <option value="0.99">99%</option>
              </select>
            </div>
            <button
              onClick={runSimulation}
              disabled={isRunning}
              className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              {isRunning ? 'Running Simulation...' : 'Run Simulation'}
            </button>
          </div>
        </div>

        {results && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Simulation Results
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Lower Bound</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {results.confidenceIntervals.lower.toFixed(2)}%
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Median</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {results.confidenceIntervals.median.toFixed(2)}%
                  </div>
                </div>
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-center">
                  <div className="text-sm text-gray-500 dark:text-gray-400">Upper Bound</div>
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {results.confidenceIntervals.upper.toFixed(2)}%
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {results && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Risk Weight Distribution
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.distributionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="riskWeight" 
                    label={{ value: 'Risk Weight (%)', position: 'bottom' }}
                  />
                  <YAxis 
                    label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="frequency" 
                    stroke="#3B82F6" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
              Simulation Path
            </h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={results.timeSeriesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis 
                    dataKey="iteration"
                    label={{ value: 'Iteration', position: 'bottom' }}
                  />
                  <YAxis 
                    label={{ value: 'Risk Weight (%)', angle: -90, position: 'insideLeft' }}
                  />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="riskWeight" 
                    stroke="#3B82F6" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidenceLower" 
                    stroke="#EF4444" 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="confidenceUpper" 
                    stroke="#EF4444" 
                    strokeDasharray="5 5" 
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Important Considerations
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>Correlation structure between macro factors based on historical data</li>
              <li>Risk weight calculation includes credit quality migration effects</li>
              <li>Confidence intervals provide range of potential outcomes</li>
              <li>Results should be validated against historical stress events</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}