import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Building2, TrendingDown } from 'lucide-react';
import { COLORS } from '../../../utils/constants';

interface EventPortfolioMappingProps {
  event: {
    id: string;
    name: string;
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

export default function EventPortfolioMapping({ event }: EventPortfolioMappingProps) {
  const portfolioImpact = [
    { name: 'Retail', value: calculateRetailImpact(event) },
    { name: 'Commercial', value: calculateCommercialImpact(event) },
    { name: 'Real Estate', value: calculateRealEstateImpact(event) },
    { name: 'Other', value: calculateOtherImpact(event) }
  ];

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Portfolio Impact Analysis
        </h3>
        <div className="flex items-center">
          <Building2 className="w-5 h-5 text-blue-500 mr-2" />
          <span className="text-sm text-blue-600 dark:text-blue-400">
            Portfolio Mapping
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={portfolioImpact}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
              >
                {portfolioImpact.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="space-y-4">
          {portfolioImpact.map((segment, index) => (
            <div key={segment.name} className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {segment.name}
                </span>
                <div className="flex items-center">
                  <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                  <span className="text-sm font-medium text-red-600 dark:text-red-400">
                    {segment.value.toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                {getImpactDescription(segment.name, event)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function calculateRetailImpact(event: EventPortfolioMappingProps['event']) {
  return Math.abs(
    (event.metrics.unemploymentPeak * 0.4) +
    (event.metrics.gdpChange * 0.3) +
    (event.metrics.defaultRateIncrease * 0.3) / 100
  );
}

function calculateCommercialImpact(event: EventPortfolioMappingProps['event']) {
  return Math.abs(
    (event.metrics.gdpChange * 0.5) +
    (event.metrics.equityMarketDecline * 0.3) +
    (event.metrics.defaultRateIncrease * 0.2) / 100
  );
}

function calculateRealEstateImpact(event: EventPortfolioMappingProps['event']) {
  return Math.abs(
    (event.metrics.propertyValueDecline * 0.6) +
    (event.metrics.gdpChange * 0.2) +
    (event.metrics.defaultRateIncrease * 0.2) / 100
  );
}

function calculateOtherImpact(event: EventPortfolioMappingProps['event']) {
  return Math.abs(
    (event.metrics.gdpChange * 0.4) +
    (event.metrics.equityMarketDecline * 0.4) +
    (event.metrics.defaultRateIncrease * 0.2) / 100
  );
}

function getImpactDescription(portfolioType: string, event: EventPortfolioMappingProps['event']) {
  switch (portfolioType) {
    case 'Retail':
      return `Driven by unemployment (${event.metrics.unemploymentPeak}%) and GDP decline`;
    case 'Commercial':
      return `Affected by GDP decline (${event.metrics.gdpChange}%) and market conditions`;
    case 'Real Estate':
      return `Property value decline of ${event.metrics.propertyValueDecline}% key factor`;
    case 'Other':
      return `General market conditions and systemic factors`;
    default:
      return '';
  }
}