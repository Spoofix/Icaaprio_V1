import React, { useState } from 'react';
import { Info, AlertTriangle } from 'lucide-react';

interface CreditCapitalProps {
  selectedStressLevel: 'moderate' | 'severe' | 'extreme';
}

export default function CreditCapital({ selectedStressLevel }: CreditCapitalProps) {
  const [capitalRequirement, setCapitalRequirement] = useState(8.00);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleCapitalRequirementChange = (value: string) => {
    const newValue = parseFloat(value);
    setCapitalRequirement(newValue);

    if (newValue < 8.00) {
      setShowWarning(true);
      setWarningMessage('Capital requirement cannot be below 8.00%');
    } else if (newValue > 10.50) {
      setShowWarning(true);
      setWarningMessage('Capital requirement above 10.50% may be overly conservative');
    } else {
      setShowWarning(false);
      setWarningMessage('');
    }
  };

  const formatNumber = (value: number) => {
    const inMillions = value / 1000000;
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(inMillions) + 'M';
  };

  const getStressLevelColor = (stress: string) => {
    switch (stress) {
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'severe':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300';
      case 'extreme':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      default:
        return '';
    }
  };

  const assetClasses = [
    { 
      id: 'sovereign', 
      name: 'Sovereign', 
      baseRiskWeight: 0, 
      stressedRiskWeight: 0, 
      exposure: 5000000000,
      stress: 'moderate'
    },
    { 
      id: 'pse', 
      name: 'PSE', 
      baseRiskWeight: 20, 
      stressedRiskWeight: 30, 
      exposure: 2000000000,
      stress: 'moderate'
    },
    { 
      id: 'bank', 
      name: 'Bank', 
      baseRiskWeight: 20, 
      stressedRiskWeight: 50, 
      exposure: 3000000000,
      stress: 'severe'
    },
    { 
      id: 'corporate', 
      name: 'Corporate', 
      baseRiskWeight: 100, 
      stressedRiskWeight: 150, 
      exposure: 10000000000,
      stress: 'severe'
    },
    { 
      id: 'retail', 
      name: 'Retail', 
      baseRiskWeight: 75, 
      stressedRiskWeight: 100, 
      exposure: 8000000000,
      stress: selectedStressLevel // Using the selected stress level from Retail tab
    },
    { 
      id: 'residential', 
      name: 'Residential Mortgage', 
      baseRiskWeight: 35, 
      stressedRiskWeight: 50, 
      exposure: 15000000000,
      stress: selectedStressLevel // Using the selected stress level from Retail tab
    },
    { 
      id: 'cre', 
      name: 'Commercial Real Estate', 
      baseRiskWeight: 100, 
      stressedRiskWeight: 150, 
      exposure: 7000000000,
      stress: 'extreme'
    },
    { 
      id: 'securitization', 
      name: 'Securitization', 
      baseRiskWeight: 50, 
      stressedRiskWeight: 75, 
      exposure: 1000000000,
      stress: 'severe'
    }
  ];

  const calculateTotalBaseRWA = () => {
    return assetClasses.reduce((total, asset) => 
      total + (asset.exposure * asset.baseRiskWeight / 100), 0
    );
  };

  const calculateTotalStressedRWA = () => {
    return assetClasses.reduce((total, asset) => 
      total + (asset.exposure * asset.stressedRiskWeight / 100), 0
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Capital calculation using stress scenario risk weights.
              All amounts are in millions of Canadian dollars.
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Asset Class</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Exposure</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Base RW%</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Base RWA</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stressed RW%</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stress</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Stressed RWA</th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {assetClasses.map((asset) => (
                <tr key={asset.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                    {asset.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {formatNumber(asset.exposure)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {asset.baseRiskWeight}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {formatNumber(asset.exposure * asset.baseRiskWeight / 100)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {asset.stressedRiskWeight}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStressLevelColor(asset.stress)}`}>
                      {asset.stress}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {formatNumber(asset.exposure * asset.stressedRiskWeight / 100)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Total RWA
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatNumber(calculateTotalBaseRWA())}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatNumber(calculateTotalStressedRWA())}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <span>Capital Required</span>
                    <input
                      type="number"
                      value={capitalRequirement}
                      onChange={(e) => handleCapitalRequirementChange(e.target.value)}
                      step="0.01"
                      min="0"
                      max="100"
                      className={`w-20 px-2 py-1 text-right border rounded-md ${
                        showWarning
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                          : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
                      } dark:bg-gray-700`}
                    />
                    <span>%</span>
                  </div>
                  {showWarning && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                      {warningMessage}
                    </p>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatNumber(calculateTotalBaseRWA() * (capitalRequirement / 100))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatNumber(calculateTotalStressedRWA() * (capitalRequirement / 100))}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Additional Capital Required
                </td>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600 dark:text-red-400">
                  {formatNumber((calculateTotalStressedRWA() - calculateTotalBaseRWA()) * (capitalRequirement / 100))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}