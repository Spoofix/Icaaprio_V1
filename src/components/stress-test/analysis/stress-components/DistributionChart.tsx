import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, ComposedChart } from 'recharts';
import { Info, ExternalLink } from 'lucide-react';

interface DistributionChartProps {
  data: any[];
  xKey: string;
  title: string;
  description: string;
  dataSource: {
    name: string;
    url: string;
  };
}

export default function DistributionChart({ data, xKey, title, description, dataSource }: DistributionChartProps) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="group relative">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center cursor-help">
            {title}
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
            {description}
          </div>
        </div>
        <a 
          href={dataSource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
        >
          <ExternalLink className="w-4 h-4 mr-1" />
          Data Source
        </a>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xKey}
              label={{ 
                value: xKey === 'score' ? 'Credit Score Range' : 'Loan-to-Value Ratio (%)',
                position: 'bottom'
              }}
            />
            <YAxis
              label={{ 
                value: 'Portfolio Distribution (%)',
                angle: -90,
                position: 'insideLeft'
              }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'benchmark') return [`${value}% (Industry)`, 'Industry Benchmark'];
                if (name === 'actual') return [`${value}% (Your Portfolio)`, 'Your Portfolio'];
                return [`${value}%`, name];
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="benchmark" name="Industry Benchmark" stroke="#94A3B8" strokeDasharray="5 5" />
            <Area type="monotone" dataKey="actual" name="Your Portfolio" fill="#3B82F6" fillOpacity={0.3} stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-medium mb-2">Key Observations:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your portfolio shows {data[0].actual > data[0].benchmark ? 'higher' : 'lower'} concentration in high-quality ranges</li>
            <li>Stress scenarios indicate potential migration to {xKey === 'score' ? 'lower scores' : 'higher LTV ranges'}</li>
            <li>Industry benchmark suggests {data[0].actual > data[0].benchmark ? 'more conservative' : 'typical'} risk profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
}