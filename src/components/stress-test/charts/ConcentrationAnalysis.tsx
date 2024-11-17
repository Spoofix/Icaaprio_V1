import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { AlertTriangle } from 'lucide-react';

interface ConcentrationData {
  name: string;
  value: number;
  percentage: number;
}

interface ConcentrationMetrics {
  hhi: number;
  top5Concentration: number;
  top10Concentration: number;
  effectiveCount: number;
}

interface ConcentrationAnalysisProps {
  portfolioType: 'business' | 'retail';
  data: any; // Using any for brevity, should be properly typed in production
}

const calculateHHI = (data: ConcentrationData[]): ConcentrationMetrics => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const hhi = data.reduce((sum, item) => sum + Math.pow((item.value / total) * 100, 2), 0);
  const sortedData = [...data].sort((a, b) => b.value - a.value);
  const top5Concentration = sortedData.slice(0, 5).reduce((sum, item) => sum + (item.value / total) * 100, 0);
  const top10Concentration = sortedData.slice(0, 10).reduce((sum, item) => sum + (item.value / total) * 100, 0);
  const effectiveCount = 10000 / hhi; // Inverse of HHI * 10000

  return { hhi, top5Concentration, top10Concentration, effectiveCount };
};

const getConcentrationLevel = (hhi: number): { level: string; color: string } => {
  if (hhi < 1000) return { level: 'Low', color: 'text-green-600 dark:text-green-400' };
  if (hhi < 1800) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
  return { level: 'High', color: 'text-red-600 dark:text-red-400' };
};

export function ConcentrationAnalysis({ portfolioType, data }: ConcentrationAnalysisProps) {
  const sectorMetrics = calculateHHI(data.sectorConcentration || []);
  const nameMetrics = calculateHHI(data.nameConcentration || []);
  const geoMetrics = calculateHHI(data.geographicDistribution || []);

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Concentration Analysis
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Sector Concentration */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Sector Concentration
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">HHI</span>
                <span className={getConcentrationLevel(sectorMetrics.hhi).color}>
                  {sectorMetrics.hhi.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Top 5</span>
                <span className="text-gray-900 dark:text-white">
                  {sectorMetrics.top5Concentration.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Name Concentration */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Name Concentration
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">HHI</span>
                <span className={getConcentrationLevel(nameMetrics.hhi).color}>
                  {nameMetrics.hhi.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Top 5</span>
                <span className="text-gray-900 dark:text-white">
                  {nameMetrics.top5Concentration.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>

          {/* Geographic Concentration */}
          <div className="space-y-4">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
              Geographic Concentration
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">HHI</span>
                <span className={getConcentrationLevel(geoMetrics.hhi).color}>
                  {geoMetrics.hhi.toFixed(0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Top 5</span>
                <span className="text-gray-900 dark:text-white">
                  {geoMetrics.top5Concentration.toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
            <div className="text-sm text-gray-500 dark:text-gray-400">
              <p>HHI Interpretation:</p>
              <ul className="list-disc list-inside mt-2 space-y-1">
                <li>Below 1000: Low concentration</li>
                <li>1000-1800: Moderate concentration</li>
                <li>Above 1800: High concentration</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}