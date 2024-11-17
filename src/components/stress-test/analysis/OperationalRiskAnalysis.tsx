import React, { useState } from 'react';
import { Info, Plus, LineChart, ExternalLink } from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../../../utils/formatters';

const BIA_ALPHA = 0.15;

interface YearlyIncome {
  year: string;
  netInterestIncome: number;
  nonInterestIncome: number;
}

interface EditingData extends YearlyIncome {
  isEditing?: boolean;
}

export default function OperationalRiskAnalysis() {
  const [incomeData, setIncomeData] = useState<YearlyIncome[]>([
    { year: '2023', netInterestIncome: 1200000, nonInterestIncome: 800000 },
    { year: '2022', netInterestIncome: 1100000, nonInterestIncome: 750000 },
    { year: '2021', netInterestIncome: 1000000, nonInterestIncome: 700000 }
  ]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingData, setEditingData] = useState<EditingData | null>(null);

  const calculateGrossIncome = (data: YearlyIncome) => {
    return data.netInterestIncome + data.nonInterestIncome;
  };

  const calculateOperationalRiskCapital = () => {
    if (incomeData.length < 3) return 0;
    const avgGrossIncome = incomeData
      .slice(0, 3)
      .reduce((sum, data) => sum + calculateGrossIncome(data), 0) / 3;
    return avgGrossIncome * BIA_ALPHA;
  };

  const handleAddNewYear = () => {
    const lastYear = parseInt(incomeData[0].year);
    const newYear = {
      year: (lastYear + 1).toString(),
      netInterestIncome: 0,
      nonInterestIncome: 0,
      isEditing: true
    };
    setIncomeData([newYear, ...incomeData]);
    setEditingIndex(0);
    setEditingData(newYear);
  };

  const handleStartEdit = (index: number) => {
    setEditingIndex(index);
    setEditingData({ ...incomeData[index] });
  };

  const handleSaveEdit = () => {
    if (editingData && editingIndex !== null) {
      const { isEditing, ...dataToSave } = editingData;
      setIncomeData(prev => prev.map((item, i) => i === editingIndex ? dataToSave : item));
      setEditingIndex(null);
      setEditingData(null);
    }
  };

  const handleCancelEdit = () => {
    if (editingIndex === 0 && !incomeData[0].netInterestIncome && !incomeData[0].nonInterestIncome) {
      setIncomeData(prev => prev.slice(1));
    }
    setEditingIndex(null);
    setEditingData(null);
  };

  const handleInputChange = (field: keyof YearlyIncome, value: string) => {
    if (editingData) {
      setEditingData(prev => ({
        ...prev!,
        [field]: value === '' ? 0 : parseFloat(value) || 0
      }));
    }
  };

  const trendData = incomeData
    .slice()
    .reverse()
    .map(data => ({
      year: data.year,
      capital: calculateGrossIncome(data) * BIA_ALPHA
    }));

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Info className="w-5 h-5 text-blue-500 mt-0.5" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Using the Basic Indicator Approach (BIA) as defined in{' '}
              <a 
                href="https://www.osfi-bsif.gc.ca/Eng/fi-if/rg-ro/gdn-ort/gl-ld/Pages/CAR22_chpt7.aspx" 
                target="_blank" 
                rel="noopener noreferrer"
                className="underline hover:text-blue-600 dark:hover:text-blue-200 inline-flex items-center"
              >
                OSFI CAR Chapter 7
                <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </p>
            <blockquote className="mt-2 text-sm text-blue-700 dark:text-blue-300 border-l-4 border-blue-300 dark:border-blue-600 pl-3 italic">
              "Under BIA, the operational risk capital charge is equal to 15% of average annual gross income over the previous three years."
            </blockquote>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Historical Income Data</h3>
          {editingIndex === null && (
            <button
              onClick={handleAddNewYear}
              className="flex items-center px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-md hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 dark:hover:bg-blue-900/50"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Year
            </button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Year</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Net Interest Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Non-Interest Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Gross Income</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Operational Risk Capital</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {incomeData.map((data, index) => (
                <tr key={data.year}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {editingIndex === index ? (
                      <input
                        type="text"
                        value={data.year}
                        readOnly
                        className="w-20 px-2 py-1 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md"
                      />
                    ) : (
                      data.year
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editingData?.netInterestIncome || ''}
                        onChange={(e) => handleInputChange('netInterestIncome', e.target.value)}
                        className="w-32 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    ) : (
                      formatCurrency(data.netInterestIncome)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {editingIndex === index ? (
                      <input
                        type="number"
                        value={editingData?.nonInterestIncome || ''}
                        onChange={(e) => handleInputChange('nonInterestIncome', e.target.value)}
                        className="w-32 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    ) : (
                      formatCurrency(data.nonInterestIncome)
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(calculateGrossIncome(data))}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {formatCurrency(calculateGrossIncome(data) * BIA_ALPHA)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                    {editingIndex === index ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={handleSaveEdit}
                          className="text-green-600 hover:text-green-700 dark:text-green-400"
                        >
                          Save
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleStartEdit(index)}
                        disabled={editingIndex !== null}
                        className="text-blue-600 hover:text-blue-700 dark:text-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Edit
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
          Operational Risk Capital Trend
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsLineChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis
                tickFormatter={(value) => `${formatCurrency(value)}`}
              />
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), 'Operational Risk Capital']}
              />
              <Line
                type="monotone"
                dataKey="capital"
                stroke="#3B82F6"
                strokeWidth={2}
                dot={{ r: 4 }}
              />
            </RechartsLineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}