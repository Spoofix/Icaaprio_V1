import React, { useState } from 'react';
import { Upload, Download, Info, Check } from 'lucide-react';

interface RetailPortfolioData {
  loan_id: string;
  product_type: string;
  credit_score: number;
  original_balance: number;
  current_balance: number;
  interest_rate: number;
  ltv_ratio?: number;
  property_value?: number;
  origination_date: string;
  postal_code: string;
}

interface RetailPortfolioUploadProps {
  onDataUpload: (data: RetailPortfolioData[]) => void;
}

export default function RetailPortfolioUpload({ onDataUpload }: RetailPortfolioUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const downloadTemplate = () => {
    const headers = [
      'loan_id',
      'product_type',
      'credit_score',
      'original_balance',
      'current_balance',
      'interest_rate',
      'ltv_ratio',
      'property_value',
      'origination_date',
      'postal_code'
    ].join(',');

    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'retail_portfolio_template.csv';
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
      const sampleData: RetailPortfolioData[] = [
        {
          loan_id: 'RL001',
          product_type: 'Mortgage',
          credit_score: 750,
          original_balance: 500000,
          current_balance: 475000,
          interest_rate: 3.5,
          ltv_ratio: 75,
          property_value: 650000,
          origination_date: '2022-01-15',
          postal_code: 'M5V2T6'
        }
      ];
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
              Required portfolio data format:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Loan-level data for all retail exposures</li>
              <li>Include mortgages, personal loans, and credit cards</li>
              <li>Property values required for secured loans</li>
              <li>Credit scores must be current (within last 90 days)</li>
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
            Upload Portfolio
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