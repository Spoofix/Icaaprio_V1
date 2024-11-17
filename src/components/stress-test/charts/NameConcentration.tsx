import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Info } from 'lucide-react';
import { COLORS } from '../../../utils/constants';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';

interface NameConcentrationData {
  name: string;
  value: number;
  percentage: number;
}

interface NameConcentrationProps {
  data: NameConcentrationData[];
  totalValue: number;
}

const tooltipContent = {
  title: 'Name Concentration',
  tooltip: 'Distribution of exposures across top borrowers. High concentration in individual names may increase single-name credit risk.'
};

export function NameConcentration({ data, totalValue }: NameConcentrationProps) {
  const hhi = data.reduce((sum, item) => sum + Math.pow(item.percentage, 2), 0);
  const getHHILevel = (hhi: number) => {
    if (hhi < 1000) return { level: 'Low', color: 'text-green-600 dark:text-green-400' };
    if (hhi < 1800) return { level: 'Moderate', color: 'text-yellow-600 dark:text-yellow-400' };
    return { level: 'High', color: 'text-red-600 dark:text-red-400' };
  };
  const hhiStatus = getHHILevel(hhi);

  return (
    <div className="h-[400px] bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="group relative">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center cursor-help">
          <Users className="w-5 h-5 mr-2" />
          {tooltipContent.title}
          <Info className="w-4 h-4 ml-2 text-gray-400" />
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64 mt-1">
          {tooltipContent.tooltip}
        </div>
      </div>

      <div className="h-[calc(100%-6rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ percentage }) => `${percentage.toFixed(1)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            HHI Index: {hhi.toFixed(0)}
          </span>
          <span className={`text-sm font-medium ${hhiStatus.color}`}>
            ({hhiStatus.level} Concentration)
          </span>
        </div>
      </div>
    </div>
  );
}