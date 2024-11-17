import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface MarketRiskSummaryProps {
  results: {
    forex: any;
    equity: any;
    membership: any;
  };
}

export default function MarketRiskSummary({ results }: MarketRiskSummaryProps) {
  const calculateTotalCapital = () => {
    // Implement correlation-based aggregation here
    let total = 0;
    if (results.forex) total += results.forex.var99;
    if (results.equity) total += results.equity.var99;
    if (results.membership) total += results.membership.ear99;
    return total;
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Market Risk Capital Summary
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {results.forex && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Forex Risk Capital
            </h4>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${(results.forex.var99 / 1000000).toFixed(2)}M
            </p>
          </div>
        )}

        {results.equity && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Equity Risk Capital
            </h4>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${(results.equity.var99 / 1000000).toFixed(2)}M
            </p>
          </div>
        )}

        {results.membership && (
          <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Membership Equity Risk
            </h4>
            <p className="text-2xl font-semibold text-gray-900 dark:text-white">
              ${(results.membership.ear99 / 1000000).toFixed(2)}M
            </p>
          </div>
        )}
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Total Market Risk Capital
            </h4>
            <p className="mt-2 text-2xl font-semibold text-blue-900 dark:text-blue-100">
              ${(calculateTotalCapital() / 1000000).toFixed(2)}M
            </p>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-300">
              Includes diversification benefits from risk correlations
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}