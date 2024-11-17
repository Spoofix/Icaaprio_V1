import React from 'react';
import { AlertTriangle, Info } from 'lucide-react';
import { TrancheDistribution } from './securitization/TrancheDistribution';
import { RiskWeightAnalysis } from './securitization/RiskWeightAnalysis';
import { UnderlyingAssetDistribution } from './securitization/UnderlyingAssetDistribution';
import { CreditEnhancementAnalysis } from './securitization/CreditEnhancementAnalysis';

export default function SecuritizationAnalysis() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Analysis of securitization exposures under stress scenarios. Charts show tranche distribution,
              risk weights, underlying assets, and credit enhancement levels.
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrancheDistribution />
        <RiskWeightAnalysis />
        <UnderlyingAssetDistribution />
        <CreditEnhancementAnalysis />
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-yellow-500 mt-0.5 mr-3" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
              Risk Considerations
            </h4>
            <ul className="mt-2 text-sm text-yellow-700 dark:text-yellow-300 list-disc list-inside">
              <li>Significant Risk Transfer (SRT) assessment required</li>
              <li>Implicit support restrictions and operational requirements</li>
              <li>Due diligence requirements on underlying exposures</li>
              <li>Maximum capital requirement cap for originators</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}