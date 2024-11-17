import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Info } from 'lucide-react';

interface VaRDistributionChartProps {
  results: {
    distribution: {
      moderate: any[];
      severe: any[];
      extreme: any[];
    };
    stressLevels: {
      var95: number;
      var99: number;
      var9999: number;
    };
  };
  selectedStressLevel: 'moderate' | 'severe' | 'extreme';
}

export default function VaRDistributionChart({ results, selectedStressLevel }: VaRDistributionChartProps) {
  const formatCurrency = (value: number) => {
    return `$${(value / 1000000).toFixed(2)}M`;
  };

  const stressLevels = [
    { 
      name: 'Moderate (95%)', 
      value: results.stressLevels.var95, 
      color: '#10B981', 
      type: 'moderate',
      multiplier: 1.5
    },
    { 
      name: 'Severe (99%)', 
      value: results.stressLevels.var99, 
      color: '#F59E0B', 
      type: 'severe',
      multiplier: 2.0
    },
    { 
      name: 'Extreme (99.99%)', 
      value: results.stressLevels.var9999, 
      color: '#EF4444', 
      type: 'extreme',
      multiplier: 3.0
    }
  ];

  const selectedLevel = stressLevels.find(level => level.type === selectedStressLevel)!;

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              Value at Risk Analysis
            </h4>
            <div className="ml-2 text-sm text-gray-500 dark:text-gray-400">
              (10,000 Monte Carlo iterations)
            </div>
          </div>
        </div>

        <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-lg mb-6">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Selected Stress Level: {selectedLevel.name}
              </span>
            </div>
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: selectedLevel.color }} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Value at Risk</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(selectedLevel.value)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Risk Capital</p>
              <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                {formatCurrency(selectedLevel.value * selectedLevel.multiplier)}
              </p>
            </div>
          </div>
        </div>

        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart>
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
              <Legend />
              <Line
                data={results.distribution.moderate}
                type="monotone"
                dataKey="frequency"
                name="Moderate (95%)"
                stroke="#10B981"
                dot={false}
                strokeWidth={selectedStressLevel === 'moderate' ? 2 : 1}
              />
              <Line
                data={results.distribution.severe}
                type="monotone"
                dataKey="frequency"
                name="Severe (99%)"
                stroke="#F59E0B"
                dot={false}
                strokeWidth={selectedStressLevel === 'severe' ? 2 : 1}
              />
              <Line
                data={results.distribution.extreme}
                type="monotone"
                dataKey="frequency"
                name="Extreme (99.99%)"
                stroke="#EF4444"
                dot={false}
                strokeWidth={selectedStressLevel === 'extreme' ? 2 : 1}
              />
              {stressLevels.map((level) => (
                <ReferenceLine
                  key={level.name}
                  x={-level.value}
                  stroke={level.color}
                  strokeWidth={selectedStressLevel === level.type ? 2 : 1}
                  strokeDasharray={selectedStressLevel === level.type ? '0' : '3 3'}
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

        <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
            <div className="text-sm text-blue-700 dark:text-blue-300">
              <p className="font-medium">Distribution Analysis:</p>
              <ul className="mt-2 list-disc list-inside">
                <li>Vertical lines indicate VaR levels at different confidence intervals</li>
                <li>Curves show potential P&L distribution under each stress scenario</li>
                <li>Based on 10,000 Monte Carlo simulations with historical volatility</li>
                <li>Risk capital includes stress multiplier based on selected level</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}