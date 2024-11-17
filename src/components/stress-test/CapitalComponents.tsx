import React from 'react';
import { Shield } from 'lucide-react';

const capitalComponents = [
  {
    name: 'Common Equity Tier 1 (CET1)',
    description: 'Highest quality regulatory capital',
    included: true,
  },
  {
    name: 'Additional Tier 1 Capital',
    description: 'Perpetual subordinated instruments',
    included: true,
  },
  {
    name: 'Tier 2 Capital',
    description: 'Subordinated debt and general provisions',
    included: true,
  },
  {
    name: 'Capital Conservation Buffer',
    description: 'Additional buffer above minimum requirements',
    included: true,
  },
  {
    name: 'Countercyclical Buffer',
    description: 'Variable buffer based on credit conditions',
    included: false,
  },
];

export default function CapitalComponents() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex">
          <Shield className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Select capital components to include in the stress test calculation.
            Adjustments will be applied according to OSFI guidelines.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {capitalComponents.map((component) => (
          <div key={component.name} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
            <div className="flex-1">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                {component.name}
              </h4>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {component.description}
              </p>
            </div>
            <div className="ml-4">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={component.included}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}