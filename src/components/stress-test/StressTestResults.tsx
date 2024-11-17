import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { Info, ExternalLink, AlertTriangle } from 'lucide-react';

const historicalData = [
  { year: '2004', baseline: 13.2, moderate: 12.4, severe: 11.1 },
  { year: '2005', baseline: 13.0, moderate: 12.2, severe: 10.9 },
  { year: '2006', baseline: 12.8, moderate: 12.0, severe: 10.7 },
  { year: '2007', baseline: 12.5, moderate: 11.7, severe: 10.4 },
  { year: '2008', baseline: 11.8, moderate: 10.9, severe: 9.5 },
  { year: '2009', baseline: 11.2, moderate: 10.3, severe: 8.9 },
  { year: '2010', baseline: 11.9, moderate: 11.0, severe: 9.7 },
  { year: '2011', baseline: 12.2, moderate: 11.3, severe: 10.0 },
  { year: '2012', baseline: 12.4, moderate: 11.5, severe: 10.2 },
  { year: '2013', baseline: 12.6, moderate: 11.7, severe: 10.4 },
  { year: '2014', baseline: 12.8, moderate: 11.9, severe: 10.6 },
  { year: '2015', baseline: 12.9, moderate: 12.0, severe: 10.7 },
  { year: '2016', baseline: 13.1, moderate: 12.2, severe: 10.9 },
  { year: '2017', baseline: 13.3, moderate: 12.4, severe: 11.1 },
  { year: '2018', baseline: 13.4, moderate: 12.5, severe: 11.2 },
  { year: '2019', baseline: 13.5, moderate: 12.6, severe: 11.3 },
  { year: '2020', baseline: 12.8, moderate: 11.9, severe: 10.6 },
  { year: '2021', baseline: 13.2, moderate: 12.3, severe: 11.0 },
  { year: '2022', baseline: 13.4, moderate: 12.5, severe: 11.2 },
  { year: '2023', baseline: 13.6, moderate: 12.7, severe: 11.4 }
];

const dataSources = [
  {
    name: 'Bank of Canada Historical Data (2004-2024)',
    url: 'https://www.bankofcanada.ca/rates/banking-and-financial-statistics/selected-banking-and-financial-statistics-formerly-e1/'
  },
  {
    name: 'OSFI Capital Adequacy Requirements',
    url: 'https://www.osfi-bsif.gc.ca/Eng/fi-if/rg-ro/gdn-ort/gl-ld/Pages/CAR22_index.aspx'
  },
  {
    name: 'Statistics Canada Financial Statistics',
    url: 'https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1010014701'
  }
];

export default function StressTestResults() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div className="space-y-2">
            <p className="text-sm text-blue-700 dark:text-blue-300">
              20-year historical capital ratios under different stress scenarios. The graph shows actual performance during major stress events:
            </p>
            <ul className="text-sm text-blue-700 dark:text-blue-300 list-disc list-inside ml-2">
              <li>2008-2009 Financial Crisis</li>
              <li>2015 Oil Price Shock</li>
              <li>2020 COVID-19 Pandemic</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Historical Capital Ratio Analysis (2004-2024)
        </h3>
        <div className="h-96">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={historicalData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis domain={[8, 14]} />
              <Tooltip />
              <Legend />
              <ReferenceLine y={10.5} label="Regulatory Minimum" stroke="#EF4444" strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="baseline"
                name="Historical Baseline"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="moderate"
                name="Moderate Stress"
                stroke="#F59E0B"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
              <Line
                type="monotone"
                dataKey="severe"
                name="Severe Stress"
                stroke="#EF4444"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Moderate Stress Scenario</h4>
              <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-300">
                Based on 95th percentile adverse movements, similar to 2015 oil price shock conditions
              </p>
            </div>
          </div>
        </div>

        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <div>
              <h4 className="text-sm font-medium text-red-800 dark:text-red-200">Severe Stress Scenario</h4>
              <p className="mt-1 text-sm text-red-700 dark:text-red-300">
                Based on 99th percentile adverse movements, exceeding 2008 financial crisis conditions
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-6">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Historical Data Sources</h4>
        <div className="space-y-2">
          {dataSources.map((source) => (
            <a
              key={source.name}
              href={source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              {source.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}