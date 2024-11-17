import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Building2, TrendingDown, Info, Database, Lightbulb } from 'lucide-react';

interface EventTimelineProps {
  event: {
    id: string;
    name: string;
    period: string;
    metrics: {
      gdpChange: number;
      unemploymentPeak: number;
      equityMarketDecline: number;
      propertyValueDecline: number;
      defaultRateIncrease: number;
      capitalRatioImpact: number;
    };
  };
}

const historicalEvents = [
  {
    event: '2008 Financial Crisis',
    residentialDecline: -28,
    commercialDecline: -42,
    industrialDecline: -38,
    recoveryPeriod: '24 months'
  },
  {
    event: '2015 Oil Price Shock',
    residentialDecline: -12,
    commercialDecline: -18,
    industrialDecline: -15,
    recoveryPeriod: '12 months'
  },
  {
    event: '2020 COVID-19',
    residentialDecline: -15,
    commercialDecline: -25,
    industrialDecline: -20,
    recoveryPeriod: '18 months'
  }
];

export default function EventTimeline({ event }: EventTimelineProps) {
  // Rest of the component remains exactly the same
  const timelineData = generateTimelineData(event);

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Historical Event Analysis
      </h2>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg mb-6">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Historical event analysis provides validation for stress testing assumptions and scenario design.
              Compare current portfolio characteristics with historical stress events to assess resilience.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Database className="w-5 h-5 text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Data Sources</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Statistics Canada Economic Time Series (1990-2024)</li>
            <li>Bank of Canada Historical Data Series</li>
            <li>Bank of Canada Interest Rates</li>
            <li>IMF World Economic Outlook Database</li>
            <li>OSFI Regulatory Returns Database</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Application</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>GDP sensitivity calibration (2-3 points per 1% GDP)</li>
            <li>Unemployment elasticity (5-7 points per 1%)</li>
            <li>Regional economic variations</li>
            <li>Historical severity benchmarking</li>
          </ul>
        </div>
      </div>

      <div className="h-64 mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={timelineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="quarter" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="gdp" 
              name="GDP Change" 
              stroke="#3B82F6" 
            />
            <Line 
              type="monotone" 
              dataKey="unemployment" 
              name="Unemployment" 
              stroke="#EF4444" 
            />
            <Line 
              type="monotone" 
              dataKey="defaultRate" 
              name="Default Rate" 
              stroke="#F59E0B" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        {historicalEvents.map((event) => (
          <div key={event.event} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              {event.event}
            </h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Residential</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {event.residentialDecline}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Commercial</span>
                <span className="text-sm font-medium text-red-600 dark:text-red-400">
                  {event.commercialDecline}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">Recovery</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {event.recoveryPeriod}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Database className="w-5 h-5 text-blue-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recovery Analysis Sources</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Bank of Canada Financial System Review</li>
            <li>Historical Recovery Trajectory Data</li>
            <li>Sector-specific Recovery Patterns</li>
            <li>Policy Response Effectiveness Studies</li>
          </ul>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-lg">
          <div className="flex items-center mb-3">
            <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
            <h4 className="text-sm font-medium text-gray-900 dark:text-white">Recovery Pattern Application</h4>
          </div>
          <ul className="text-sm text-gray-600 dark:text-gray-400 list-disc list-inside">
            <li>Set planning horizons based on historical recovery times</li>
            <li>Account for structural economic changes</li>
            <li>Evaluate policy response effectiveness</li>
            <li>Apply crisis management lessons</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function generateTimelineData(event: EventTimelineProps['event']) {
  // Generate quarterly data points for the event period
  const quarters = 8; // 2 years of quarterly data
  return Array.from({ length: quarters }, (_, i) => {
    const quarter = `Q${(i % 4) + 1} ${parseInt(event.period.split('-')[0]) + Math.floor(i / 4)}`;
    const progress = i / (quarters - 1);
    
    // Create a bell curve for the stress impact
    const stressPoint = Math.sin(progress * Math.PI);
    
    return {
      quarter,
      gdp: event.metrics.gdpChange * stressPoint,
      unemployment: event.metrics.unemploymentPeak * stressPoint,
      defaultRate: event.metrics.defaultRateIncrease * stressPoint / 100
    };
  });
}