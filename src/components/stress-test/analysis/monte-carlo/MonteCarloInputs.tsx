import React from 'react';
import { Info } from 'lucide-react';

interface MonteCarloInputsProps {
  inputs: {
    iterations: number;
    confidenceLevel: number;
    horizonMonths: number;
    macroFactors: {
      gdpChange: number;
      unemploymentChange: number;
      housePriceChange: number;
      interestRateChange: number;
    };
  };
  onChange: (inputs: any) => void;
}

export default function MonteCarloInputs({ inputs, onChange }: MonteCarloInputsProps) {
  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      onChange({
        ...inputs,
        [parent]: {
          ...inputs[parent as keyof typeof inputs],
          [child]: parseFloat(value)
        }
      });
    } else {
      onChange({
        ...inputs,
        [field]: field === 'confidenceLevel' ? parseFloat(value) : parseInt(value)
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Number of Iterations
          </label>
          <input
            type="number"
            value={inputs.iterations}
            onChange={(e) => handleInputChange('iterations', e.target.value)}
            min="1000"
            max="100000"
            step="1000"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Confidence Level
          </label>
          <select
            value={inputs.confidenceLevel}
            onChange={(e) => handleInputChange('confidenceLevel', e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          >
            <option value="0.95">95%</option>
            <option value="0.99">99%</option>
            <option value="0.999">99.9%</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Time Horizon (Months)
          </label>
          <input
            type="number"
            value={inputs.horizonMonths}
            onChange={(e) => handleInputChange('horizonMonths', e.target.value)}
            min="1"
            max="60"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          />
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
          Macro Economic Factors
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              GDP Change (%)
            </label>
            <input
              type="number"
              value={inputs.macroFactors.gdpChange}
              onChange={(e) => handleInputChange('macroFactors.gdpChange', e.target.value)}
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
              value={inputs.macroFactors.unemploymentChange}
              onChange={(e) => handleInputChange('macroFactors.unemploymentChange', e.target.value)}
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
              value={inputs.macroFactors.housePriceChange}
              onChange={(e) => handleInputChange('macroFactors.housePriceChange', e.target.value)}
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
              value={inputs.macroFactors.interestRateChange}
              onChange={(e) => handleInputChange('macroFactors.interestRateChange', e.target.value)}
              step="0.1"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Monte Carlo Simulation Parameters:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Higher iterations provide more accurate results but take longer</li>
              <li>Confidence level determines the risk measure threshold</li>
              <li>Time horizon affects the projection period for losses</li>
              <li>Macro factors influence default probabilities and loss severity</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}