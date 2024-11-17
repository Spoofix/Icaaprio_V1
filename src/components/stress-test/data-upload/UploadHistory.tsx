import React from 'react';
import { Clock, User } from 'lucide-react';

export interface UploadRecord {
  fileName: string;
  uploadedAt: string;
  uploadedBy: string;
  recordCount: number;
}

interface UploadHistoryProps {
  records: UploadRecord[];
}

export default function UploadHistory({ records }: UploadHistoryProps) {
  if (!records.length) return null;

  return (
    <div className="mt-4 space-y-3">
      <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">Upload History</h4>
      {records.map((record, index) => (
        <div 
          key={index}
          className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg flex items-center justify-between"
        >
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900 dark:text-white">
              {record.fileName}
            </p>
            <div className="mt-1 flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <Clock className="w-4 h-4 mr-1" />
                {new Date(record.uploadedAt).toLocaleString()}
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <User className="w-4 h-4 mr-1" />
                {record.uploadedBy}
              </div>
            </div>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {record.recordCount.toLocaleString()} records
          </div>
        </div>
      ))}
    </div>
  );
}