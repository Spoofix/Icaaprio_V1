import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info, AlertTriangle } from 'lucide-react';

interface OddsRatioData {
  scoreRange: string;
  historicalOdds: number;
  currentOdds: number;
  stressedOdds: number;
  source: string;
  lastUpdated: string;
}

const oddsData: OddsRatioData[] = [
  {
    scoreRange: "800+",
    historicalOdds: 1200,
    currentOdds: 1150,
    stressedOdds: 850,
    source: "Equifax BNI 3.0",
    lastUpdated: "2024-03"
  },
  {
    scoreRange: "750-799",
    historicalOdds: 400,
    currentOdds: 380,
    stressedOdds: 280,
    source: "Equifax BNI 3.0",
    lastUpdated: "2024-03"
  },
  {
    scoreRange: "700-749",
    historicalOdds: 150,
    currentOdds: 140,
    stressedOdds: 90,
    source: "Equifax BNI 3.0",
    lastUpdated: "2024-03"
  },
  {
    scoreRange: "650-699",
    historicalOdds: 45,
    currentOdds: 42,
    stressedOdds: 25,
    source: "Equifax BNI 3.0",
    lastUpdated: "2024-03"
  },
  {
    scoreRange: "600-649",
    historicalOdds: 15,
    currentOdds: 14,
    stressedOdds: 8,
    source: "Equifax BNI 3.0",
    lastUpdated: "2024-03"
  }
];

export default function OddsRatioAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Credit Score Odds Ratio Analysis
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last Updated: {oddsData[0].lastUpdated}
          </div>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={oddsData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scoreRange" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="historicalOdds" 
                name="Historical Odds" 
                stroke="#3B82F6" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="currentOdds" 
                name="Current Odds" 
                stroke="#10B981" 
                strokeWidth={2}
              />
              <Line 
                type="monotone" 
                dataKey="stressedOdds" 
                name="Stressed Odds" 
                stroke="#EF4444" 
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <div className="flex items-start">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  Data Sources
                </h4>
                <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
                  <li>Primary: {oddsData[0].source}</li>
                  <li>Historical: 20-year performance data</li>
                  <li>Stress: Based on 2008-2009 migration patterns</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/30 rounded-lg">
            <div className="flex items-start">
              <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                  Model Validation
                </h4>
                <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
                  <li>Monthly odds ratio updates</li>
                  <li>Quarterly validation against actuals</li>
                  <li>Annual comprehensive review</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}