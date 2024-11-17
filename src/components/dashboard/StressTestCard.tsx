import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Base', ratio: 12.5 },
  { name: 'Mild', ratio: 11.8 },
  { name: 'Moderate', ratio: 10.5 },
  { name: 'Severe', ratio: 9.2 },
];

export default function StressTestCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Capital Ratio Stress Test Results
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[8, 14]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="ratio"
              stroke="#3B82F6"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}