import React from 'react';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderActions?: (item: T) => JSX.Element;
}

const Table = <T extends {}>({ columns, data, renderActions }: TableProps<T>) => {
  return (
    <div className="w-full overflow-x-auto pb-[20px]">
      <table className="min-w-[1100px] lg:min-w-full max-h-screen">
        <thead className="bg-custom-blue-6 h-[53px]">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="th-css-2"
              >
                {column.header}
              </th>
            ))}
            {renderActions && (
              <th className="px-6 py-3 text-center sm:text-sm lg:text-[16px] font-medium text-gray-500 capitalize tracking-wider">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white mt-3">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50 my-8">
              {columns.map((column) => (
                <td
                  key={column.accessor as string}
                  className="td-css-2"
                >
                  {String(item[column.accessor])}
                </td>
              ))}
              {renderActions && (
                <td className="">
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
