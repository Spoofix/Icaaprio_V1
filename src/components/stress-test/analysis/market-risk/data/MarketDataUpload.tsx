import React, { useState } from 'react';
import { Upload, Download, Info } from 'lucide-react';

interface MarketDataUploadProps {
  onDataUpload: (file: File) => void;
}

export default function MarketDataUpload({ onDataUpload }: MarketDataUploadProps) {
  const [historicalData, setHistoricalData] = useState<File | null>(null);

  const downloadTemplate = () => {
    const headers = ['date', 'equity_return', 'rate_change', 'fx_return', 'commodity_return'].join(',');
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historical_returns_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setHistoricalData(file);
      onDataUpload(file);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
        Market Data Requirements
      </h4>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Required data format:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Daily returns for all risk factors (minimum 1 year)</li>
              <li>Clean, validated data without missing values</li>
              <li>Consistent time series across all risk factors</li>
              <li>Up-to-date market data for accurate results</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          {historicalData && (
            <p className="text-sm text-green-600 dark:text-green-400">
              Uploaded: {historicalData.name}
            </p>
          )}
        </div>
        <div className="flex space-x-4">
          <button
            onClick={downloadTemplate}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Template
          </button>
          <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            <span className="text-sm">Upload Historical Data</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}