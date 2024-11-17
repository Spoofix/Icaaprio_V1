import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm max-w-lg w-full">
        <div className="flex items-center space-x-3 text-red-600 dark:text-red-400 mb-4">
          <AlertTriangle className="w-6 h-6" />
          <h2 className="text-lg font-medium">Something went wrong</h2>
        </div>
        
        <div className="bg-red-50 dark:bg-red-900/30 p-4 rounded-md mb-6">
          <pre className="text-sm text-red-700 dark:text-red-300 whitespace-pre-wrap font-mono">
            {error.message}
          </pre>
        </div>

        <div className="flex justify-end space-x-4">
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            Reload Page
          </button>
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
}