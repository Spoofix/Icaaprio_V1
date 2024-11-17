import React from 'react';
import { Trash2 } from 'lucide-react';

interface Column {
  header: string;
  accessor: string;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onDelete: () => void;
}

export default function DataTable({ data, columns, onDelete }: DataTableProps) {
  return (
    <div className="overflow-x-auto">
      <div className="flex justify-end mb-2">
        <button
          onClick={onDelete}
          className="flex items-center px-3 py-1 text-sm text-red-600 hover:text-red-700"
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete Data
        </button>
      </div>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white"
                >
                  {typeof row[column.accessor] === 'number'
                    ? row[column.accessor].toLocaleString()
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}