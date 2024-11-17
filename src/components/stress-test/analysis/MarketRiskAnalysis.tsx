import React, { useState } from 'react';
import { Info } from 'lucide-react';
import ForexRiskAnalysis from './market-risk/risk-types/ForexRiskAnalysis';
import EquityRiskAnalysis from './market-risk/risk-types/EquityRiskAnalysis';
import MembershipEquityAnalysis from './market-risk/risk-types/MembershipEquityAnalysis';
import MarketRiskSummary from './market-risk/summary/MarketRiskSummary';

interface RiskSelection {
  forex: boolean;
  equity: boolean;
  membership: boolean;
}

interface MarketRiskAnalysisProps {
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
    interestRateChange: number;
  };
}

export default function MarketRiskAnalysis({ macroFactors }: MarketRiskAnalysisProps) {
  const [selectedRisks, setSelectedRisks] = useState<RiskSelection>({
    forex: false,
    equity: false,
    membership: false
  });

  const [results, setResults] = useState<{
    forex?: any;
    equity?: any;
    membership?: any;
  }>({});

  const handleRiskToggle = (riskType: keyof RiskSelection) => {
    setSelectedRisks(prev => ({
      ...prev,
      [riskType]: !prev[riskType]
    }));
  };

  const handleResultsUpdate = (riskType: keyof RiskSelection, data: any) => {
    setResults(prev => ({
      ...prev,
      [riskType]: data
    }));
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Select applicable market risk types and upload corresponding data:
            </p>
            <ul className="mt-2 text-sm text-blue-700 dark:text-blue-300 list-disc list-inside">
              <li>Forex Risk - Currency exposures and sensitivities</li>
              <li>Equity Risk - Trading book equity positions</li>
              <li>Membership Equity - Non-trading equity exposures</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { key: 'forex', label: 'Forex Risk' },
          { key: 'equity', label: 'Equity Risk' },
          { key: 'membership', label: 'Membership Equity' }
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => handleRiskToggle(key as keyof RiskSelection)}
            className={`p-4 rounded-lg border ${
              selectedRisks[key as keyof RiskSelection]
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                : 'border-gray-200 dark:border-gray-700 hover:border-blue-500'
            }`}
          >
            <span className="text-sm font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="space-y-6">
        {selectedRisks.forex && (
          <ForexRiskAnalysis
            onResultsUpdate={(data) => handleResultsUpdate('forex', data)}
            macroFactors={macroFactors}
          />
        )}
        {selectedRisks.equity && (
          <EquityRiskAnalysis
            onResultsUpdate={(data) => handleResultsUpdate('equity', data)}
            macroFactors={macroFactors}
          />
        )}
        {selectedRisks.membership && (
          <MembershipEquityAnalysis
            onResultsUpdate={(data) => handleResultsUpdate('membership', data)}
            macroFactors={macroFactors}
          />
        )}
      </div>

      {Object.keys(results).length > 0 && (
        <MarketRiskSummary results={results} />
      )}
    </div>
  );
}