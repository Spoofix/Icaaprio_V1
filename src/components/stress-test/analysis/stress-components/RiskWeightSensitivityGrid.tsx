import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area } from 'recharts';
import { Info } from 'lucide-react';

interface RiskWeightSensitivityGridProps {
  selectedPortfolio: string;
}

export default function RiskWeightSensitivityGrid({ selectedPortfolio }: RiskWeightSensitivityGridProps) {
  // Your actual portfolio data
  const actualData = {
    creditQuality: [
      { quality: '800+', actual: 35, base: 35, moderate: 45, severe: 60, extreme: 75 },
      { quality: '750-799', actual: 42, base: 50, moderate: 65, severe: 85, extreme: 100 },
      { quality: '700-749', actual: 68, base: 75, moderate: 100, severe: 125, extreme: 150 },
      { quality: '650-699', actual: 95, base: 100, moderate: 150, severe: 200, extreme: 250 },
      { quality: '<650', actual: 145, base: 150, moderate: 225, severe: 300, extreme: 350 }
    ],
    ltv: [
      { range: '<50%', actual: 32, base: 35, moderate: 45, severe: 60, extreme: 75 },
      { range: '50-60%', actual: 48, base: 50, moderate: 65, severe: 85, extreme: 100 },
      { range: '60-70%', actual: 72, base: 75, moderate: 100, severe: 125, extreme: 150 },
      { range: '70-80%', actual: 98, base: 100, moderate: 150, severe: 200, extreme: 250 },
      { range: '>80%', actual: 155, base: 150, moderate: 225, severe: 300, extreme: 350 }
    ],
    industry: [
      { industry: 'Low Risk', actual: 45, base: 50, moderate: 65, severe: 85, extreme: 100 },
      { industry: 'Medium Risk', actual: 95, base: 100, moderate: 150, severe: 200, extreme: 250 },
      { industry: 'High Risk', actual: 142, base: 150, moderate: 225, severe: 300, extreme: 350 },
      { industry: 'Very High Risk', actual: 190, base: 200, moderate: 300, severe: 400, extreme: 450 }
    ],
    geographic: [
      { region: 'Strong', actual: 48, base: 50, moderate: 65, severe: 85, extreme: 100 },
      { region: 'Stable', actual: 72, base: 75, moderate: 100, severe: 125, extreme: 150 },
      { region: 'Moderate', actual: 96, base: 100, moderate: 150, severe: 200, extreme: 250 },
      { region: 'Weak', actual: 145, base: 150, moderate: 225, severe: 300, extreme: 350 }
    ]
  };

  const renderChart = (data: any[], xKey: string, title: string, description: string) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="group relative">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center cursor-help">
            {title}
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64 mt-1">
            {description}
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey={xKey} />
            <YAxis domain={[0, 'dataMax']} label={{ value: 'Risk Weight %', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'actual') return [`${value}% (Current)`, 'Current Portfolio'];
                return [`${value}%`, name];
              }}
            />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="actual" 
              name="Current Portfolio" 
              fill="#3B82F6" 
              fillOpacity={0.3} 
              stroke="#3B82F6" 
            />
            <Line type="monotone" dataKey="base" name="Base RW%" stroke="#94A3B8" strokeDasharray="5 5" />
            <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-medium mb-2">Risk Weight Analysis:</p>
          <ul className="list-disc list-inside space-y-1">
            {data.map((item, index) => {
              const diff = item.actual - item.base;
              if (Math.abs(diff) > 5) {
                return (
                  <li key={index}>
                    {`${item[xKey]}: ${Math.abs(diff).toFixed(1)}% ${diff > 0 ? 'higher' : 'lower'} than base case`}
                  </li>
                );
              }
              return null;
            }).filter(Boolean)}
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {renderChart(
        actualData.creditQuality,
        'quality',
        'Credit Quality Sensitivity',
        'Risk weight sensitivity to credit quality/rating changes under different stress scenarios'
      )}
      {renderChart(
        actualData.ltv,
        'range',
        'LTV/Collateral Sensitivity',
        'Impact of collateral value changes and LTV ratio shifts on risk weights'
      )}
      {renderChart(
        actualData.industry,
        'industry',
        'Industry Risk Sensitivity',
        'Risk weight variations based on industry risk classifications and stress conditions'
      )}
      {renderChart(
        actualData.geographic,
        'region',
        'Geographic Risk Sensitivity',
        'Regional economic conditions and their impact on risk weight assignments'
      )}
    </div>
  );
}