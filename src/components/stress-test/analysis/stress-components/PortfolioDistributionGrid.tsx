import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Area, ComposedChart } from 'recharts';
import { Info, AlertTriangle } from 'lucide-react';

interface PortfolioDistributionGridProps {
  selectedPortfolio: string;
  actualPortfolioData: {
    creditScoreDistribution: Array<{
      score: string;
      percentage: number;
      count: number;
    }>;
    ltvDistribution: Array<{
      range: string;
      percentage: number;
      count: number;
    }>;
    totalExposure: number;
    totalAccounts: number;
  };
}

export default function PortfolioDistributionGrid({ selectedPortfolio, actualPortfolioData }: PortfolioDistributionGridProps) {
  // Combine actual data with benchmark and stress scenarios
  const benchmarkData = {
    creditScore: actualPortfolioData.creditScoreDistribution.map(item => ({
      score: item.score,
      actual: item.percentage,
      benchmark: item.score === '800+' ? 25 : 
                item.score === '750-799' ? 30 :
                item.score === '700-749' ? 25 :
                item.score === '650-699' ? 15 : 5,
      moderate: item.score === '800+' ? 20 :
                item.score === '750-799' ? 25 :
                item.score === '700-749' ? 30 :
                item.score === '650-699' ? 20 : 5,
      severe: item.score === '800+' ? 15 :
              item.score === '750-799' ? 20 :
              item.score === '700-749' ? 35 :
              item.score === '650-699' ? 25 : 5,
      extreme: item.score === '800+' ? 10 :
               item.score === '750-799' ? 15 :
               item.score === '700-749' ? 40 :
               item.score === '650-699' ? 30 : 5,
      count: item.count
    })),
    ltv: actualPortfolioData.ltvDistribution.map(item => ({
      range: item.range,
      actual: item.percentage,
      benchmark: item.range === '<50%' ? 20 :
                item.range === '50-60%' ? 25 :
                item.range === '60-70%' ? 30 :
                item.range === '70-80%' ? 20 : 5,
      moderate: item.range === '<50%' ? 15 :
                item.range === '50-60%' ? 20 :
                item.range === '60-70%' ? 35 :
                item.range === '70-80%' ? 25 : 5,
      severe: item.range === '<50%' ? 10 :
              item.range === '50-60%' ? 15 :
              item.range === '60-70%' ? 40 :
              item.range === '70-80%' ? 30 : 5,
      extreme: item.range === '<50%' ? 5 :
               item.range === '50-60%' ? 10 :
               item.range === '60-70%' ? 45 :
               item.range === '70-80%' ? 35 : 5,
      count: item.count
    }))
  };

  const renderChart = (data: any[], xKey: string, title: string, recommendation: string, description: string) => (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex justify-between items-start mb-4">
        <div className="group relative">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white flex items-center cursor-help">
            {title}
            <Info className="w-4 h-4 ml-2 text-gray-400" />
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-2 rounded text-sm w-64">
            {description}
          </div>
        </div>
        <div className="flex items-center">
          <Info className="w-4 h-4 text-blue-500 mr-1" />
          <span className="text-xs text-blue-600 dark:text-blue-400">
            Recommended: {recommendation}
          </span>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey={xKey}
              label={{ 
                value: xKey === 'score' ? 'Credit Score Range' : 'Loan-to-Value Ratio (%)',
                position: 'bottom',
                offset: -5
              }}
            />
            <YAxis
              label={{ 
                value: 'Portfolio Distribution (%)',
                angle: -90,
                position: 'insideLeft',
                offset: 10
              }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => {
                if (name === 'benchmark') return [`${value}% (Industry)`, 'Industry Benchmark'];
                if (name === 'actual') return [`${value}% (Your Portfolio)`, 'Your Portfolio'];
                return [`${value}%`, name];
              }}
            />
            <Legend />
            <Line type="monotone" dataKey="benchmark" name="Industry Benchmark" stroke="#94A3B8" strokeDasharray="5 5" />
            <Area type="monotone" dataKey="actual" name="Your Portfolio" fill="#3B82F6" fillOpacity={0.3} stroke="#3B82F6" />
            <Line type="monotone" dataKey="moderate" name="Moderate Stress" stroke="#F59E0B" />
            <Line type="monotone" dataKey="severe" name="Severe Stress" stroke="#EF4444" />
            <Line type="monotone" dataKey="extreme" name="Extreme Stress" stroke="#7C3AED" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
        <div className="text-sm text-amber-800 dark:text-amber-200">
          <p className="font-medium mb-2">Key Observations:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your portfolio shows {data[0].actual > data[0].benchmark ? 'higher' : 'lower'} concentration in high-quality ranges</li>
            <li>Stress scenarios indicate potential migration to {xKey === 'score' ? 'lower scores' : 'higher LTV ranges'}</li>
            <li>Industry benchmark suggests {data[0].actual > data[0].benchmark ? 'more conservative' : 'typical'} risk profile</li>
          </ul>
        </div>
      </div>

      {data.some(item => Math.abs((item.actual || 0) - item.benchmark) > 10) && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3" />
            <div className="text-sm text-red-800 dark:text-red-200">
              <p className="font-medium">Notable Deviations:</p>
              <ul className="mt-2 list-disc list-inside">
                {data
                  .filter(item => Math.abs((item.actual || 0) - item.benchmark) > 10)
                  .map((item, index) => (
                    <li key={index}>
                      {`${item[xKey]} range is ${Math.abs((item.actual || 0) - item.benchmark).toFixed(1)}% ${
                        (item.actual || 0) > item.benchmark ? 'higher' : 'lower'
                      } than industry benchmark`}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {selectedPortfolio === 'retail' && (
        <>
          {renderChart(
            benchmarkData.creditScore,
            'score',
            'Credit Quality Distribution',
            'Severe',
            'Distribution based on credit bureau scores and odds ratios. Migration patterns validated against historical stress events.'
          )}
          {renderChart(
            benchmarkData.ltv,
            'range',
            'LTV Distribution',
            'Extreme',
            'LTV distribution reflecting collateral value changes under stress scenarios.'
          )}
        </>
      )}
    </div>
  );
}