import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

const creditEnhancementData = [
  { level: '0-5%', base: 250, moderate: 300, severe: 350, extreme: 400 },
  { level: '5-10%', base: 150, moderate: 200, severe: 250, extreme: 300 },
  { level: '10-15%', base: 100, moderate: 150, severe: 200, extreme: 250 },
  { level: '15-20%', base: 75, moderate: 100, severe: 150, extreme: 200 },
  { level: '>20%', base: 50, moderate: 75, severe: 100, extreme: 150 }
];

export function CreditEnhancementAnalysis() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="group relative mb-4">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
          Credit Enhancement Analysis
          <Info className="w-4 h-4 ml-2 text-gray-400" />
        </h3>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
          Impact of credit enhancement levels on risk weights under stress scenarios
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={creditEnhancementData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="level" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="base" name="Base" stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme" stroke="#7C3AED" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}