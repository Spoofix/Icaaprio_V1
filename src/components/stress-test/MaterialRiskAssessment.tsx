import React, { useState, useEffect } from 'react';
import { Building2, Users, AlertTriangle, Info } from 'lucide-react';

interface MaterialRiskAssessmentProps {
  selectedRisks: string[];
  onRiskSelectionChange: (risks: string[]) => void;
  savedData?: any;
  onSave?: (data: any) => void;
}

const mandatoryRisks = [
  {
    id: 'credit',
    name: 'Credit Risk',
    icon: AlertTriangle,
    description: 'Risk of loss from borrower default',
    examples: [
      'Loan defaults',
      'Counterparty failure',
      'Credit rating downgrades'
    ]
  },
  {
    id: 'market',
    name: 'Market Risk',
    icon: AlertTriangle,
    description: 'Risk from market price movements',
    examples: [
      'Interest rate changes',
      'FX rate fluctuations',
      'Equity price changes'
    ]
  },
  {
    id: 'operational',
    name: 'Operational Risk',
    icon: AlertTriangle,
    description: 'Risk from operations and processes',
    examples: [
      'System failures',
      'Process errors',
      'External events'
    ]
  },
  {
    id: 'liquidity',
    name: 'Liquidity Risk',
    icon: AlertTriangle,
    description: 'Risk of insufficient liquidity',
    examples: [
      'Funding gaps',
      'Market liquidity',
      'Asset-liability mismatch'
    ]
  },
  {
    id: 'interest_rate',
    name: 'Interest Rate Risk',
    icon: AlertTriangle,
    description: 'Risk from interest rate changes',
    examples: [
      'Gap risk',
      'Basis risk',
      'Option risk'
    ]
  }
];

const optionalRisks = [
  {
    id: 'strategic',
    name: 'Strategic Risk',
    icon: Building2,
    description: 'Risk from business decisions',
    examples: [
      'Business model changes',
      'Competitive pressures',
      'Economic conditions'
    ]
  },
  {
    id: 'regulatory',
    name: 'Regulatory Risk',
    icon: Users,
    description: 'Risk from regulatory changes',
    examples: [
      'New regulations',
      'Compliance failures',
      'Regulatory penalties'
    ]
  },
  {
    id: 'reputational',
    name: 'Reputational Risk',
    icon: AlertTriangle,
    description: 'Risk of loss due to reputation damage',
    examples: [
      'Negative publicity',
      'Customer complaints',
      'Social media impact'
    ]
  },
  {
    id: 'environmental',
    name: 'Environmental Risk',
    icon: AlertTriangle,
    description: 'Risk from environmental factors',
    examples: [
      'Climate change impact',
      'Environmental regulations',
      'Natural disasters'
    ]
  },
  {
    id: 'technology',
    name: 'Technology Risk',
    icon: AlertTriangle,
    description: 'Risk from technology failures',
    examples: [
      'Cyber attacks',
      'IT system failures',
      'Data breaches'
    ]
  },
  {
    id: 'model',
    name: 'Model Risk',
    icon: AlertTriangle,
    description: 'Risk from model errors',
    examples: [
      'Model validation issues',
      'Parameter uncertainty',
      'Model assumptions'
    ]
  },
  {
    id: 'concentration',
    name: 'Concentration Risk',
    icon: AlertTriangle,
    description: 'Risk from concentrated exposures',
    examples: [
      'Single name concentration',
      'Sector concentration',
      'Geographic concentration'
    ]
  },
  {
    id: 'conduct',
    name: 'Conduct Risk',
    icon: AlertTriangle,
    description: 'Risk from misconduct',
    examples: [
      'Mis-selling',
      'Market manipulation',
      'Unfair treatment'
    ]
  }
];

export default function MaterialRiskAssessment({ 
  selectedRisks,
  onRiskSelectionChange,
  savedData,
  onSave
}: MaterialRiskAssessmentProps) {
  const [localSelectedRisks, setLocalSelectedRisks] = useState<string[]>(selectedRisks);

  // Load saved data when available
  useEffect(() => {
    if (savedData?.selectedRisks) {
      setLocalSelectedRisks(savedData.selectedRisks);
    }
  }, [savedData]);

  // Update parent and save when local state changes
  useEffect(() => {
    const currentRisks = [...localSelectedRisks].sort().join(',');
    const previousRisks = [...selectedRisks].sort().join(',');
    
    if (currentRisks !== previousRisks) {
      onRiskSelectionChange(localSelectedRisks);
      if (onSave) {
        onSave({
          selectedRisks: localSelectedRisks,
          timestamp: new Date().toISOString()
        });
      }
    }
  }, [localSelectedRisks, onRiskSelectionChange, onSave, selectedRisks]);

  const handleRiskToggle = (riskId: string) => {
    setLocalSelectedRisks(prev => {
      if (prev.includes(riskId)) {
        return prev.filter(id => id !== riskId);
      }
      return [...prev, riskId];
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Select the material risks applicable to your institution. Mandatory risks cannot be deselected.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Mandatory Risks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mandatoryRisks.map((risk) => {
              const Icon = risk.icon;
              return (
                <div
                  key={risk.id}
                  className="p-4 rounded-lg border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/30"
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-blue-500" />
                    <h4 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                      {risk.name}
                    </h4>
                  </div>
                  <p className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                    {risk.description}
                  </p>
                  <ul className="mt-2 text-sm text-blue-600 dark:text-blue-400 list-disc list-inside">
                    {risk.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Optional Risks
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optionalRisks.map((risk) => {
              const Icon = risk.icon;
              const isSelected = localSelectedRisks.includes(risk.id);
              return (
                <button
                  key={risk.id}
                  onClick={() => handleRiskToggle(risk.id)}
                  className={`p-4 rounded-lg border text-left transition-colors ${
                    isSelected
                      ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/30'
                      : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-5 h-5 ${
                      isSelected ? 'text-green-500' : 'text-gray-400'
                    }`} />
                    <h4 className={`text-sm font-medium ${
                      isSelected
                        ? 'text-green-900 dark:text-green-100'
                        : 'text-gray-900 dark:text-white'
                    }`}>
                      {risk.name}
                    </h4>
                  </div>
                  <p className={`mt-2 text-sm ${
                    isSelected
                      ? 'text-green-700 dark:text-green-300'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {risk.description}
                  </p>
                  <ul className={`mt-2 text-sm list-disc list-inside ${
                    isSelected
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-gray-500 dark:text-gray-400'
                  }`}>
                    {risk.examples.map((example, index) => (
                      <li key={index}>{example}</li>
                    ))}
                  </ul>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}