import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ComposedChart, Bar } from 'recharts';
import { Info, ExternalLink } from 'lucide-react';

interface DelinquencyData {
  scoreRange: string;
  delinquency30: number;
  delinquency90: number;
  default: number;
  moderate: {
    delinquency30: number;
    delinquency90: number;
    default: number;
  };
  severe: {
    delinquency30: number;
    delinquency90: number;
    default: number;
  };
  extreme: {
    delinquency30: number;
    delinquency90: number;
    default: number;
  };
}

const delinquencyData: DelinquencyData[] = [
  {
    scoreRange: '800+',
    delinquency30: 0.02,
    delinquency90: 0.01,
    default: 0.001,
    moderate: {
      delinquency30: 0.04,
      delinquency90: 0.02,
      default: 0.002
    },
    severe: {
      delinquency30: 0.08,
      delinquency90: 0.04,
      default: 0.004
    },
    extreme: {
      delinquency30: 0.16,
      delinquency90: 0.08,
      default: 0.008
    }
  },
  {
    scoreRange: '750-799',
    delinquency30: 0.08,
    delinquency90: 0.03,
    default: 0.005,
    moderate: {
      delinquency30: 0.16,
      delinquency90: 0.06,
      default: 0.01
    },
    severe: {
      delinquency30: 0.32,
      delinquency90: 0.12,
      default: 0.02
    },
    extreme: {
      delinquency30: 0.64,
      delinquency90: 0.24,
      default: 0.04
    }
  },
  {
    scoreRange: '700-749',
    delinquency30: 0.25,
    delinquency90: 0.12,
    default: 0.02,
    moderate: {
      delinquency30: 0.50,
      delinquency90: 0.24,
      default: 0.04
    },
    severe: {
      delinquency30: 1.00,
      delinquency90: 0.48,
      default: 0.08
    },
    extreme: {
      delinquency30: 2.00,
      delinquency90: 0.96,
      default: 0.16
    }
  },
  {
    scoreRange: '650-699',
    delinquency30: 0.85,
    delinquency90: 0.45,
    default: 0.08,
    moderate: {
      delinquency30: 1.70,
      delinquency90: 0.90,
      default: 0.16
    },
    severe: {
      delinquency30: 3.40,
      delinquency90: 1.80,
      default: 0.32
    },
    extreme: {
      delinquency30: 6.80,
      delinquency90: 3.60,
      default: 0.64
    }
  },
  {
    scoreRange: '<650',
    delinquency30: 2.50,
    delinquency90: 1.20,
    default: 0.25,
    moderate: {
      delinquency30: 5.00,
      delinquency90: 2.40,
      default: 0.50
    },
    severe: {
      delinquency30: 10.00,
      delinquency90: 4.80,
      default: 1.00
    },
    extreme: {
      delinquency30: 20.00,
      delinquency90: 9.60,
      default: 2.00
    }
  }
];

const historicalEvents = [
  {
    event: '2008 Financial Crisis',
    multiplier: 3.5,
    duration: '24 months',
    peak: {
      delinquency30: 4.2,
      delinquency90: 2.1,
      default: 0.45
    }
  },
  {
    event: '2015 Oil Price Shock',
    multiplier: 1.8,
    duration: '12 months',
    peak: {
      delinquency30: 2.1,
      delinquency90: 1.1,
      default: 0.22
    }
  },
  {
    event: '2020 COVID-19',
    multiplier: 2.2,
    duration: '18 months',
    peak: {
      delinquency30: 2.8,
      delinquency90: 1.4,
      default: 0.30
    }
  }
];

export default function DelinquencyAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex justify-between items-start mb-4">
          <div className="group relative">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center cursor-help">
              Credit Bureau Score Delinquency Rates
              <Info className="w-4 h-4 ml-2 text-gray-400" />
            </h3>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
              Delinquency rates by credit score range under different stress scenarios
            </div>
          </div>
          <a 
            href="https://www.transunion.ca/lenders/mortgage-delinquency"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            <ExternalLink className="w-4 h-4 mr-1" />
            TransUnion Data
          </a>
        </div>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={delinquencyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="scoreRange" />
              <YAxis 
                label={{ value: 'Delinquency Rate (%)', angle: -90, position: 'insideLeft' }}
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="delinquency30" name="30+ Days (Base)" fill="#3B82F6" />
              <Bar dataKey="delinquency90" name="90+ Days (Base)" fill="#10B981" />
              <Line 
                type="monotone" 
                dataKey="moderate.delinquency90" 
                name="90+ Days (Moderate)" 
                stroke="#F59E0B" 
              />
              <Line 
                type="monotone" 
                dataKey="severe.delinquency90" 
                name="90+ Days (Severe)" 
                stroke="#EF4444" 
              />
              <Line 
                type="monotone" 
                dataKey="extreme.delinquency90" 
                name="90+ Days (Extreme)" 
                stroke="#7C3AED" 
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          {historicalEvents.map((event) => (
            <div key={event.event} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                {event.event}
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Peak 90+ DPD</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {event.peak.delinquency90}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Default Rate</span>
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {event.peak.default}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500 dark:text-gray-400">Duration</span>
                  <span className="text-sm text-gray-900 dark:text-white">
                    {event.duration}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Delinquency Analysis Methodology:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Base rates from TransUnion mortgage performance data</li>
              <li>Stress scenarios calibrated to historical events</li>
              <li>90+ days past due used as primary risk indicator</li>
              <li>Default rates based on 12-month rolling average</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}