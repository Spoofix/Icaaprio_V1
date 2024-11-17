import React, { useState, useEffect } from 'react';
import { Play, Upload, Info } from 'lucide-react';
import MonteCarloResults from '../stress-components/MonteCarloResults';
import DelinquencyAnalysis from '../credit-quality/DelinquencyAnalysis';
import DistributionChart from '../stress-components/DistributionChart';
import MonteCarloInputs from '../monte-carlo/MonteCarloInputs';

interface RetailStressAnalysisProps {
  selectedStressLevel: string;
  onAnalysisComplete: (recommendedStress: string) => void;
}

interface DelinquencyData {
  date: string;
  scoreRange: string;
  delinquency30: number;
  delinquency90: number;
  default: number;
  balance: number;
}

const dataSources = {
  creditScore: {
    name: 'TransUnion Credit Bureau Data',
    url: 'https://www.transunion.ca/lenders/mortgage-delinquency'
  },
  ltv: {
    name: 'OSFI Residential Mortgage Data',
    url: 'https://www.osfi-bsif.gc.ca/Eng/fi-if/rtn/Pages/default.aspx'
  }
};

const actualPortfolioData = {
  creditScoreDistribution: [
    { score: '800+', actual: 25, benchmark: 20, moderate: 15, severe: 10, extreme: 5 },
    { score: '750-799', actual: 30, benchmark: 25, moderate: 20, severe: 15, extreme: 10 },
    { score: '700-749', actual: 25, benchmark: 30, moderate: 35, severe: 40, extreme: 45 },
    { score: '650-699', actual: 15, benchmark: 20, moderate: 25, severe: 30, extreme: 35 },
    { score: '<650', actual: 5, benchmark: 5, moderate: 5, severe: 5, extreme: 5 }
  ],
  ltvDistribution: [
    { range: '<50%', actual: 20, benchmark: 15, moderate: 10, severe: 5, extreme: 3 },
    { range: '50-60%', actual: 25, benchmark: 20, moderate: 15, severe: 10, extreme: 7 },
    { range: '60-70%', actual: 30, benchmark: 35, moderate: 40, severe: 45, extreme: 50 },
    { range: '70-80%', actual: 20, benchmark: 25, moderate: 30, severe: 35, extreme: 35 },
    { range: '>80%', actual: 5, benchmark: 5, moderate: 5, severe: 5, extreme: 5 }
  ],
  totalExposure: 10000000000,
  totalAccounts: 50000
};

export default function RetailStressAnalysis({ selectedStressLevel, onAnalysisComplete }: RetailStressAnalysisProps) {
  const [isSimulating, setIsSimulating] = useState(false);
  const [delinquencyData, setDelinquencyData] = useState<DelinquencyData[]>([]);
  const [mcInputs, setMcInputs] = useState({
    iterations: 10000,
    confidenceLevel: 0.99,
    horizonMonths: 12,
    macroFactors: {
      gdpChange: -2.1,
      unemploymentChange: 2.5,
      housePriceChange: -12.5,
      interestRateChange: 2.0
    }
  });

  const recommendedScenarios = {
    conservative: {
      iterations: 5000,
      confidenceLevel: 0.95,
      horizonMonths: 12,
      macroFactors: {
        gdpChange: -2.1,
        unemploymentChange: 2.5,
        housePriceChange: -12.5,
        interestRateChange: 2.0
      }
    },
    balanced: {
      iterations: 10000,
      confidenceLevel: 0.99,
      horizonMonths: 12,
      macroFactors: {
        gdpChange: -4.7,
        unemploymentChange: 4.8,
        housePriceChange: -25.0,
        interestRateChange: 3.5
      }
    },
    aggressive: {
      iterations: 20000,
      confidenceLevel: 0.999,
      horizonMonths: 24,
      macroFactors: {
        gdpChange: -7.2,
        unemploymentChange: 7.2,
        housePriceChange: -35.0,
        interestRateChange: 5.0
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const csvData = e.target?.result as string;
          const parsedData = parseCSV(csvData);
          setDelinquencyData(parsedData);
        } catch (error) {
          console.error('Error parsing delinquency data:', error);
        }
      };
      reader.readAsText(file);
    }
  };

  const parseCSV = (csvData: string): DelinquencyData[] => {
    // Basic CSV parsing - in production use a proper CSV parser
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    return lines.slice(1).map(line => {
      const values = line.split(',');
      return {
        date: values[0],
        scoreRange: values[1],
        delinquency30: parseFloat(values[2]),
        delinquency90: parseFloat(values[3]),
        default: parseFloat(values[4]),
        balance: parseFloat(values[5])
      };
    });
  };

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    try {
      // Run Monte Carlo simulation using delinquencyData and mcInputs
      // This would be your actual MC simulation logic
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated delay
    } finally {
      setIsSimulating(false);
    }
  };

  const handleScenarioSelect = (scenario: keyof typeof recommendedScenarios) => {
    setMcInputs(recommendedScenarios[scenario]);
  };

  useEffect(() => {
    const recommendedStress = 'moderate';
    onAnalysisComplete(recommendedStress);
  }, [selectedStressLevel, onAnalysisComplete]);

  return (
    <div className="space-y-6">
      {/* File Upload Section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Delinquency Data Upload
          </h3>
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
        {delinquencyData.length > 0 && (
          <p className="text-sm text-green-600 dark:text-green-400">
            {delinquencyData.length} records loaded
          </p>
        )}
      </div>

      {/* Distribution Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DistributionChart
          data={actualPortfolioData.creditScoreDistribution}
          xKey="score"
          title="Credit Quality Distribution"
          description="Distribution of credit scores with stress scenarios"
          dataSource={dataSources.creditScore}
        />
        <DistributionChart
          data={actualPortfolioData.ltvDistribution}
          xKey="range"
          title="LTV Distribution"
          description="Distribution of loan-to-value ratios with stress scenarios"
          dataSource={dataSources.ltv}
        />
      </div>

      {/* Delinquency Analysis */}
      {delinquencyData.length > 0 && (
        <DelinquencyAnalysis data={delinquencyData} />
      )}

      {/* Monte Carlo Simulation Inputs */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Monte Carlo Simulation Settings
          </h3>
          <div className="flex space-x-2">
            {Object.entries(recommendedScenarios).map(([key, scenario]) => (
              <button
                key={key}
                onClick={() => handleScenarioSelect(key as keyof typeof recommendedScenarios)}
                className="px-3 py-1 text-sm rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300"
              >
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </button>
            ))}
          </div>
        </div>
        
        <MonteCarloInputs
          inputs={mcInputs}
          onChange={setMcInputs}
        />

        <div className="mt-6 flex justify-end">
          <button
            onClick={handleRunSimulation}
            disabled={isSimulating || delinquencyData.length === 0}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            <Play className="w-4 h-4 mr-2" />
            {isSimulating ? 'Running Simulation...' : 'Run Monte Carlo Simulation'}
          </button>
        </div>
      </div>

      {/* Monte Carlo Results */}
      <MonteCarloResults 
        macroFactors={mcInputs.macroFactors}
      />
    </div>
  );
}