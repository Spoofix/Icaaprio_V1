export type Regulator = 'OSFI' | 'BCFSA' | 'FSRA' | 'CUDGC';

export type InstitutionType = 
  | 'banks'
  | 'federal_credit_unions'
  | 'credit_unions'
  | 'trust_companies';

export type Topic =
  | 'icaap'
  | 'capital'
  | 'stress'
  | 'risk'
  | 'documentation'
  | 'regulatory';

export interface RegulationType {
  name: string;
  guidelines: {
    ICAAP: string;
    capital: string;
    stress: string;
  };
  applicableTo: InstitutionType[];
  keyRequirements: string[];
}

export interface StressScenario {
  name: string;
  description: string;
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
  historicalReference?: {
    event: string;
    year: string;
    severity: string;
  };
}

export interface RiskMetric {
  name: string;
  value: number;
  threshold: number;
  trend: 'increasing' | 'decreasing' | 'stable';
  riskLevel: 'low' | 'medium' | 'high';
}

export interface CapitalMetric {
  type: 'CET1' | 'Tier1' | 'Total';
  current: number;
  required: number;
  buffer: number;
  trend: 'increasing' | 'decreasing' | 'stable';
}