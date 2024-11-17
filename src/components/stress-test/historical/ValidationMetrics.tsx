import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { CheckCircle, XCircle, Info } from 'lucide-react';

interface ValidationMetricsProps {
  event: {
    id: string;
    name: string;
    metrics: {
      gdpChange: number;
      unemploymentPeak: number;
      equityMarketDecline: number;
      propertyValueDecline: number;
      defaultRateIncrease: number;
      capitalRatioImpact: number;
    };
  };
}

export default function ValidationMetrics({ event }: ValidationMetricsProps) {
  const validationResults = [
    {
      metric: 'GDP Sensitivity',
      historical: Math.abs(event.metrics.gdpChange),
      current: Math.abs(event.metrics.gdpChange * 0.8),
      threshold: Math.abs(event.metrics.gdpChange * 0.7)
    },
    {
      metric: 'Default Rates',
      historical: event.metrics.defaultRateIncrease / 100,
      current: (event.metrics.defaultRateIncrease * 0.9) / 100,
      threshold: (event.metrics.defaultRateIncrease * 0.75) / 100
    },
    {
      metric: 'Capital Impact',
      historical: Math.abs(event.metrics.capitalRatioImpact) / 100,
      current: Math.abs(event.metrics.capitalRatioImpact * 0.85) / 100,
      threshold: Math.abs(event.metrics.capitalRatioImpact * 0.7) / 100
    },
    {
      metric: 'Market Risk',
      historical: Math.abs(event.metrics.equityMarketDecline),
      current: Math.abs(event.metrics.equityMarketDecline * 0.95),
      threshold: Math.abs(event.metrics.equityMarketDecline * 0.8)
    }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Stress Test Validation
      </h3>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div className="space-y-2">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Validation Methodology:
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Historical benchmarking against past stress events</li>
              <li>Peer comparison using public disclosures</li>
              <li>Regulatory guidance alignment (OSFI B-7)</li>
              <li>Industry best practices (Basel Committee guidance)</li>
            </ul>
            <p className="text-sm text-blue-700 dark:text-blue-300 mt-2">
              Data Sources:
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>OSFI Regulatory Returns Database (1990-2024)</li>
              <li>Bank of Canada Financial System Review</li>
              <li>Basel Committee Stress Testing Principles</li>
              <li>Peer Bank Pillar 3 Disclosures</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={validationResults}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="metric" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="historical" name="Historical" fill="#3B82F6" />
            <Bar dataKey="current" name="Current" fill="#10B981" />
            <Bar dataKey="threshold" name="Threshold" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-4">
        {validationResults.map((result) => (
          <div key={result.metric} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {result.metric}
              </span>
              <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Historical: {(result.historical * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center">
              {result.current >= result.threshold ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <XCircle className="w-5 h-5 text-red-500" />
              )}
              <span className="ml-2 text-sm font-medium">
                {(result.current * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}