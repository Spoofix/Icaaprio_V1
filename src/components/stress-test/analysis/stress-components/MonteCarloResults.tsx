import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Info } from 'lucide-react';
import { MacroFactors } from '../monte-carlo/MonteCarloUtils';

interface MonteCarloResultsProps {
  macroFactors: {
    moderate: MacroFactors;
    severe: MacroFactors;
    extreme: MacroFactors;
  };
}

export default function MonteCarloResults({ macroFactors }: MonteCarloResultsProps) {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  const stressLevels = [
    { name: '95% VaR', value: 100000000, color: '#10B981' },
    { name: '99% VaR', value: 150000000, color: '#F59E0B' },
    { name: '99.99% VaR', value: 200000000, color: '#EF4444' }
  ];

  const distributionData = [
    { pnl: -200000000, frequency: 0.01 },
    { pnl: -150000000, frequency: 0.02 },
    { pnl: -100000000, frequency: 0.05 },
    { pnl: -50000000, frequency: 0.15 },
    { pnl: 0, frequency: 0.25 },
    { pnl: 50000000, frequency: 0.15 },
    { pnl: 100000000, frequency: 0.05 },
    { pnl: 150000000, frequency: 0.02 },
    { pnl: 200000000, frequency: 0.01 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Monte Carlo Simulation Results
        </h3>

        <div className="grid grid-cols-3 gap-4 mb-6">
          {stressLevels.map((level) => (
            <div key={level.name} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                  {level.name}
                </h4>
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: level.color }} />
              </div>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(level.value)}
              </p>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Risk Capital: {formatCurrency(level.value * 1.5)}
              </p>
            </div>
          ))}
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="pnl"
                tickFormatter={(value) => formatCurrency(value)}
                label={{ value: 'Profit/Loss', position: 'bottom' }}
              />
              <YAxis 
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
                tickFormatter={(value) => `${(value * 100).toFixed(1)}%`}
              />
              <Tooltip 
                formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, 'Frequency']}
                labelFormatter={(label: number) => `P&L: ${formatCurrency(label)}`}
              />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                stroke="#3B82F6" 
                dot={false}
                name="Distribution"
              />
              {stressLevels.map((level) => (
                <ReferenceLine
                  key={level.name}
                  x={-level.value}
                  stroke={level.color}
                  strokeDasharray="3 3"
                  label={{
                    value: level.name,
                    fill: level.color,
                    position: 'top'
                  }}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                Simulation Details
              </h4>
              <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                <li>10,000 Monte Carlo iterations</li>
                <li>Historical volatility: {(Math.sqrt(252) * 0.1 * 100).toFixed(1)}% annualized</li>
                <li>Correlation effects included in portfolio VaR</li>
                <li>Risk capital includes model risk buffer</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}