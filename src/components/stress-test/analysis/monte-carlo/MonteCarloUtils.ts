import { jStat } from 'jstat';

export interface MacroFactors {
  gdpChange: number;
  unemploymentChange: number;
  housePriceChange: number;
  interestRateChange: number;
}

export interface SimulationResults {
  results: number[];
  distribution: {
    pnl: number;
    frequency: number;
  }[];
  stressLevels: {
    var95: number;
    var99: number;
    var9999: number;
  };
}

export function generateCorrelatedRandoms(means: number[], correlationMatrix: number[][], iterations: number): number[][] {
  const n = means.length;
  const results: number[][] = [];

  for (let i = 0; i < iterations; i++) {
    // Generate independent standard normal random variables
    const z = Array(n).fill(0).map(() => jStat.normal.sample(0, 1));
    
    // Apply Cholesky decomposition for correlation
    const correlated = Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      for (let k = 0; k <= j; k++) {
        correlated[j] += correlationMatrix[j][k] * z[k];
      }
    }

    // Apply means and standard deviations
    const scenario = correlated.map((value, index) => value + means[index]);
    results.push(scenario);
  }

  return results;
}

export function calculateConfidenceInterval(data: number[], confidence: number): {
  lower: number;
  median: number;
  upper: number;
} {
  const sorted = [...data].sort((a, b) => a - b);
  const n = sorted.length;
  const lowerIndex = Math.floor(n * ((1 - confidence) / 2));
  const upperIndex = Math.floor(n * (1 - (1 - confidence) / 2));
  const medianIndex = Math.floor(n / 2);

  return {
    lower: sorted[lowerIndex],
    median: sorted[medianIndex],
    upper: sorted[upperIndex]
  };
}

export function calculateRiskWeight(baseScore: number, macroFactors: MacroFactors): number {
  // GDP impact: ~2-3 point score reduction per 1% GDP decline
  const gdpImpact = macroFactors.gdpChange < 0 ? macroFactors.gdpChange * 2.5 : macroFactors.gdpChange * 1;
  
  // Unemployment: ~5-7 point reduction per 1% unemployment increase
  const unemploymentImpact = macroFactors.unemploymentChange > 0 
    ? macroFactors.unemploymentChange * -6 
    : macroFactors.unemploymentChange * -2;
  
  // House prices: ~3-4 point reduction per 5% house price decline
  const hpiImpact = macroFactors.housePriceChange < 0 
    ? (macroFactors.housePriceChange / 5) * -3.5 
    : (macroFactors.housePriceChange / 5) * 1;
  
  // Interest rate impact: higher rates increase risk weights
  const rateImpact = macroFactors.interestRateChange * 2;

  // Calculate total impact
  const totalImpact = gdpImpact + unemploymentImpact + hpiImpact + rateImpact;
  
  // Convert score impact to risk weight change
  const baseRiskWeight = calculateBaseRiskWeight(baseScore);
  const stressedRiskWeight = baseRiskWeight * (1 + Math.abs(totalImpact) / 100);
  
  return stressedRiskWeight;
}

function calculateBaseRiskWeight(score: number): number {
  if (score >= 800) return 35;
  if (score >= 750) return 50;
  if (score >= 700) return 75;
  if (score >= 650) return 100;
  if (score >= 600) return 150;
  return 200;
}

export async function runMonteCarloSimulation(
  iterations: number,
  macroFactors: MacroFactors,
  historicalData?: any[]
): Promise<SimulationResults> {
  const results: number[] = [];
  
  // Generate correlated random variables
  for (let i = 0; i < iterations; i++) {
    // Generate standard normal random variables
    const z1 = jStat.normal.sample(0, 1);
    const z2 = jStat.normal.sample(0, 1);
    const z3 = jStat.normal.sample(0, 1);
    const z4 = jStat.normal.sample(0, 1);

    // Apply correlation structure and macro factor impacts
    const gdpShock = z1 * Math.abs(macroFactors.gdpChange) * 0.1;
    const unemploymentShock = z2 * Math.abs(macroFactors.unemploymentChange) * 0.2;
    const hpiShock = z3 * Math.abs(macroFactors.housePriceChange) * 0.15;
    const rateShock = z4 * Math.abs(macroFactors.interestRateChange) * 0.25;

    // Calculate combined impact
    const totalImpact = gdpShock + unemploymentShock + hpiShock + rateShock;
    results.push(totalImpact);
  }

  // Sort results for percentile calculations
  const sortedResults = [...results].sort((a, b) => a - b);

  // Calculate VaR levels
  const var95 = Math.abs(sortedResults[Math.floor(iterations * 0.05)]);
  const var99 = Math.abs(sortedResults[Math.floor(iterations * 0.01)]);
  const var9999 = Math.abs(sortedResults[Math.floor(iterations * 0.0001)]);

  // Generate distribution data
  const bins = 50;
  const min = Math.min(...results);
  const max = Math.max(...results);
  const binSize = (max - min) / bins;
  const distribution = Array(bins).fill(0);

  results.forEach(result => {
    const binIndex = Math.min(Math.floor((result - min) / binSize), bins - 1);
    distribution[binIndex]++;
  });

  const distributionData = distribution.map((count, i) => ({
    pnl: min + (i + 0.5) * binSize,
    frequency: count / iterations
  }));

  return {
    results,
    distribution: distributionData,
    stressLevels: {
      var95,
      var99,
      var9999
    }
  };
}