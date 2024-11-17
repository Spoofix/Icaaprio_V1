import React from 'react';
import { formatCurrency, formatPercentage } from '../../../utils/formatters';
import { COLORS } from '../../../utils/constants';
import { Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

interface GeographicData {
  name: string;
  value: number;
  percentage: number;
}

interface GeographicMapProps {
  data: GeographicData[];
  onProvinceSelect: (province: string | null) => void;
  selectedProvince: string | null;
}

const tooltipContent = {
  title: 'Geographic Distribution',
  tooltip: 'Distribution of exposures across different Canadian provinces and territories. High concentration in specific regions may increase vulnerability to regional economic conditions.'
};

export function GeographicMap({ data = [], onProvinceSelect, selectedProvince }: GeographicMapProps) {
  const totalValue = data?.reduce((sum, item) => sum + item.value, 0) || 0;
  const hhi = data?.reduce((sum, item) => sum + Math.pow((item.value / totalValue) * 100, 2), 0) || 0;

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
          <Info className="w-5 h-5 mr-2" />
          {tooltipContent.title}
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64 mt-1">
          {tooltipContent.tooltip}
        </div>
      </div>

      <div className="h-[calc(100%-6rem)]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 60, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category"
              width={100}
            />
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              labelFormatter={(label) => `Province: ${label}`}
            />
            <Bar 
              dataKey="value" 
              fill="#3B82F6"
              onClick={(data) => onProvinceSelect(data.name)}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`}
                  fill={selectedProvince === entry.name ? '#2563EB' : COLORS[index % COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
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