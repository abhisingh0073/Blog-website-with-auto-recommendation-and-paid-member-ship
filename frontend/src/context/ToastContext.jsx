import { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState(null);
  const [visible, setVisible] = useState(false);
  // toast = { message, type }

  const showToast = (message, type = "error") => {
    setToast({ message, type });
    setVisible(true);

    setTimeout(() => {
        setVisible(false);
    }, 2500);

    setTimeout(() => {
      setToast(null);
    }, 3000);

  };

  const value = {
    success: (msg) => showToast(msg, "success"),
    error: (msg) => showToast(msg, "error"),
  };

  return (
    <ToastContext.Provider value={value}>
      {children}

      {/* GLOBAL TOAST UI */}
      {toast && (
        <div
          className={`fixed top-5 right-5 z-[9999]
            rounded-lg px-4 py-3 text-sm font-medium shadow-lg
            transition-all duration-300
            ${
              toast.type === "success"
                ? "bg-green-600 text-white"
                : "bg-red-600 text-white"
            }
            ${
                visible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            }`}
        >
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);


