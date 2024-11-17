import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { BarChart2, Info } from 'lucide-react';
import { COLORS } from '../../../utils/constants';
import { formatCurrency } from '../../../utils/formatters';

interface DistributionChartProps {
  data: Array<{ name: string; value: number }>;
  portfolioType: string;
  activeDistribution: 'exposure' | 'count';
  setActiveDistribution: (type: 'exposure' | 'count') => void;
}

const tooltips = {
  retail: {
    title: 'Credit Score Distribution',
    tooltip: 'Distribution of retail exposures across credit score ranges. Reflects overall credit quality of retail portfolio.'
  },
  business: {
    title: 'Rating Distribution',
    tooltip: 'Distribution of credit exposures across internal risk rating categories. Indicates portfolio credit quality and potential risk concentration in specific rating bands.'
  },
  cre: {
    title: 'CRE Rating Distribution',
    tooltip: 'Distribution of commercial real estate exposures across rating categories. Shows credit quality profile of CRE portfolio.'
  },
  securitization: {
    title: 'Tranche Rating Distribution',
    tooltip: 'Distribution of securitization exposures across rating categories. Indicates credit enhancement levels and risk profile of securitized positions.'
  }
};

export function DistributionChart({
  data,
  portfolioType,
  activeDistribution,
  setActiveDistribution
}: DistributionChartProps) {
  const tooltipContent = tooltips[portfolioType as keyof typeof tooltips] || {
    title: 'Distribution Analysis',
    tooltip: 'Portfolio distribution analysis by exposure and count.'
  };

  return (
    <div className="h-[400px] bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="group relative">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center cursor-help">
            <BarChart2 className="w-5 h-5 mr-2" />
            {tooltipContent.title}
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64 mt-1">
            {tooltipContent.tooltip}
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeDistribution === 'exposure'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
            onClick={() => setActiveDistribution('exposure')}
          >
            By Exposure
          </button>
          <button
            className={`px-3 py-1 text-sm rounded-md ${
              activeDistribution === 'count'
                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            }`}
            onClick={() => setActiveDistribution('count')}
          >
            By Count
          </button>
        </div>
      </div>

      <div className="h-[calc(100%-6rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 20, right: 30, left: 60, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              type="number"
              tickFormatter={(value) =>
                activeDistribution === 'exposure'
                  ? `${value / 1e9}B`
                  : value.toLocaleString()
              }
            />
            <YAxis
              dataKey="name"
              type="category"
              tick={{
                fontSize: 12,
                fill: 'currentColor'
              }}
            />
            <Tooltip
              formatter={(value: number) =>
                activeDistribution === 'exposure'
                  ? [formatCurrency(value), 'Exposure']
                  : [value.toLocaleString(), 'Count']
              }
            />
            <Bar dataKey="value" fill="#3B82F6" barSize={20}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Distribution Analysis
          </span>
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {activeDistribution === 'exposure' ? 'By Exposure' : 'By Count'}
          </span>
        </div>
      </div>
    </div>
  );
}