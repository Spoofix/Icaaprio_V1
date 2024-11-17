import React from 'react';
import { TABLE_STYLES } from '../../utils/constants';

interface Column {
  header: string;
  accessor: string;
  align?: 'left' | 'right' | 'center';
}

interface TableProps {
  columns: Column[];
  data: any[];
  onRowClick?: (row: any) => void;
}

export default function Table({ columns, data, onRowClick }: TableProps) {
  return (
    <div className="overflow-x-auto">
      <table className={TABLE_STYLES.container}>
        <thead className={TABLE_STYLES.header.row}>
          <tr>
            {columns.map((column) => (
              <th
                key={column.accessor}
                className={`${TABLE_STYLES.header.cell} text-${column.align || 'left'}`}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              onClick={() => onRowClick?.(row)}
              className={`${TABLE_STYLES.body.row} ${onRowClick ? 'cursor-pointer' : ''}`}
            >
              {columns.map((column) => (
                <td
                  key={column.accessor}
                  className={`${TABLE_STYLES.body.cell} text-${column.align || 'left'}`}
                >
                  {row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}