import React from "react";
import { Pencil, Trash2, Eye } from "lucide-react";
import { NavLink } from "react-router-dom";

const TableRow = React.memo(
  ({ item, columns, onDelete, textForLink, isForDetails = false }) => {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <tr className="border-t">
        {columns.map((col) => (
          <td key={col.key} className="px-4 py-2">
            {item[col.key]}
          </td>
        ))}
        <td className="px-4 py-2 text-right">
          <div className="flex justify-end space-x-4">
            <NavLink to={`/admin/${textForLink}/${item.id}`}>
              {isForDetails ? (
                <Eye className="w-4 h-4 text-green-600 cursor-pointer" />
              ) : (
                <Pencil className="w-4 h-4 text-yellow-600 cursor-pointer" />
              )}
            </NavLink>
            {user.is_admin === 1 && (
              <Trash2
                className="w-4 h-4 text-red-600 cursor-pointer"
                onClick={() => onDelete(item.id)}
              />
            )}
          </div>
        </td>
      </tr>
    );
  }
);

export default TableRow;
