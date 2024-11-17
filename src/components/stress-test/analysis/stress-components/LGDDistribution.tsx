import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface LGDDistributionProps {
  portfolioType: string;
}

export default function LGDDistribution({ portfolioType }: LGDDistributionProps) {
  const lgdData = portfolioType === 'retail' ? [
    { ltv: '<50%', base: 10, moderate: 15, severe: 20, extreme: 25 },
    { ltv: '50-60%', base: 15, moderate: 20, severe: 25, extreme: 30 },
    { ltv: '60-70%', base: 20, moderate: 25, severe: 30, extreme: 35 },
    { ltv: '70-80%', base: 25, moderate: 30, severe: 35, extreme: 40 },
    { ltv: '>80%', base: 30, moderate: 35, severe: 40, extreme: 45 }
  ] : [
    { collateral: 'Cash', base: 1, moderate: 1, severe: 1, extreme: 1 },
    { collateral: 'Government', base: 5, moderate: 7, severe: 10, extreme: 15 },
    { collateral: 'Corporate', base: 20, moderate: 30, severe: 40, extreme: 50 },
    { collateral: 'Real Estate', base: 25, moderate: 35, severe: 45, extreme: 55 },
    { collateral: 'Other', base: 35, moderate: 45, severe: 55, extreme: 65 },
    { collateral: 'Unsecured', base: 45, moderate: 55, severe: 65, extreme: 75 }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Loss Given Default Distribution
        </h3>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {portfolioType === 'retail' ? 'By LTV Range' : 'By Collateral Type'}
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={lgdData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={portfolioType === 'retail' ? 'ltv' : 'collateral'} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="base" name="Base LGD%" stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}