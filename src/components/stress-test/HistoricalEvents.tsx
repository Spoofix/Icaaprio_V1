import React, { useState } from 'react';
import { Clock, TrendingDown, ArrowRight, AlertTriangle, Info } from 'lucide-react';
import EventTimeline from './historical/EventTimeline';
import EventPortfolioMapping from './historical/EventPortfolioMapping';
import ValidationMetrics from './historical/ValidationMetrics';
import ComparativeAnalysis from './historical/ComparativeAnalysis';

const historicalEvents = [
  {
    id: '2008-crisis',
    name: '2008 Financial Crisis',
    period: '2008-2009',
    description: 'Global financial crisis triggered by the US housing market collapse',
    metrics: {
      gdpChange: -2.9,
      unemploymentPeak: 8.3,
      equityMarketDecline: -35,
      propertyValueDecline: -28,
      defaultRateIncrease: 250, // basis points
      capitalRatioImpact: -180 // basis points
    }
  },
  {
    id: '2015-oil',
    name: '2015 Oil Price Shock',
    period: '2015-2016',
    description: 'Severe decline in oil prices affecting energy sector and regional economies',
    metrics: {
      gdpChange: -0.9,
      unemploymentPeak: 7.2,
      equityMarketDecline: -12,
      propertyValueDecline: -8,
      defaultRateIncrease: 120,
      capitalRatioImpact: -90
    }
  },
  {
    id: '2020-covid',
    name: 'COVID-19 Pandemic',
    period: '2020-2021',
    description: 'Global health crisis leading to economic shutdown and market volatility',
    metrics: {
      gdpChange: -5.4,
      unemploymentPeak: 13.7,
      equityMarketDecline: -30,
      propertyValueDecline: -15,
      defaultRateIncrease: 180,
      capitalRatioImpact: -150
    }
  }
];

export default function HistoricalEvents() {
  const [selectedEvent, setSelectedEvent] = useState(historicalEvents[0]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {historicalEvents.map((event) => (
          <button
            key={event.id}
            onClick={() => setSelectedEvent(event)}
            className={`p-4 rounded-lg border ${
              selectedEvent.id === event.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Clock className="w-5 h-5 mr-2" />
                <span className="font-medium">{event.name}</span>
              </div>
              <ArrowRight className="w-4 h-4" />
            </div>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {event.period}
            </p>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <EventTimeline event={selectedEvent} />
        <EventPortfolioMapping event={selectedEvent} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ValidationMetrics event={selectedEvent} />
        <ComparativeAnalysis event={selectedEvent} />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Important Considerations
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>Past events may not fully represent future risks</li>
              <li>Portfolio composition and risk profile changes over time</li>
              <li>Regulatory and market structure evolution impacts comparability</li>
              <li>Consider multiple historical events for comprehensive validation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}