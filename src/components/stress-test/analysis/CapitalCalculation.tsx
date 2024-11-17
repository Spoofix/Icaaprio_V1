import React, { useState } from 'react';
import { Info } from 'lucide-react';
import { formatCurrency } from '../../../utils/formatters';

interface AssetClass {
  id: string;
  name: string;
  exposure: number;
  baseRiskWeight: number;
  stressedRiskWeight: number;
  stressLevel: 'moderate' | 'severe' | 'extreme';
}

export default function CapitalCalculation() {
  const [capitalRequirement, setCapitalRequirement] = useState(8.00);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const assetClasses: AssetClass[] = [
    { id: 'sovereign', name: 'Sovereign', exposure: 5000000000, baseRiskWeight: 0, stressedRiskWeight: 0, stressLevel: 'moderate' },
    { id: 'pse', name: 'PSE', exposure: 2000000000, baseRiskWeight: 20, stressedRiskWeight: 30, stressLevel: 'moderate' },
    { id: 'bank', name: 'Bank', exposure: 3000000000, baseRiskWeight: 20, stressedRiskWeight: 50, stressLevel: 'severe' },
    { id: 'corporate', name: 'Corporate', exposure: 10000000000, baseRiskWeight: 100, stressedRiskWeight: 150, stressLevel: 'severe' },
    { id: 'retail', name: 'Retail', exposure: 8000000000, baseRiskWeight: 75, stressedRiskWeight: 100, stressLevel: 'moderate' },
    { id: 'residential', name: 'Residential Mortgage', exposure: 15000000000, baseRiskWeight: 35, stressedRiskWeight: 50, stressLevel: 'moderate' },
    { id: 'cre', name: 'Commercial Real Estate', exposure: 7000000000, baseRiskWeight: 100, stressedRiskWeight: 150, stressLevel: 'extreme' },
    { id: 'securitization', name: 'Securitization', exposure: 1000000000, baseRiskWeight: 50, stressedRiskWeight: 75, stressLevel: 'severe' }
  ];

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

  const calculateBaseRWA = (asset: AssetClass) => {
    return (asset.exposure * asset.baseRiskWeight) / 100;
  };

  const calculateStressedRWA = (asset: AssetClass) => {
    return (asset.exposure * asset.stressedRiskWeight) / 100;
  };

  const totalBaseRWA = assetClasses.reduce((sum, asset) => sum + calculateBaseRWA(asset), 0);
  const totalStressedRWA = assetClasses.reduce((sum, asset) => sum + calculateStressedRWA(asset), 0);

  const getStressLevelColor = (level: string) => {
    switch (level) {
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

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <p className="text-sm text-blue-700 dark:text-blue-300">
            Capital calculation using stress scenario risk weights. All amounts are in millions of Canadian dollars.
          </p>
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
                    {formatCurrency(asset.exposure)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {asset.baseRiskWeight}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {formatCurrency(calculateBaseRWA(asset))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {asset.stressedRiskWeight}%
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium capitalize ${getStressLevelColor(asset.stressLevel)}`}>
                      {asset.stressLevel}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-gray-900 dark:text-white">
                    {formatCurrency(calculateStressedRWA(asset))}
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
                  {formatCurrency(totalBaseRWA)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatCurrency(totalStressedRWA)}
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
                  {formatCurrency(totalBaseRWA * (capitalRequirement / 100))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white"></td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-gray-900 dark:text-white">
                  {formatCurrency(totalStressedRWA * (capitalRequirement / 100))}
                </td>
              </tr>
              <tr>
                <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                  Additional Capital Required
                </td>
                <td colSpan={4} className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-red-600 dark:text-red-400">
                  {formatCurrency((totalStressedRWA - totalBaseRWA) * (capitalRequirement / 100))}
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}