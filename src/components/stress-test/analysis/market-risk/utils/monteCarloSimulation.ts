import { jStat } from 'jstat';

interface MacroFactors {
  gdpChange: number;
  unemploymentChange: number;
  housePriceChange: number;
  interestRateChange: number;
}

interface ForexData {
  currencyType: string;
  exposureAmount: number;
}

export async function runMonteCarloSimulation(data: ForexData[], macroFactors: MacroFactors) {
  const iterations = 10000;
  
  // Base volatility adjusted by macro factors
  const baseAnnualVol = 0.1; // 10% base annual volatility
  const stressMultiplier = calculateStressMultiplier(macroFactors);
  const adjustedAnnualVol = baseAnnualVol * stressMultiplier;
  
  const dailyVol = adjustedAnnualVol / Math.sqrt(252);
  const horizonDays = 10; // 10-day VaR
  const horizonVol = dailyVol * Math.sqrt(horizonDays);

  // Generate three sets of scenarios for different stress levels
  const scenarios = {
    moderate: generateScenarios(iterations, horizonVol * 1.0),
    severe: generateScenarios(iterations, horizonVol * 1.5),
    extreme: generateScenarios(iterations, horizonVol * 2.0)
  };

  // Calculate P&L distributions for each stress level
  const distributions = {
    moderate: calculateDistribution(scenarios.moderate, data),
    severe: calculateDistribution(scenarios.severe, data),
    extreme: calculateDistribution(scenarios.extreme, data)
  };

  // Calculate VaR at different confidence levels
  const var95 = calculateVaR(distributions.moderate, 0.95);
  const var99 = calculateVaR(distributions.severe, 0.99);
  const var9999 = calculateVaR(distributions.extreme, 0.9999);

  return {
    stressLevels: {
      var95,
      var99,
      var9999
    },
    distribution: distributions,
    simulationParams: {
      iterations,
      annualVol: adjustedAnnualVol,
      horizonDays,
      macroFactors
    }
  };
}

function calculateStressMultiplier(macroFactors: MacroFactors): number {
  // GDP impact: negative GDP change increases volatility
  const gdpEffect = Math.max(1, 1 - macroFactors.gdpChange * 0.2);
  
  // Unemployment impact: higher unemployment increases volatility
  const unemploymentEffect = 1 + Math.max(0, macroFactors.unemploymentChange * 0.1);
  
  // Interest rate impact: higher rates increase volatility
  const rateEffect = 1 + Math.max(0, macroFactors.interestRateChange * 0.15);

  return gdpEffect * unemploymentEffect * rateEffect;
}

function generateScenarios(iterations: number, volatility: number): number[] {
  return Array(iterations).fill(0).map(() => {
    return jStat.normal.sample(0, volatility);
  });
}

function calculateDistribution(scenarios: number[], data: ForexData[]) {
  // Calculate P&L for each scenario
  const pnlResults = scenarios.map(return_ => {
    return data.reduce((total, position) => {
      return total + position.exposureAmount * return_;
    }, 0);
  });

  // Generate distribution with kernel smoothing
  const bins = 100;
  const min = Math.min(...pnlResults);
  const max = Math.max(...pnlResults);
  const binSize = (max - min) / bins;
  const distribution = Array(bins).fill(0);

  pnlResults.forEach(pnl => {
    const binIndex = Math.min(Math.floor((pnl - min) / binSize), bins - 1);
    distribution[binIndex]++;
  });

  return distribution.map((count, i) => {
    const pnl = min + (i + 0.5) * binSize;
    const frequency = count / scenarios.length;
    
    // Apply Gaussian kernel smoothing
    let smoothedFreq = 0;
    const kernelWidth = 3;
    for (let j = Math.max(0, i - kernelWidth); j <= Math.min(bins - 1, i + kernelWidth); j++) {
      const kernelWeight = Math.exp(-0.5 * Math.pow((j - i) / kernelWidth, 2));
      smoothedFreq += (distribution[j] / scenarios.length) * kernelWeight;
    }
    
    return {
      pnl,
      frequency: smoothedFreq
    };
  });
}

function calculateVaR(distribution: { pnl: number; frequency: number }[], confidence: number): number {
  const cumulativeFreq = distribution.reduce((acc, point, i) => {
    const prevFreq = i > 0 ? acc[i - 1] : 0;
    acc.push(prevFreq + point.frequency);
    return acc;
  }, [] as number[]);

  const varIndex = cumulativeFreq.findIndex(freq => freq >= 1 - confidence);
  return Math.abs(distribution[varIndex].pnl);
}