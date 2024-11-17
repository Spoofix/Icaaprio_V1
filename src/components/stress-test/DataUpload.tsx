import React from 'react';
import RetailPortfolioUpload from './data-upload/RetailPortfolioUpload';
import BusinessPortfolioUpload from './data-upload/BusinessPortfolioUpload';
import HistoricalDelinquencyUpload from './data-upload/HistoricalDelinquencyUpload';
import { Info } from 'lucide-react';

export default function DataUpload() {
  const handleDataUpload = (data: any) => {
    console.log('Data uploaded:', data);
  };

  return (
    <div className="space-y-8">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Upload your portfolio data and historical information to begin the ICAAP assessment process.
              This data will be used for risk analysis and stress testing.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Retail Portfolio Data
          </h3>
          <RetailPortfolioUpload onDataUpload={handleDataUpload} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Business Portfolio Data
          </h3>
          <BusinessPortfolioUpload onDataUpload={handleDataUpload} />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Historical Performance Data
          </h3>
          <HistoricalDelinquencyUpload onDataUpload={handleDataUpload} />
        </div>
      </div>
    </div>
  );
}