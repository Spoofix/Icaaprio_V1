import React, { useState } from 'react';
import { FileText, Download, Check, AlertTriangle } from 'lucide-react';

interface ReportSection {
  title: string;
  status: 'complete' | 'incomplete';
  items: { name: string; status: 'complete' | 'incomplete' }[];
}

export default function ReportGenerator() {
  const [generating, setGenerating] = useState(false);

  const sections: ReportSection[] = [
    {
      title: 'Executive Summary',
      status: 'complete',
      items: [
        { name: 'Business Environment Overview', status: 'complete' },
        { name: 'Key Risk Indicators', status: 'complete' },
        { name: 'Capital Adequacy Assessment', status: 'complete' }
      ]
    },
    {
      title: 'Stress Testing Results',
      status: 'complete',
      items: [
        { name: 'Baseline Scenario Analysis', status: 'complete' },
        { name: 'Moderate Stress Impacts', status: 'complete' },
        { name: 'Severe Stress Outcomes', status: 'complete' }
      ]
    },
    {
      title: 'Risk Assessment',
      status: 'incomplete',
      items: [
        { name: 'Credit Risk Analysis', status: 'complete' },
        { name: 'Market Risk Evaluation', status: 'incomplete' },
        { name: 'Operational Risk Review', status: 'complete' }
      ]
    }
  ];

  const handleGenerate = () => {
    setGenerating(true);
    // Simulate report generation
    setTimeout(() => setGenerating(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">ICAAP Report Generation</h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Generate a comprehensive ICAAP report based on your stress test results and analysis
          </p>
        </div>

        <div className="p-6 space-y-6">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {section.title}
                </h3>
                {section.status === 'complete' ? (
                  <span className="flex items-center text-green-500">
                    <Check className="w-5 h-5 mr-1" />
                    Complete
                  </span>
                ) : (
                  <span className="flex items-center text-yellow-500">
                    <AlertTriangle className="w-5 h-5 mr-1" />
                    Incomplete
                  </span>
                )}
              </div>

              <div className="pl-4 space-y-3">
                {section.items.map((item) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700 dark:text-gray-300">{item.name}</span>
                    {item.status === 'complete' ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex justify-end space-x-4 mt-8">
            <button
              onClick={handleGenerate}
              disabled={generating}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              {generating ? 'Generating...' : 'Generate Report'}
            </button>
            <button
              disabled={generating}
              className="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Template
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}