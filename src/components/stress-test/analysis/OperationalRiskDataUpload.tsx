import React, { useState } from 'react';
import { Upload, Download, AlertTriangle, Info, FileSpreadsheet, CheckCircle2 } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface IncomeData {
  year: string;
  netInterestIncome: number;
  nonInterestIncome: number;
  operatingExpenses: number;
}

const sampleData: IncomeData[] = [
  {
    year: '2021',
    netInterestIncome: 500000000,
    nonInterestIncome: 350000000,
    operatingExpenses: 400000000
  },
  {
    year: '2022',
    netInterestIncome: 550000000,
    nonInterestIncome: 370000000,
    operatingExpenses: 420000000
  },
  {
    year: '2023',
    netInterestIncome: 580000000,
    nonInterestIncome: 400000000,
    operatingExpenses: 450000000
  }
];

export default function OperationalRiskDataUpload({ onDataUpload }: { onDataUpload: (data: any) => void }) {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showGuide, setShowGuide] = useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      // In a real application, you would parse the CSV here
      // For demo, we'll use the sample data
      onDataUpload(sampleData);
    }
  };

  const downloadTemplate = () => {
    const headers = ['Year', 'Net Interest Income', 'Non-Interest Income', 'Operating Expenses'];
    const csvContent = [
      headers.join(','),
      '2021,500000000,350000000,400000000',
      '2022,550000000,370000000,420000000',
      '2023,580000000,400000000,450000000'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'operational_risk_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Income Data Upload
          </h3>
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            {showGuide ? 'Hide Guide' : 'Show Guide'}
          </button>
        </div>

        {showGuide && (
          <div className="mb-6 space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
                <div>
                  <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">
                    How to Prepare Your Data
                  </p>
                  <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 list-disc list-inside">
                    <li>Download the template CSV file</li>
                    <li>Fill in the last 3 years of income data</li>
                    <li>Ensure all values are in base units (not thousands or millions)</li>
                    <li>Include both positive and negative years if applicable</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                Required Income Components:
              </p>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <div>
                    <span className="font-medium">Net Interest Income:</span>
                    <p className="text-gray-500 dark:text-gray-400">
                      Interest income minus interest expenses
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <div>
                    <span className="font-medium">Non-Interest Income:</span>
                    <p className="text-gray-500 dark:text-gray-400">
                      Fees, commissions, trading income, and other operating income
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="w-4 h-4 text-green-500 mt-1 mr-2" />
                  <div>
                    <span className="font-medium">Operating Expenses:</span>
                    <p className="text-gray-500 dark:text-gray-400">
                      Staff costs, administrative expenses, and other operating costs
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={downloadTemplate}
              className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </button>
            <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
              <Upload className="w-4 h-4 mr-2" />
              <span className="text-sm font-medium">Upload CSV</span>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          {uploadedFile && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">{uploadedFile.name}</span>
            </div>
          )}
        </div>

        {uploadedFile && (
          <div className="mt-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
              Preview of Uploaded Data
            </h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Year
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Net Interest Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Non-Interest Income
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Operating Expenses
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Gross Income
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {sampleData.map((row) => {
                    const grossIncome = row.netInterestIncome + row.nonInterestIncome;
                    return (
                      <tr key={row.year}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {row.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(row.netInterestIncome)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(row.nonInterestIncome)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(row.operatingExpenses)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                          {formatCurrency(grossIncome)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              Important Notes:
            </p>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>Ensure data accuracy and completeness</li>
              <li>Include all relevant income components</li>
              <li>Use audited financial statements as source</li>
              <li>Report values in base currency units</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}