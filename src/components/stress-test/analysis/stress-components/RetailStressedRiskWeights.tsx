import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Info, Play } from 'lucide-react';
import { runMonteCarloSimulation, MacroFactors, SimulationResults } from '../monte-carlo/MonteCarloUtils';

interface RetailStressedRiskWeightsProps {
  macroFactors: {
    moderate: MacroFactors;
    severe: MacroFactors;
    extreme: MacroFactors;
  };
}

interface SimulationState {
  moderate: SimulationResults;
  severe: SimulationResults;
  extreme: SimulationResults;
}

export default function RetailStressedRiskWeights({ macroFactors }: RetailStressedRiskWeightsProps) {
  const [simulationResults, setSimulationResults] = useState<SimulationState | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const runSimulations = async () => {
    setIsSimulating(true);
    try {
      const [moderate, severe, extreme] = await Promise.all([
        runMonteCarloSimulation(10000, macroFactors.moderate),
        runMonteCarloSimulation(10000, macroFactors.severe),
        runMonteCarloSimulation(10000, macroFactors.extreme)
      ]);

      setSimulationResults({
        moderate,
        severe,
        extreme
      });
    } finally {
      setIsSimulating(false);
    }
  };

  const renderDistributionChart = (title: string, data: SimulationResults | undefined) => {
    if (!data) return null;

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">{title}</h3>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data.distribution}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="pnl"
                label={{ value: 'Risk Weight Change (%)', position: 'bottom' }}
              />
              <YAxis 
                label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Line 
                type="monotone" 
                dataKey="frequency" 
                stroke="#3B82F6" 
                dot={false}
              />
              <ReferenceLine
                x={-data.stressLevels.var95}
                stroke="#10B981"
                label="95% VaR"
              />
              <ReferenceLine
                x={-data.stressLevels.var99}
                stroke="#F59E0B"
                label="99% VaR"
              />
              <ReferenceLine
                x={-data.stressLevels.var9999}
                stroke="#EF4444"
                label="99.99% VaR"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Monte Carlo simulation using macro factors to estimate stressed risk weights.
              Results show distribution of potential risk weight changes under different scenarios.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={runSimulations}
          disabled={isSimulating}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          <Play className="w-4 h-4 mr-2" />
          {isSimulating ? 'Running Simulation...' : 'Run Monte Carlo Simulation'}
        </button>
      </div>

      {simulationResults && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {renderDistributionChart('Moderate Stress Distribution', simulationResults.moderate)}
          {renderDistributionChart('Severe Stress Distribution', simulationResults.severe)}
          {renderDistributionChart('Extreme Stress Distribution', simulationResults.extreme)}
        </div>
      )}
    </div>
  );
}