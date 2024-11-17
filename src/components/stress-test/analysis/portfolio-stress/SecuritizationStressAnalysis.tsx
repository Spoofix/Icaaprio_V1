import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';
import RiskWeightSensitivityGrid from '../stress-components/RiskWeightSensitivityGrid';
import PortfolioDistributionGrid from '../stress-components/PortfolioDistributionGrid';
import MonteCarloResults from '../stress-components/MonteCarloResults';
import SecuritizationAnalysis from '../SecuritizationAnalysis';

interface SecuritizationStressAnalysisProps {
  selectedStressLevel: string;
  onAnalysisComplete: (recommendedStress: string) => void;
}

export default function SecuritizationStressAnalysis({ selectedStressLevel, onAnalysisComplete }: SecuritizationStressAnalysisProps) {
  const [distributionData, setDistributionData] = useState([
    { tranche: 'Senior AAA', baseline: 0.2, moderate: 0.4, severe: 0.8, extreme: 1.5 },
    { tranche: 'Junior AAA', baseline: 0.5, moderate: 1.0, severe: 2.0, extreme: 3.5 },
    { tranche: 'AA', baseline: 1.0, moderate: 2.0, severe: 4.0, extreme: 7.0 },
    { tranche: 'A', baseline: 2.0, moderate: 4.0, severe: 8.0, extreme: 12.0 },
    { tranche: 'BBB', baseline: 4.0, moderate: 8.0, severe: 16.0, extreme: 25.0 }
  ]);

  const macroFactors = {
    moderate: {
      gdpChange: -2.1,
      unemploymentChange: 2.5,
      housePriceChange: -12.5,
      interestRateChange: 2.0
    },
    severe: {
      gdpChange: -4.7,
      unemploymentChange: 4.8,
      housePriceChange: -25.0,
      interestRateChange: 3.5
    },
    extreme: {
      gdpChange: -7.2,
      unemploymentChange: 7.2,
      housePriceChange: -35.0,
      interestRateChange: 5.0
    }
  };

  const analyzePortfolioRisk = () => {
    // Portfolio risk analysis logic here
    return 'severe';
  };

  useEffect(() => {
    const recommendedStress = analyzePortfolioRisk();
    onAnalysisComplete(recommendedStress);
  }, [selectedStressLevel]);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Securitization Portfolio Risk Weight Distribution
        </h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={distributionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tranche" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="baseline" name="Baseline" stroke="#3B82F6" />
              <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
              <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
              <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <PortfolioDistributionGrid selectedPortfolio="securitization" />

      <RiskWeightSensitivityGrid selectedPortfolio="securitization" />

      <SecuritizationAnalysis />

      <MonteCarloResults macroFactors={macroFactors} />
    </div>
  );
}