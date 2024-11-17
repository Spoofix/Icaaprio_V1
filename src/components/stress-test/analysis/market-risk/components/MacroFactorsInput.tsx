import React from 'react';
import { Info } from 'lucide-react';

interface MacroFactors {
  gdpChange: number;
  unemploymentChange: number;
  housePriceChange: number;
  interestRateChange: number;
}

interface MacroFactorsInputProps {
  macroFactors: MacroFactors;
  onChange: (factors: MacroFactors) => void;
}

export default function MacroFactorsInput({ macroFactors, onChange }: MacroFactorsInputProps) {
  const handleChange = (field: keyof MacroFactors, value: string) => {
    onChange({
      ...macroFactors,
      [field]: parseFloat(value) || 0
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          Macro Economic Factors
        </h4>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Enter percentage changes
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GDP Change (%)
          </label>
          <input
            type="number"
            value={macroFactors.gdpChange}
            onChange={(e) => handleChange('gdpChange', e.target.value)}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Unemployment Change (%)
          </label>
          <input
            type="number"
            value={macroFactors.unemploymentChange}
            onChange={(e) => handleChange('unemploymentChange', e.target.value)}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            House Price Change (%)
          </label>
          <input
            type="number"
            value={macroFactors.housePriceChange}
            onChange={(e) => handleChange('housePriceChange', e.target.value)}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Interest Rate Change (%)
          </label>
          <input
            type="number"
            value={macroFactors.interestRateChange}
            onChange={(e) => handleChange('interestRateChange', e.target.value)}
            step="0.1"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div className="text-sm text-blue-700 dark:text-blue-300">
            <p className="font-medium">Impact on Risk Calculation:</p>
            <ul className="mt-2 list-disc list-inside">
              <li>GDP decline increases market volatility</li>
              <li>Higher unemployment leads to increased risk</li>
              <li>Interest rate changes affect market dynamics</li>
              <li>House price changes indicate economic stress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}