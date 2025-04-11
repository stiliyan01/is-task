import React, { useState, useEffect, useRef } from "react";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 hover:bg-gray-300"
      >
        <User className="w-5 h-5 text-gray-700" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {localStorage.getItem("user") ? (
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                onClick={() => setOpen(false)}
              >
                Профил
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Влез
                </Link>
                <Link
                  to="/register"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  Регистрирай се
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
