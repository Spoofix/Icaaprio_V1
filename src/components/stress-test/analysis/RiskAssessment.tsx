import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface RiskAssessmentProps {
  portfolioType: 'retail' | 'business';
}

export default function RiskAssessment({ portfolioType }: RiskAssessmentProps) {
  // Sample data - in a real app, this would come from your data analysis
  const pdDistributionData = [
    { score: '800+', base: 0.1, moderate: 0.2, severe: 0.4, extreme: 0.8 },
    { score: '750-799', base: 0.3, moderate: 0.6, severe: 1.2, extreme: 2.0 },
    { score: '700-749', base: 0.8, moderate: 1.5, severe: 2.5, extreme: 4.0 },
    { score: '650-699', base: 2.0, moderate: 3.5, severe: 5.0, extreme: 7.5 },
    { score: '600-649', base: 4.0, moderate: 6.0, severe: 8.0, extreme: 12.0 },
    { score: '<600', base: 8.0, moderate: 12.0, severe: 15.0, extreme: 20.0 }
  ];

  const lgdDistributionData = [
    { ltv: '<50%', base: 10, moderate: 15, severe: 20, extreme: 25 },
    { ltv: '50-60%', base: 15, moderate: 20, severe: 25, extreme: 30 },
    { ltv: '60-70%', base: 20, moderate: 25, severe: 30, extreme: 35 },
    { ltv: '70-80%', base: 25, moderate: 30, severe: 35, extreme: 40 },
    { ltv: '>80%', base: 30, moderate: 35, severe: 40, extreme: 45 }
  ];

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              {portfolioType === 'retail' 
                ? 'Retail portfolio risk assessment showing PD and LGD distributions under different stress scenarios.'
                : 'Business portfolio risk assessment showing rating migration and loss severity under stress scenarios.'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* PD Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Probability of Default Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pdDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="score" />
                <YAxis label={{ value: 'PD (%)', angle: -90, position: 'insideLeft' }} />
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

        {/* LGD Distribution Chart */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Loss Given Default Distribution
          </h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={lgdDistributionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="ltv" />
                <YAxis label={{ value: 'LGD (%)', angle: -90, position: 'insideLeft' }} />
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
      </div>
    </div>
  );
}