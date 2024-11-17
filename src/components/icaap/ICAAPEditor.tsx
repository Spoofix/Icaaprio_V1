import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Send, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useICAAPProgress } from '../../hooks/useICAAPProgress';
import MaterialRiskAssessment from '../stress-test/MaterialRiskAssessment';
import RiskAnalysis from '../stress-test/analysis/RiskAnalysis';
import MacroHistoricalAnalysis from '../stress-test/MacroHistoricalAnalysis';
import ValidationSummary from '../stress-test/ValidationSummary';
import StressTestForm from '../stress-test/StressTestForm';
import DataUpload from '../stress-test/DataUpload';
import RiskAssessment from '../stress-test/RiskAssessment';
import CapitalComponents from '../stress-test/CapitalComponents';
import StressTestResults from '../stress-test/StressTestResults';

export default function ICAAPEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = !id;
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);

  const { 
    progress,
    saveStepProgress,
    getStepData,
    isStepCompleted
  } = useICAAPProgress(id || 'new');

  const steps = [
    { 
      id: 'data-upload',
      title: 'Data Upload', 
      description: 'Upload portfolio and historical data',
      component: DataUpload 
    },
    { 
      id: 'macro-analysis',
      title: 'Macro Analysis', 
      description: 'Historical and macro analysis',
      component: MacroHistoricalAnalysis 
    },
    { 
      id: 'material-risks',
      title: 'Material Risks', 
      description: 'Identify and assess material risks',
      component: MaterialRiskAssessment 
    },
    { 
      id: 'risk-analysis',
      title: 'Risk Analysis', 
      description: 'Analyze identified risks',
      component: RiskAnalysis 
    },
    { 
      id: 'risk-assessment',
      title: 'Risk Assessment', 
      description: 'Detailed risk assessment',
      component: RiskAssessment 
    },
    { 
      id: 'capital-components',
      title: 'Capital Components', 
      description: 'Define capital structure',
      component: CapitalComponents 
    },
    { 
      id: 'stress-testing',
      title: 'Stress Testing', 
      description: 'Configure and run stress tests',
      component: StressTestForm 
    },
    { 
      id: 'results',
      title: 'Results', 
      description: 'Review stress test results',
      component: StressTestResults 
    },
    { 
      id: 'validation',
      title: 'Validation', 
      description: 'Validate assessment results',
      component: ValidationSummary 
    }
  ];

  // Allow direct step access
  const [activeStep, setActiveStep] = useState(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const stepId = urlParams.get('step');
    if (stepId) {
      const stepIndex = steps.findIndex(s => s.id === stepId);
      return stepIndex >= 0 ? stepIndex : 0;
    }
    return 0;
  });

  const handleBack = () => {
    if (activeStep === 0) {
      navigate('/icaap');
    } else {
      setActiveStep(prev => prev - 1);
      // Update URL without reloading
      const newUrl = `${window.location.pathname}?step=${steps[activeStep - 1].id}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(prev => prev + 1);
      // Update URL without reloading
      const newUrl = `${window.location.pathname}?step=${steps[activeStep + 1].id}`;
      window.history.pushState({}, '', newUrl);
    }
  };

  const handleStepClick = (index: number) => {
    setActiveStep(index);
    // Update URL without reloading
    const newUrl = `${window.location.pathname}?step=${steps[index].id}`;
    window.history.pushState({}, '', newUrl);
  };

  const handleSaveDraft = () => {
    // Save current step progress
    const currentStep = steps[activeStep];
    saveStepProgress(currentStep.id, {
      selectedRisks,
      timestamp: new Date().toISOString()
    });
    navigate('/icaap');
  };

  const handleSubmitForReview = () => {
    // Save final step and submit
    const currentStep = steps[activeStep];
    saveStepProgress(currentStep.id, {
      selectedRisks,
      timestamp: new Date().toISOString()
    });
    navigate('/icaap');
  };

  const currentStepData = getStepData(steps[activeStep].id);
  const CurrentStepComponent = steps[activeStep].component;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <button
            onClick={handleBack}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {isNew ? 'New ICAAP Assessment' : 'Edit ICAAP Assessment'}
            </h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Step {activeStep + 1} of {steps.length}: {steps[activeStep].title}
            </p>
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            onClick={handleSaveDraft}
            className="flex items-center px-4 py-2 bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Draft
          </button>
          {activeStep === steps.length - 1 && (
            <button
              onClick={handleSubmitForReview}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              <Send className="w-4 h-4 mr-2" />
              Submit for Review
            </button>
          )}
        </div>
      </div>

      {/* Progress Steps - Now Clickable */}
      <div className="relative">
        <div className="overflow-hidden">
          <div className="grid grid-cols-9 gap-2">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => handleStepClick(index)}
                className={`flex flex-col items-center ${
                  index === activeStep ? 'opacity-100' : 'opacity-70 hover:opacity-100'
                }`}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index <= activeStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
                  }`}
                >
                  {isStepCompleted(step.id) ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span>{index + 1}</span>
                  )}
                </div>
                <div className="mt-2 text-xs text-center">
                  <div className="font-medium">{step.title}</div>
                  <div className="text-gray-500 dark:text-gray-400 hidden md:block">
                    {step.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
          <div className="absolute top-4 left-0 right-0 h-0.5 -z-10">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <CurrentStepComponent
          selectedRisks={selectedRisks}
          onRiskSelectionChange={setSelectedRisks}
          savedData={currentStepData}
          onSave={(data: any) => saveStepProgress(steps[activeStep].id, data)}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="px-4 py-2 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          Back
        </button>
        {activeStep < steps.length - 1 && (
          <button
            onClick={handleNext}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Next Step
          </button>
        )}
      </div>
    </div>
  );
}