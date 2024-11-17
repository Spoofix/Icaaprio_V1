import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface PDDistributionProps {
  portfolioType: string;
}

export default function PDDistribution({ portfolioType }: PDDistributionProps) {
  const pdData = portfolioType === 'retail' ? [
    { score: '800+', base: 0.1, moderate: 0.2, severe: 0.4, extreme: 0.8 },
    { score: '750-799', base: 0.3, moderate: 0.6, severe: 1.2, extreme: 2.0 },
    { score: '700-749', base: 0.8, moderate: 1.5, severe: 2.5, extreme: 4.0 },
    { score: '650-699', base: 2.0, moderate: 3.5, severe: 5.0, extreme: 7.5 },
    { score: '600-649', base: 4.0, moderate: 6.0, severe: 8.0, extreme: 12.0 },
    { score: '<600', base: 8.0, moderate: 12.0, severe: 15.0, extreme: 20.0 }
  ] : [
    { rating: 'AAA', base: 0.02, moderate: 0.04, severe: 0.08, extreme: 0.15 },
    { rating: 'AA', base: 0.05, moderate: 0.10, severe: 0.20, extreme: 0.40 },
    { rating: 'A', base: 0.12, moderate: 0.25, severe: 0.50, extreme: 1.00 },
    { rating: 'BBB', base: 0.35, moderate: 0.70, severe: 1.40, extreme: 2.80 },
    { rating: 'BB', base: 1.20, moderate: 2.40, severe: 4.80, extreme: 9.60 },
    { rating: 'B', base: 4.00, moderate: 8.00, severe: 16.00, extreme: 25.00 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Probability of Default Distribution
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {portfolioType === 'retail' ? 'By Credit Score' : 'By Rating'}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={pdData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={portfolioType === 'retail' ? 'score' : 'rating'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="base" name="Base PD%" stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}