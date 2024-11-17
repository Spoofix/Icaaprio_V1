import React, { useState } from 'react';
import { Upload, Download, Info } from 'lucide-react';

interface Position {
  type: string;
  value: number;
  beta?: number;
  duration?: number;
  delta?: number;
}

interface TradingBookUploadProps {
  onDataUpload: (positions: Position[]) => void;
}

export default function TradingBookUpload({ onDataUpload }: TradingBookUploadProps) {
  const [tradingData, setTradingData] = useState<File | null>(null);

  const downloadTemplate = () => {
    const headers = [
      'instrument_id',
      'position_type',
      'market_value',
      'trading_desk',
      'risk_factor',
      'delta',
      'gamma',
      'vega',
      'theta'
    ].join(',');

    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'trading_book_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setTradingData(file);

      // In a real application, we would parse the CSV here
      // For demo, we'll use sample data
      const samplePositions: Position[] = [
        { type: 'Equity', value: 1000000, beta: 1.2 },
        { type: 'Fixed Income', value: 2000000, duration: 5 },
        { type: 'FX', value: 800000, delta: 0.8 },
        { type: 'Commodity', value: 500000, beta: 0.9 }
      ];
      onDataUpload(samplePositions);
    }
  };

  return (
    <div className="space-y-4">
      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
        Trading Book Data
      </h4>

      <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Trading Positions & Sensitivities
            </h5>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Upload trading book positions with risk sensitivities
            </p>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={downloadTemplate}
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              <Download className="w-4 h-4 inline mr-1" />
              Template
            </button>
            <label className="flex items-center px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 cursor-pointer">
              <Upload className="w-4 h-4 mr-1" />
              Upload
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>
        {tradingData && (
          <p className="text-sm text-green-600 dark:text-green-400">
            Uploaded: {tradingData.name}
          </p>
        )}
      </div>
    </div>
  );
}