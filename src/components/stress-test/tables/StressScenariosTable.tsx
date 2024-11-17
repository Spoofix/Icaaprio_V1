import React from 'react';
import { Info } from 'lucide-react';

interface ScenarioData {
  indicator: string;
  baseCase: number;
  moderateStress: number;
  severeStress: number;
  historicalWorst: {
    value: number;
    event: string;
    year: string;
  };
}

interface StressScenariosTableProps {
  data: ScenarioData[];
  onValueChange: (index: number, field: 'baseCase' | 'moderateStress' | 'severeStress', value: number) => void;
  isEditable?: boolean;
}

export default function StressScenariosTable({ data, onValueChange, isEditable = true }: StressScenariosTableProps) {
  const getStressColor = (type: 'moderate' | 'severe' | 'historical') => {
    switch (type) {
      case 'moderate':
        return 'text-yellow-500 dark:text-yellow-400';
      case 'severe':
        return 'text-red-500 dark:text-red-400';
      case 'historical':
        return 'text-blue-500 dark:text-blue-400';
      default:
        return '';
    }
  };

  const renderEditableCell = (
    value: number,
    index: number,
    field: 'baseCase' | 'moderateStress' | 'severeStress',
    stressType?: 'moderate' | 'severe'
  ) => {
    return isEditable ? (
      <input
        type="number"
        value={value}
        onChange={(e) => onValueChange(index, field, parseFloat(e.target.value) || 0)}
        step="0.1"
        className={`w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
          dark:bg-gray-700 ${stressType ? getStressColor(stressType) : ''}`}
      />
    ) : (
      <span className={stressType ? getStressColor(stressType) : ''}>
        {value}
      </span>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr className="bg-gray-50 dark:bg-gray-800">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Indicator
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Base Case
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Moderate Stress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Severe Stress
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              Historical Worst
            </th>
          </tr>
        </thead>
        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {row.indicator}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">
                {renderEditableCell(row.baseCase, index, 'baseCase')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {renderEditableCell(row.moderateStress, index, 'moderateStress', 'moderate')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                {renderEditableCell(row.severeStress, index, 'severeStress', 'severe')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">
                <div className="flex items-center space-x-2">
                  <span className={getStressColor('historical')}>
                    {row.historicalWorst.value}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    ({row.historicalWorst.event}, {row.historicalWorst.year})
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}