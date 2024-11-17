import React, { useState } from 'react';
import { AlertTriangle, Info, Plus } from 'lucide-react';

interface Indicator {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  base: number;
  moderate: number;
  severe: number;
  historical: number;
  historicalContext: string;
  isNegativeWorse?: boolean; // true if negative values represent worse conditions
}

interface AdditionalIndicator {
  id: string;
  name: string;
  importance: string;
  dataSource: string;
}

export default function MacroeconomicInputs() {
  const [showAdditionalIndicators, setShowAdditionalIndicators] = useState(false);
  const [indicators, setIndicators] = useState<Indicator[]>([
    {
      id: 'gdp',
      name: 'GDP Growth',
      description: 'Annual GDP growth rate',
      enabled: true,
      base: 2.5,
      moderate: -2.1,
      severe: -4.7,
      historical: -5.4,
      historicalContext: '2020 COVID-19 Crisis',
      isNegativeWorse: true
    },
    {
      id: 'unemployment',
      name: 'Unemployment Rate',
      description: 'National unemployment rate',
      enabled: true,
      base: 5.8,
      moderate: 8.3,
      severe: 10.5,
      historical: 13.7,
      historicalContext: '2020 COVID-19 Peak',
      isNegativeWorse: false
    },
    {
      id: 'housing',
      name: 'Housing Price Index',
      description: 'Year-over-year change in housing prices',
      enabled: true,
      base: 3.2,
      moderate: -12.5,
      severe: -25.0,
      historical: -28.3,
      historicalContext: '2008 Financial Crisis',
      isNegativeWorse: true
    },
    {
      id: 'boc_rate',
      name: 'Bank of Canada Interest Rate',
      description: 'Bank of Canada policy interest rate',
      enabled: true,
      base: 5.0,
      moderate: 6.5,
      severe: 8.0,
      historical: 16.0,
      historicalContext: '1981 Peak',
      isNegativeWorse: false
    },
    {
      id: 'oil',
      name: 'Oil Prices',
      description: 'Year-over-year change in oil prices',
      enabled: true,
      base: 5.0,
      moderate: -30.0,
      severe: -50.0,
      historical: -65.0,
      historicalContext: '2020 Market Crash',
      isNegativeWorse: true
    }
  ]);

  // Function to check if one scenario is worse than another
  const isWorse = (value1: number, value2: number, isNegativeWorse: boolean) => {
    return isNegativeWorse ? value1 < value2 : value1 > value2;
  };

  // Function to adjust stress scenarios based on changes
  const adjustStressScenarios = (
    indicatorId: string,
    field: 'base' | 'moderate' | 'severe',
    newValue: number
  ) => {
    setIndicators(prev => {
      return prev.map(indicator => {
        if (indicator.id !== indicatorId) return indicator;

        const isNegativeWorse = indicator.isNegativeWorse ?? true;
        let base = indicator.base;
        let moderate = indicator.moderate;
        let severe = indicator.severe;

        switch (field) {
          case 'base':
            base = newValue;
            // If base becomes worse than moderate, adjust moderate
            if (isWorse(base, moderate, isNegativeWorse)) {
              moderate = base;
            }
            // If moderate becomes worse than severe, adjust severe
            if (isWorse(moderate, severe, isNegativeWorse)) {
              severe = moderate;
            }
            break;
          case 'moderate':
            moderate = newValue;
            // If moderate becomes better than base, adjust base
            if (isWorse(base, moderate, isNegativeWorse)) {
              base = moderate;
            }
            // If moderate becomes worse than severe, adjust severe
            if (isWorse(moderate, severe, isNegativeWorse)) {
              severe = moderate;
            }
            break;
          case 'severe':
            severe = newValue;
            // If severe becomes better than moderate, adjust moderate
            if (isWorse(moderate, severe, isNegativeWorse)) {
              moderate = severe;
            }
            // If moderate becomes better than base, adjust base
            if (isWorse(base, moderate, isNegativeWorse)) {
              base = moderate;
            }
            break;
        }

        return {
          ...indicator,
          base,
          moderate,
          severe
        };
      });
    });
  };

  const handleValueChange = (
    indicatorId: string,
    field: 'base' | 'moderate' | 'severe',
    value: string
  ) => {
    const newValue = parseFloat(value);
    if (!isNaN(newValue)) {
      adjustStressScenarios(indicatorId, field, newValue);
    }
  };

  // Rest of the component remains the same until the table
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Scenario Analysis
        </h3>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Indicator
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Base
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Moderate
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Severe
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Historical Worst
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {indicators.map((indicator) => (
                <tr key={indicator.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-center">
                      <label className="relative inline-flex items-center mr-3">
                        <input
                          type="checkbox"
                          checked={indicator.enabled}
                          onChange={() => handleToggleIndicator(indicator.id)}
                          className="sr-only peer"
                        />
                        <div className="w-8 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {indicator.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {indicator.description}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="number"
                      value={indicator.base}
                      onChange={(e) => handleValueChange(indicator.id, 'base', e.target.value)}
                      step="0.1"
                      className="w-20 px-2 py-1 text-right border rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="number"
                      value={indicator.moderate}
                      onChange={(e) => handleValueChange(indicator.id, 'moderate', e.target.value)}
                      step="0.1"
                      className="w-20 px-2 py-1 text-right border rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 text-yellow-600 dark:text-yellow-400"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <input
                      type="number"
                      value={indicator.severe}
                      onChange={(e) => handleValueChange(indicator.id, 'severe', e.target.value)}
                      step="0.1"
                      className="w-20 px-2 py-1 text-right border rounded-md border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 text-red-600 dark:text-red-400"
                    />
                  </td>
                  <td className="px-4 py-4 text-right">
                    <div className="flex flex-col items-end">
                      <span className="text-sm text-purple-600 dark:text-purple-400">
                        {indicator.historical}%
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        {indicator.historicalContext}
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
              {/* Rest of the component remains the same */}
            </tbody>
          </table>
        </div>

        {/* Rest of the component remains exactly the same */}
      </div>
    </div>
  );
}