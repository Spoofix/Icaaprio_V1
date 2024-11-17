import React, { useState } from 'react';
import MaterialRiskAssessment from './MaterialRiskAssessment';
import RiskAnalysis from './analysis/RiskAnalysis';
import MacroHistoricalAnalysis from './MacroHistoricalAnalysis';
import ValidationSummary from './ValidationSummary';

export default function StressTestForm() {
  const [activeTab, setActiveTab] = useState('material');
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  // Store risk data even when toggled off
  const [riskData, setRiskData] = useState<{ [key: string]: any }>({});

  const tabs = [
    { id: 'material', label: 'Material Risks' },
    { id: 'macro', label: 'Macro Analysis' },
    { id: 'analysis', label: 'Risk Analysis' },
    { id: 'validation', label: 'Validation' }
  ];

  const handleRiskSelectionChange = (risks: string[]) => {
    setSelectedRisks(risks);
  };

  const handleRiskDataUpdate = (riskId: string, data: any) => {
    setRiskData(prev => ({
      ...prev,
      [riskId]: data
    }));
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ICAAP Assessment</h2>
          </div>
        </div>

        <div className="border-b border-gray-200 dark:border-gray-700">
          <nav className="flex -mb-px overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-sm font-medium border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'material' && (
            <MaterialRiskAssessment 
              onRiskSelectionChange={handleRiskSelectionChange}
              selectedRisks={selectedRisks}
            />
          )}
          {activeTab === 'macro' && <MacroHistoricalAnalysis />}
          {activeTab === 'analysis' && (
            <RiskAnalysis 
              selectedRisks={selectedRisks}
              riskData={riskData}
              onRiskDataUpdate={handleRiskDataUpdate}
            />
          )}
          {activeTab === 'validation' && <ValidationSummary />}
        </div>
      </div>
    </div>
  );
}