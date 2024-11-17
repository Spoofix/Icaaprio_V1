import React from 'react';
import { Upload, Download, Check } from 'lucide-react';

interface FileUploadDownloadProps {
  onFileUpload: (file: File) => void;
  onDownloadTemplate: () => void;
  uploadedFile: File | null;
  templateName: string;
}

export default function FileUploadDownload({
  onFileUpload,
  onDownloadTemplate,
  uploadedFile,
  templateName
}: FileUploadDownloadProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload(file);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex-1">
        {uploadedFile && (
          <div className="flex items-center text-sm text-green-600 dark:text-green-400">
            <Check className="w-4 h-4 mr-2" />
            Uploaded: {uploadedFile.name}
          </div>
        )}
      </div>
      <div className="flex space-x-4">
        <button
          onClick={onDownloadTemplate}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600"
        >
          <Download className="w-4 h-4 mr-2" />
          Download Template
        </button>
        <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer">
          <Upload className="w-4 h-4 mr-2" />
          Upload {templateName}
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}