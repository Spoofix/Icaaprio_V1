import React, { useState } from 'react';
import { Upload, Download, Info, Check } from 'lucide-react';

interface BusinessPortfolioData {
  loan_id: string;
  borrower_id: string;
  industry_code: string;
  product_type: string;
  risk_rating: string;
  original_balance: number;
  current_balance: number;
  interest_rate: number;
  ltv_ratio?: number;
  collateral_value?: number;
  collateral_type?: string;
  origination_date: string;
  postal_code: string;
}

interface BusinessPortfolioUploadProps {
  onDataUpload: (data: BusinessPortfolioData[]) => void;
}

export default function BusinessPortfolioUpload({ onDataUpload }: BusinessPortfolioUploadProps) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const downloadTemplate = () => {
    const headers = [
      'loan_id',
      'borrower_id',
      'industry_code',
      'product_type',
      'risk_rating',
      'original_balance',
      'current_balance',
      'interest_rate',
      'ltv_ratio',
      'collateral_value',
      'collateral_type',
      'origination_date',
      'postal_code'
    ].join(',');

    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'business_portfolio_template.csv';
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
      const sampleData: BusinessPortfolioData[] = [
        {
          loan_id: 'BL001',
          borrower_id: 'B001',
          industry_code: '31-33',
          product_type: 'Term Loan',
          risk_rating: 'BBB',
          original_balance: 1000000,
          current_balance: 950000,
          interest_rate: 4.5,
          ltv_ratio: 65,
          collateral_value: 1500000,
          collateral_type: 'Commercial Property',
          origination_date: '2022-03-15',
          postal_code: 'M5J2T3'
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
              <li>Loan-level data for all business exposures</li>
              <li>Use standard industry codes (NAICS)</li>
              <li>Internal risk ratings must be current</li>
              <li>Include all collateral information for secured loans</li>
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