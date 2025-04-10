import React from "react";
import { Pencil, Trash2 } from "lucide-react";
import { NavLink } from "react-router";

const Table = ({
  data,
  onDelete,
  columns,
  noDataText = "Няма данни",
  textForLink,
}) => {
  const renderRowData = (item) => {
    return columns.map((col) => (
      <td key={col.key} className="px-4 py-2">
        {item[col.key]}
      </td>
    ));
  };

  return (
    <table className="w-full bg-white rounded shadow-md">
      <thead>
        <tr className="bg-gray-200 text-left">
          {columns.map((col) => (
            <th key={col.key} className="px-4 py-2">
              {col.label}
            </th>
          ))}
          <th className="px-4 py-2 text-right">Действия</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={columns.length + 1} className="px-4 py-2 text-center">
              {noDataText}
            </td>
          </tr>
        ) : (
          data.map((item) => (
            <tr key={item.id} className="border-t">
              {renderRowData(item)}
              <td className="px-4 py-2 text-right">
                <div className="flex justify-end space-x-4">
                  <NavLink to={`/admin/${textForLink}/${item.id}`}>
                    <Pencil className="w-4 h-4 text-yellow-600 cursor-pointer" />
                  </NavLink>
                  <Trash2
                    className="w-4 h-4 text-red-600 cursor-pointer"
                    onClick={() => onDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
