import React, { useState, useEffect } from 'react';
import { Building2, Users, CreditCard, Activity, Shield, Wallet, Percent } from 'lucide-react';
import CreditRiskAnalysis from './analysis/CreditRiskAnalysis';
import MarketRiskAnalysis from './analysis/MarketRiskAnalysis';
import OperationalRiskAnalysis from './analysis/OperationalRiskAnalysis';
import LiquidityRiskAnalysis from './analysis/LiquidityRiskAnalysis';
import InterestRateRiskAnalysis from './analysis/InterestRateRiskAnalysis';

interface RiskAnalysisProps {
  selectedRisks: string[];
}

const mandatoryRisks = [
  {
    id: 'credit',
    name: 'Credit Risk',
    icon: CreditCard,
    description: 'Analysis of credit portfolio quality and concentrations',
    mandatory: true
  },
  {
    id: 'market',
    name: 'Market Risk',
    icon: Activity,
    description: 'Analysis of trading book positions and market exposures',
    mandatory: true
  },
  {
    id: 'operational',
    name: 'Operational Risk',
    icon: Shield,
    description: 'Analysis of operational loss events and risk indicators',
    mandatory: true
  },
  {
    id: 'liquidity',
    name: 'Liquidity Risk',
    icon: Wallet,
    description: 'Analysis of funding sources and liquidity positions',
    mandatory: true
  },
  {
    id: 'interest_rate',
    name: 'Interest Rate Risk',
    icon: Percent,
    description: 'Analysis of interest rate sensitive positions',
    mandatory: true
  }
];

const optionalRisks = {
  strategic: {
    id: 'strategic',
    name: 'Strategic Risk',
    icon: Building2,
    description: 'Analysis of business strategy and market position'
  },
  regulatory: {
    id: 'regulatory',
    name: 'Regulatory Risk',
    icon: Users,
    description: 'Analysis of regulatory compliance and changes'
  }
};

export default function RiskAnalysis({ selectedRisks }: RiskAnalysisProps) {
  const [selectedDomain, setSelectedDomain] = useState('credit');

  const availableRisks = [
    ...mandatoryRisks,
    ...selectedRisks
      .filter(riskId => optionalRisks[riskId as keyof typeof optionalRisks])
      .map(riskId => optionalRisks[riskId as keyof typeof optionalRisks])
      .filter(Boolean)
  ];

  useEffect(() => {
    const isCurrentDomainAvailable = availableRisks.some(risk => risk.id === selectedDomain);
    if (!isCurrentDomainAvailable) {
      setSelectedDomain('credit');
    }
  }, [selectedRisks]);

  const renderRiskContent = () => {
    switch (selectedDomain) {
      case 'credit':
        return <CreditRiskAnalysis />;
      case 'market':
        return <MarketRiskAnalysis />;
      case 'operational':
        return <OperationalRiskAnalysis />;
      case 'liquidity':
        return <LiquidityRiskAnalysis />;
      case 'interest_rate':
        return <InterestRateRiskAnalysis />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {availableRisks.map((risk) => {
          const Icon = risk.icon;
          return (
            <button
              key={risk.id}
              onClick={() => setSelectedDomain(risk.id)}
              className={`p-4 rounded-lg border ${
                selectedDomain === risk.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <Icon className="w-6 h-6" />
                <span className="text-sm font-medium">{risk.name}</span>
                {risk.mandatory && (
                  <span className="text-xs text-blue-600 dark:text-blue-400">Mandatory</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {renderRiskContent()}
    </div>
  );
}