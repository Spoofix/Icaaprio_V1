import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine } from 'recharts';
import { AlertTriangle, TrendingUp, BadgeDollarSign, Building, Percent, Network, ShieldAlert, Wallet, Info } from 'lucide-react';

const metrics = [
  {
    id: 'npl',
    name: 'NPL %',
    fullName: 'Non-Performing Loan Ratio',
    baseline: 1.2,
    moderate: 3.5,
    severe: 5.8,
    unit: '%',
    definition: 'Loans that are 90+ days past due or unlikely to be repaid as a percentage of total loans',
    significance: 'Leading indicator of potential credit losses. A rising NPL ratio often precedes increased write-offs and signals deteriorating portfolio quality.',
    warningLevel: 3.0,
    color: '#3B82F6'
  },
  {
    id: 'pcr',
    name: 'PCR %',
    fullName: 'Provision Coverage Ratio',
    baseline: 150,
    moderate: 120,
    severe: 90,
    unit: '%',
    definition: 'Total loan loss provisions as a percentage of total non-performing loans',
    significance: 'Measures the bank\'s preparedness for potential losses. Lower coverage may lead to capital impact when losses materialize.',
    warningLevel: 100,
    color: '#10B981'
  },
  {
    id: 'clr',
    name: 'CLR %',
    fullName: 'Credit Loss Rate',
    baseline: 0.3,
    moderate: 0.8,
    severe: 1.5,
    unit: '%',
    definition: 'Net credit losses (write-offs minus recoveries) as a percentage of total loans',
    significance: 'Direct measure of actual credit losses impacting capital. Historical trends help predict future loss patterns under stress.',
    warningLevel: 1.0,
    color: '#F59E0B'
  },
  {
    id: 'dr',
    name: 'DR %',
    fullName: 'Default Rate',
    baseline: 0.8,
    moderate: 2.2,
    severe: 4.5,
    unit: '%',
    definition: 'Number of new defaults as a percentage of performing loans',
    significance: 'Early warning indicator of credit deterioration. Helps forecast future NPLs and potential losses before they materialize.',
    warningLevel: 2.0,
    color: '#EF4444'
  }
];

export default function RiskAssessment() {
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null);

  const getChartData = (metric: typeof metrics[0]) => {
    return [
      { scenario: 'Baseline', value: metric.baseline },
      { scenario: 'Moderate', value: metric.moderate },
      { scenario: 'Severe', value: metric.severe }
    ];
  };

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            <BadgeDollarSign className="w-5 h-5 mr-2" />
            Credit Risk Metrics
          </h3>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Info className="w-4 h-4 mr-1" />
            Hover over metrics for details
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700"
              onMouseEnter={() => setHoveredMetric(metric.id)}
              onMouseLeave={() => setHoveredMetric(null)}
            >
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                  {metric.fullName} ({metric.name})
                </h4>
                {hoveredMetric === metric.id && (
                  <div className="mt-2 space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <span className="font-medium">Definition:</span> {metric.definition}
                    </p>
                    <p className="text-sm text-blue-600 dark:text-blue-300">
                      <span className="font-medium">Significance:</span> {metric.significance}
                    </p>
                  </div>
                )}
              </div>

              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={getChartData(metric)}
                    margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="scenario"
                      tick={{ fontSize: 12, fill: 'currentColor' }}
                    />
                    <YAxis
                      domain={[
                        0,
                        Math.ceil(Math.max(metric.severe, metric.warningLevel) * 1.2)
                      ]}
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-white dark:bg-gray-800 p-3 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
                              <p className="font-medium text-gray-900 dark:text-white">
                                {payload[0].payload.scenario}
                              </p>
                              <p className="text-sm text-gray-600 dark:text-gray-300">
                                {metric.name}: {payload[0].value}{metric.unit}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <ReferenceLine
                      y={metric.warningLevel}
                      stroke="#EF4444"
                      strokeDasharray="3 3"
                      label={{
                        value: `Warning Level (${metric.warningLevel}${metric.unit})`,
                        fill: '#EF4444',
                        fontSize: 12
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke={metric.color}
                      strokeWidth={2}
                      dot={{ r: 6 }}
                      activeDot={{ r: 8 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}