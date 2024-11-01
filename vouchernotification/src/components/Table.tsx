import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T; // Ensure accessor is a key of T
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderActions?: (item: T) => JSX.Element;
}

const Table = <T extends object>({ columns, data, renderActions }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-[#F7FAFF]">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className="px-6 py-3 text-center text-base font-medium text-gray-500 capitalise tracking-wider">
                {column.header}
              </th>
            ))}
            {renderActions && (
              <th className="px-6 py-3 text-center text-base font-medium text-gray-500 capitalise tracking-wider">
                Action
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td key={column.accessor as string} className="px-6 py-4 text-center whitespace-nowrap text-[#2e3f5d] font-medium">
                  {item[column.accessor] as unknown as React.ReactNode}
                </td>
              ))}
              {renderActions && (
                <td className="px-6 py-4 text-center whitespace-nowrap">
                  {renderActions(item)}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
