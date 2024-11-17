import React, { useState } from 'react';
import { Upload, Download } from 'lucide-react';
import DataTable from '../components/DataTable';

interface MembershipData {
  equityValue: number;
  projectedEarnings: number;
  scenarioDescription: string;
}

interface MembershipEquityAnalysisProps {
  onResultsUpdate: (results: any) => void;
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
}

export default function MembershipEquityAnalysis({ onResultsUpdate, macroFactors }: MembershipEquityAnalysisProps) {
  const [membershipData, setMembershipData] = useState<MembershipData[]>([]);

  const downloadTemplate = () => {
    const headers = ['Membership Equity Value', 'Projected Earnings', 'Scenario Description'].join(',');
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'membership_equity_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, parse CSV here
      const sampleData: MembershipData[] = [
        {
          equityValue: 5000000,
          projectedEarnings: 250000,
          scenarioDescription: 'Base Case'
        },
        {
          equityValue: 4500000,
          projectedEarnings: 200000,
          scenarioDescription: 'Stress Scenario'
        }
      ];
      setMembershipData(sampleData);
      calculateEaR(sampleData);
    }
  };

  const calculateEaR = (data: MembershipData[]) => {
    // Implement EaR calculation here
    const results = {
      ear95: 50000,
      ear99: 75000,
      scenarioImpacts: {
        base: 0,
        stress: -500000
      }
    };
    onResultsUpdate(results);
  };

  const handleDelete = () => {
    setMembershipData([]);
    onResultsUpdate(null);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Membership Equity Analysis
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

      {membershipData.length > 0 && (
        <DataTable
          data={membershipData}
          columns={[
            { header: 'Equity Value', accessor: 'equityValue' },
            { header: 'Projected Earnings', accessor: 'projectedEarnings' },
            { header: 'Scenario', accessor: 'scenarioDescription' }
          ]}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}