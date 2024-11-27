import React from "react";

interface User {
  userType: string;
  name: string;
}

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  renderActions?: (item: T) => JSX.Element;
}

const Table = <T extends User>({
  columns,
  data,
  renderActions,
}: TableProps<T>) => {
  const getInitials = (name: string) => {
    const names = name.split(" ");
    return names.map((n) => n[0]).join("").toUpperCase();
  };

  const userTypeColors: Record<string, string> = {
    Admin: "#B4D3DC",
    "Sub-admin": "#C5E0B2",
    Account: "#E2BFC6",
  };

  return (
    <div className="overflow-x-auto mt-[22px] p-[6px]">
      <table className="min-w-full">
        <thead className="bg-custom-blue-6 h-12">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                className="th-css-full-opacity"
              >
                {column.header}
              </th>
            ))}
            {renderActions && (
              <th className="th-css-full-opacity">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="bg-white">
          {data.map((item, index) => (
            <tr key={index} className="hover:bg-gray-50">
              {columns.map((column) => (
                <td
                  key={column.accessor as string}
                  className="px-6 py-4 text-center whitespace-nowrap text-[#908d8d] sm:text-xs md:text-md lg:text-[16px] font-normal"
                >
                  {column.accessor === "name" ? (
                    <div className="flex items-center justify-center">
                      <div
                        className="rounded-full w-10 h-10 flex items-center justify-center text-black text-sm font-semibold p-2 mr-2"
                        style={{
                          backgroundColor:
                            userTypeColors[item.userType] || "#D1D5DB",
                        }}
                      >
                        {getInitials(item.name)}
                      </div>
                      {item[column.accessor] as string}
                    </div>
                  ) : (
                    String(item[column.accessor])
                  )}
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
