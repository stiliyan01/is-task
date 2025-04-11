import React, { useEffect } from "react";

const FlashMessage = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor = type === "success" ? "bg-green-100" : "bg-red-100";
  const textColor = type === "success" ? "text-green-800" : "text-red-800";

  return (
    <div className="fixed top-5 right-5 z-50">
      <div
        className={`p-4 rounded-md shadow-lg ${bgColor} ${textColor} border border-opacity-40`}
      >
        <p className="font-medium">{message}</p>
      </div>
    </div>
  );
};

export default FlashMessage;
