export interface MacroFactors {
  gdpChange: number;
  unemploymentChange: number;
  housePriceChange: number;
  interestRateChange: number;
}

export interface MacroScenarios {
  moderate: MacroFactors;
  severe: MacroFactors;
  extreme: MacroFactors;
}

export const defaultMacroFactors: MacroScenarios = {
  moderate: {
    gdpChange: -2.1,
    unemploymentChange: 2.5,
    housePriceChange: -12.5,
    interestRateChange: 2.0
  },
  severe: {
    gdpChange: -4.7,
    unemploymentChange: 4.8,
    housePriceChange: -25.0,
    interestRateChange: 3.5
  },
  extreme: {
    gdpChange: -7.2,
    unemploymentChange: 7.2,
    housePriceChange: -35.0,
    interestRateChange: 5.0
  }
};

export const historicalEvents = [
  {
    id: '2008-crisis',
    name: '2008 Financial Crisis',
    period: '2008-2009',
    description: 'Global financial crisis triggered by US housing market collapse',
    metrics: {
      gdpChange: -2.9,
      unemploymentPeak: 8.3,
      equityMarketDecline: -35,
      propertyValueDecline: -28,
      defaultRateIncrease: 250,
      capitalRatioImpact: -180
    }
  },
  {
    id: '2015-oil',
    name: '2015 Oil Price Shock',
    period: '2015-2016',
    description: 'Severe decline in oil prices affecting energy sector',
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
    name: '2020 COVID-19 Pandemic',
    period: '2020-2021',
    description: 'Global health crisis leading to economic shutdown',
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