import React from 'react';
import { Download, Upload, Info } from 'lucide-react';

interface FXDataTemplate {
  portfolio: {
    position_id: string;
    currency_pair: string;
    notional_amount: number;
    position_type: 'long' | 'short';
    delta: number;
    maturity_date: string;
    hedge_ratio?: number;
  }[];
  marketData: {
    date: string;
    spot_rate: number;
    volatility: number;
    us_rate: number;
    ca_rate: number;
  }[];
}

const templateFields = {
  portfolio: [
    { name: 'position_id', description: 'Unique identifier for position' },
    { name: 'currency_pair', description: 'e.g., USD/CAD' },
    { name: 'notional_amount', description: 'Position size in base currency' },
    { name: 'position_type', description: 'Long or Short' },
    { name: 'delta', description: 'FX delta sensitivity' },
    { name: 'maturity_date', description: 'YYYY-MM-DD format' },
    { name: 'hedge_ratio', description: 'Optional: Hedge coverage ratio' }
  ],
  marketData: [
    { name: 'date', description: 'YYYY-MM-DD format' },
    { name: 'spot_rate', description: 'USD/CAD exchange rate' },
    { name: 'volatility', description: 'Historical/Implied volatility' },
    { name: 'us_rate', description: 'US interest rate' },
    { name: 'ca_rate', description: 'Canadian interest rate' }
  ]
};

export default function FXRiskTemplate() {
  const downloadTemplate = (type: 'portfolio' | 'marketData') => {
    const headers = templateFields[type].map(field => field.name).join(',');
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fx_${type}_template.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Required data for FX risk Monte Carlo simulation:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Portfolio positions and sensitivities</li>
              <li>Historical market data (minimum 1 year)</li>
              <li>Current market rates and volatilities</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Portfolio Data Template */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Portfolio Data Template
          </h3>
          <div className="space-y-4">
            {templateFields.portfolio.map(field => (
              <div key={field.name} className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.name}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {field.description}
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={() => downloadTemplate('portfolio')}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </button>
          </div>
        </div>

        {/* Market Data Template */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Market Data Template
          </h3>
          <div className="space-y-4">
            {templateFields.marketData.map(field => (
              <div key={field.name} className="flex justify-between items-center">
                <div>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {field.name}
                  </span>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {field.description}
                  </p>
                </div>
              </div>
            ))}
            <button
              onClick={() => downloadTemplate('marketData')}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}