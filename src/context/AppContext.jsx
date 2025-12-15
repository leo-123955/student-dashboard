import { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Auth
  const [user, setUser] = useState(null);

  // Students
  const [students, setStudents] = useState([]);

  // Filters
  const [filters, setFilters] = useState({
    course: "",
    gender: "",
    minGpa: 0
  });

  return (
    <AppContext.Provider
      value={{
        user, setUser,
        students, setStudents,
        filters, setFilters
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
