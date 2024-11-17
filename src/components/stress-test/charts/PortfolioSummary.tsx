import React from 'react';
import { AlertCircle } from 'lucide-react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

interface PortfolioSummaryProps {
  portfolioType: 'business' | 'retail';
  totalValue: number;
  productData: Array<{ name: string; value: number }>;
}

export function PortfolioSummary({
  portfolioType,
  totalValue,
  productData
}: PortfolioSummaryProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <AlertCircle className="w-5 h-5 mr-2" />
        Portfolio Summary
      </h3>
      <div className="space-y-6">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">Total Exposure</p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatCurrency(totalValue)}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {portfolioType === 'business' ? 'Average Rating' : 'Average Credit Score'}
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {portfolioType === 'business' ? 'BBB+' : '725'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Largest {portfolioType === 'business' ? 'Industry' : 'Product'} Concentration
          </p>
          <p className="text-2xl font-semibold text-gray-900 dark:text-white">
            {formatPercentage(
              Math.max(...productData.map(p => p.value)),
              totalValue
            )}
          </p>
        </div>
      </div>
    </div>
  );
}