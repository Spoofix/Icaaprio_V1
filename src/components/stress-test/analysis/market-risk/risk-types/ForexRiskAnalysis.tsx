import React, { useState } from 'react';
import { Upload, Download, Play, AlertTriangle } from 'lucide-react';
import DataTable from '../components/DataTable';
import { runMonteCarloSimulation } from '../utils/monteCarloSimulation';
import StressLevelSelector from '../components/StressLevelSelector';
import VaRDistributionChart from '../components/VaRDistributionChart';

interface ForexData {
  currencyType: string;
  exposureAmount: number;
}

interface ForexRiskAnalysisProps {
  onResultsUpdate: (results: any) => void;
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
}

export default function ForexRiskAnalysis({ onResultsUpdate, macroFactors }: ForexRiskAnalysisProps) {
  const [forexData, setForexData] = useState<ForexData[]>([]);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResults, setSimulationResults] = useState<any>(null);
  const [selectedStressLevel, setSelectedStressLevel] = useState<'moderate' | 'severe' | 'extreme'>('severe');

  const downloadTemplate = () => {
    const headers = ['Currency Type', 'Exposure Amount'].join(',');
    const blob = new Blob([headers], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'forex_risk_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, parse CSV here
      const sampleData: ForexData[] = [
        { currencyType: 'USD', exposureAmount: 1000000 },
        { currencyType: 'EUR', exposureAmount: 500000 }
      ];
      setForexData(sampleData);
    }
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      const results = await runMonteCarloSimulation(forexData, macroFactors);
      setSimulationResults(results);
      onResultsUpdate(results);
    } finally {
      setIsSimulating(false);
    }
  };

  const handleStressLevelChange = (level: 'moderate' | 'severe' | 'extreme') => {
    setSelectedStressLevel(level);
  };

  const handleDelete = () => {
    setForexData([]);
    setSimulationResults(null);
  };

  const getRecommendation = () => {
    if (!simulationResults) return null;

    const totalExposure = forexData.reduce((sum, pos) => sum + Math.abs(pos.exposureAmount), 0);
    const maxLoss = Math.max(...Object.values(simulationResults.distribution).flatMap(
      (dist: any[]) => dist.map(d => Math.abs(d.pnl))
    ));
    const lossRatio = maxLoss / totalExposure;

    if (lossRatio > 0.15) return 'extreme';
    if (lossRatio > 0.10) return 'severe';
    return 'moderate';
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Forex Risk Analysis
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

      {forexData.length > 0 && (
        <>
          <DataTable
            data={forexData}
            columns={[
              { header: 'Currency Type', accessor: 'currencyType' },
              { header: 'Exposure Amount', accessor: 'exposureAmount' }
            ]}
            onDelete={handleDelete}
          />

          <div className="mt-6">
            <button
              onClick={handleRunSimulation}
              disabled={isSimulating}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Play className="w-4 h-4 mr-2" />
              {isSimulating ? 'Running Simulation...' : 'Run Monte Carlo Simulation'}
            </button>
          </div>
        </>
      )}

      {simulationResults && (
        <div className="mt-6 space-y-6">
          <StressLevelSelector
            selectedLevel={selectedStressLevel}
            onChange={handleStressLevelChange}
            recommendation={getRecommendation()}
            results={simulationResults}
          />

          <VaRDistributionChart
            results={simulationResults}
            selectedStressLevel={selectedStressLevel}
          />
        </div>
      )}
    </div>
  );
}