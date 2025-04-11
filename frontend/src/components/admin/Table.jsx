import React from "react";
import TableRow from "./product/TableRow";

const Table = ({
  data,
  onDelete,
  columns,
  noDataText = "Няма данни",
  textForLink,
  isForDetails = false,
}) => {
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
            <TableRow
              key={item.id}
              item={item}
              columns={columns}
              onDelete={onDelete}
              textForLink={textForLink}
              isForDetails={true}
            />
          ))
        )}
      </tbody>
    </table>
  );
};

export default Table;
