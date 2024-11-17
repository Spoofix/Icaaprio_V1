import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Info } from 'lucide-react';

interface CreditScoreTransitionProps {
  macroFactors: {
    gdpChange: number;
    unemploymentChange: number;
    housePriceChange: number;
  };
}

export function CreditScoreTransition({ macroFactors }: CreditScoreTransitionProps) {
  // Credit Score Migration Model
  // Based on research papers and industry practices:
  // 1. GDP impact: ~2-3 point score reduction per 1% GDP decline
  // 2. Unemployment: ~5-7 point reduction per 1% unemployment increase
  // 3. House prices: ~3-4 point reduction per 5% house price decline
  
  const calculateScoreImpact = (
    originalScore: number,
    gdpChange: number,
    unemploymentChange: number,
    housePriceChange: number
  ) => {
    const gdpImpact = gdpChange < 0 ? gdpChange * 2.5 : gdpChange * 1;
    const unemploymentImpact = unemploymentChange > 0 ? unemploymentChange * -6 : unemploymentChange * -2;
    const hpiImpact = housePriceChange < 0 ? (housePriceChange / 5) * -3.5 : (housePriceChange / 5) * 1;
    
    const totalImpact = gdpImpact + unemploymentImpact + hpiImpact;
    return Math.max(300, Math.min(850, originalScore + totalImpact));
  };

  // Generate transition data for different score bands
  const generateTransitionData = () => {
    const scoreBands = [
      { band: '800+', baseScore: 820 },
      { band: '750-799', baseScore: 775 },
      { band: '700-749', baseScore: 725 },
      { band: '650-699', baseScore: 675 },
      { band: '600-649', baseScore: 625 },
      { band: '<600', baseScore: 575 }
    ];

    return scoreBands.map(({ band, baseScore }) => ({
      band,
      baseScore,
      moderateStress: calculateScoreImpact(
        baseScore,
        macroFactors.gdpChange * 0.5,
        macroFactors.unemploymentChange * 0.5,
        macroFactors.housePriceChange * 0.5
      ),
      severeStress: calculateScoreImpact(
        baseScore,
        macroFactors.gdpChange,
        macroFactors.unemploymentChange,
        macroFactors.housePriceChange
      ),
      extremeStress: calculateScoreImpact(
        baseScore,
        macroFactors.gdpChange * 1.5,
        macroFactors.unemploymentChange * 1.5,
        macroFactors.housePriceChange * 1.5
      )
    }));
  };

  const transitionData = generateTransitionData();

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="group relative">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white flex items-center">
            Credit Score Migration Analysis
            <Info className="w-5 h-5 ml-2 text-gray-400" />
          </h3>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute z-10 bg-gray-900 text-white p-3 rounded text-sm w-80">
            Score migration based on:
            • GDP elasticity: ~2.5 points per 1% decline
            • Unemployment sensitivity: ~6 points per 1% increase
            • Housing price impact: ~3.5 points per 5% decline
          </div>
        </div>
      </div>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={transitionData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="band" />
            <YAxis domain={[300, 850]} />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="baseScore" 
              name="Base Score" 
              stroke="#3B82F6" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="moderateStress" 
              name="Moderate Stress" 
              stroke="#F59E0B" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="severeStress" 
              name="Severe Stress" 
              stroke="#EF4444" 
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="extremeStress" 
              name="Extreme Stress" 
              stroke="#7C3AED" 
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
        <div className="text-sm text-blue-700 dark:text-blue-300">
          <p className="font-medium">Score Migration Factors:</p>
          <ul className="mt-2 list-disc list-inside">
            <li>GDP Change: {macroFactors.gdpChange}% ({(macroFactors.gdpChange * 2.5).toFixed(1)} point impact)</li>
            <li>Unemployment: {macroFactors.unemploymentChange}% ({(macroFactors.unemploymentChange * -6).toFixed(1)} point impact)</li>
            <li>House Prices: {macroFactors.housePriceChange}% ({((macroFactors.housePriceChange / 5) * -3.5).toFixed(1)} point impact)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}