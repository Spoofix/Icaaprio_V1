import React from 'react';
import { Info } from 'lucide-react';

export default function ValidationSummary() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-4 rounded-lg">
        <div className="flex items-start">
          <Info className="w-5 h-5 text-blue-500 mt-0.5 mr-3" />
          <div>
            <p className="text-sm text-blue-700 dark:text-blue-300">
              Validation summary module will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}