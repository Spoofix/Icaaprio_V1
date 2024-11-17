import React, { useState } from 'react';
import { Upload, Download, Info, Check } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import UploadHistory, { UploadRecord } from './UploadHistory';

interface DelinquencyData {
  reporting_date: string;
  portfolio_type: 'retail' | 'business' | 'cre';
  product_type: string;
  total_balance: number;
  delinquent_30_59: number;
  delinquent_60_89: number;
  delinquent_90_plus: number;
  write_offs: number;
  recoveries: number;
  unemployment_rate: number;
  gdp_growth: number;
  house_price_index: number;
}

interface HistoricalDelinquencyUploadProps {
  onDataUpload: (data: DelinquencyData[]) => void;
}

export default function HistoricalDelinquencyUpload({ onDataUpload }: HistoricalDelinquencyUploadProps) {
  const { user } = useAuth();
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadHistory, setUploadHistory] = useState<UploadRecord[]>([]);

  const downloadTemplate = () => {
    const headers = [
      'reporting_date',
      'portfolio_type',
      'product_type',
      'total_balance',
      'delinquent_30_59',
      'delinquent_60_89',
      'delinquent_90_plus',
      'write_offs',
      'recoveries',
      'unemployment_rate',
      'gdp_growth',
      'house_price_index'
    ].join(',');

    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'historical_delinquency_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real app, parse CSV here
      // For demo, using sample data
      const sampleData: DelinquencyData[] = [
        {
          reporting_date: '2023-12-31',
          portfolio_type: 'retail',
          product_type: 'Mortgage',
          total_balance: 1000000000,
          delinquent_30_59: 5000000,
          delinquent_60_89: 3000000,
          delinquent_90_plus: 2000000,
          write_offs: 1000000,
          recoveries: 200000,
          unemployment_rate: 5.8,
          gdp_growth: 2.1,
          house_price_index: 185.5
        }
      ];

      // Add to upload history
      const newUpload: UploadRecord = {
        fileName: file.name,
        uploadedAt: new Date().toISOString(),
        uploadedBy: `${user?.firstName} ${user?.lastName}`,
        recordCount: sampleData.length
      };

      setUploadHistory(prev => [newUpload, ...prev]);
      onDataUpload(sampleData);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Historical delinquency data requirements:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Monthly data for the past 10 years</li>
              <li>Separate data by portfolio and product type</li>
              <li>Include corresponding macro indicators</li>
              <li>All amounts in base currency units</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex-1">
          {uploadedFile && (
            <div className="flex items-center text-sm text-green-600 dark:text-green-400">
              <Check className="w-4 h-4 mr-2" />
              Uploaded: {uploadedFile.name}
            </div>
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
            Upload History
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      <UploadHistory records={uploadHistory} />
    </div>
  );
}