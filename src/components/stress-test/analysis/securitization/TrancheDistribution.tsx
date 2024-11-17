import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Info } from 'lucide-react';
import { COLORS } from '../../../../utils/constants';
import { formatCurrency } from '../../../../utils/formatters';

const trancheData = [
  { name: 'Senior AAA', value: 500000000, percentage: 50 },
  { name: 'Junior AAA', value: 200000000, percentage: 20 },
  { name: 'AA', value: 150000000, percentage: 15 },
  { name: 'A', value: 100000000, percentage: 10 },
  { name: 'BBB', value: 50000000, percentage: 5 }
];

export function TrancheDistribution() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="group relative mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          Tranche Distribution
          <Info className="w-4 h-4 ml-2 text-gray-400" />
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
          Distribution of securitization exposures across different rating categories
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={trancheData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percentage }) => `${name}: ${percentage}%`}
            >
              {trancheData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}