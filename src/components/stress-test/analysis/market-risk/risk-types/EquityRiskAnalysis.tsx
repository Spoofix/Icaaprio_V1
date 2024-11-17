import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import DataTable from '../components/DataTable';

interface EquityData {
  date: string;
  equityName: string;
  price: number;
  exposureAmount: number;
}

interface EquityRiskAnalysisProps {
  onResultsUpdate: (results: any) => void;
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
}

export default function EquityRiskAnalysis({ onResultsUpdate, macroFactors }: EquityRiskAnalysisProps) {
  const [equityData, setEquityData] = useState<EquityData[]>([]);

  const downloadTemplate = () => {
    const headers = ['Date', 'Equity Name', 'Price', 'Exposure Amount'].join(',');
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'equity_risk_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, parse CSV here
      const sampleData: EquityData[] = [
        { date: '2024-03-01', equityName: 'AAPL', price: 150.25, exposureAmount: 1000000 },
        { date: '2024-03-01', equityName: 'MSFT', price: 280.50, exposureAmount: 750000 }
      ];
      setEquityData(sampleData);
      calculateVaR(sampleData);
    }
  };

  const calculateVaR = (data: EquityData[]) => {
    // Implement VaR calculation here
    const results = {
      var95: 100000,
      var99: 150000,
      sensitivity: 0.85
    };
    onResultsUpdate(results);
  };

  const handleDelete = () => {
    setEquityData([]);
    onResultsUpdate(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Equity Risk Analysis
        </h3>
        <div className="flex space-x-4">
          <button
            onClick={downloadTemplate}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Template
          </button>
          <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
            <Upload className="w-4 h-4 mr-2" />
            Upload Data
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {equityData.length > 0 && (
        <DataTable
          data={equityData}
          columns={[
            { header: 'Date', accessor: 'date' },
            { header: 'Equity Name', accessor: 'equityName' },
            { header: 'Price', accessor: 'price' },
            { header: 'Exposure Amount', accessor: 'exposureAmount' }
          ]}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}