import { MacroFactors } from '../stress-test/analysis/monte-carlo/MonteCarloUtils';

interface StressTestResult {
  capitalRatio: number;
  riskWeightedAssets: number;
  netIncome: number;
  provisions: number;
}

export function calculateStressTest(
  baselineMetrics: {
    capitalRatio: number;
    rwa: number;
    netIncome: number;
    provisions: number;
  },
  macroFactors: MacroFactors
): StressTestResult {
  // GDP impact on earnings
  const gdpImpact = macroFactors.gdpChange < 0 ? macroFactors.gdpChange * 2.5 : macroFactors.gdpChange;
  
  // Unemployment impact on provisions
  const unemploymentImpact = macroFactors.unemploymentChange > 0 
    ? macroFactors.unemploymentChange * 6 
    : macroFactors.unemploymentChange * 2;
  
  // House price impact on RWA
  const hpiImpact = macroFactors.housePriceChange < 0 
    ? (macroFactors.housePriceChange / 5) * 3.5 
    : (macroFactors.housePriceChange / 5);
  
  // Calculate stressed metrics
  const stressedNetIncome = baselineMetrics.netIncome * (1 + gdpImpact / 100);
  const stressedProvisions = baselineMetrics.provisions * (1 + unemploymentImpact / 100);
  const stressedRWA = baselineMetrics.rwa * (1 - hpiImpact / 100);
  const stressedCapitalRatio = baselineMetrics.capitalRatio - 
    (stressedProvisions - baselineMetrics.provisions) / stressedRWA;

  return {
    capitalRatio: stressedCapitalRatio,
    riskWeightedAssets: stressedRWA,
    netIncome: stressedNetIncome,
    provisions: stressedProvisions
  };
}

export function analyzeCapitalAdequacy(
  currentMetrics: {
    cet1: number;
    tier1: number;
    totalCapital: number;
    rwa: number;
  },
  regulatoryMinimums: {
    cet1Min: number;
    tier1Min: number;
    totalCapitalMin: number;
  }
): {
  adequacyStatus: 'adequate' | 'warning' | 'inadequate';
  buffers: {
    cet1Buffer: number;
    tier1Buffer: number;
    totalCapitalBuffer: number;
  };
  recommendations: string[];
} {
  // Calculate current ratios
  const cet1Ratio = (currentMetrics.cet1 / currentMetrics.rwa) * 100;
  const tier1Ratio = (currentMetrics.tier1 / currentMetrics.rwa) * 100;
  const totalCapitalRatio = (currentMetrics.totalCapital / currentMetrics.rwa) * 100;

  // Calculate buffers
  const cet1Buffer = cet1Ratio - regulatoryMinimums.cet1Min;
  const tier1Buffer = tier1Ratio - regulatoryMinimums.tier1Min;
  const totalCapitalBuffer = totalCapitalRatio - regulatoryMinimums.totalCapitalMin;

  // Determine adequacy status
  let adequacyStatus: 'adequate' | 'warning' | 'inadequate' = 'adequate';
  const recommendations: string[] = [];

  if (cet1Buffer < 0 || tier1Buffer < 0 || totalCapitalBuffer < 0) {
    adequacyStatus = 'inadequate';
    recommendations.push('Immediate capital raising required');
    recommendations.push('Review dividend policy');
    recommendations.push('Implement capital conservation measures');
  } else if (cet1Buffer < 2.5 || tier1Buffer < 2.5 || totalCapitalBuffer < 2.5) {
    adequacyStatus = 'warning';
    recommendations.push('Consider capital strengthening options');
    recommendations.push('Review growth plans');
    recommendations.push('Enhance capital planning');
  } else {
    recommendations.push('Maintain current capital management practices');
    recommendations.push('Regular monitoring of capital ratios');
    recommendations.push('Update stress testing scenarios');
  }

  return {
    adequacyStatus,
    buffers: {
      cet1Buffer,
      tier1Buffer,
      totalCapitalBuffer
    },
    recommendations
  };
}