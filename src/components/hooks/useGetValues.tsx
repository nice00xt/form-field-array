import React, { createContext, useContext, useEffect, useState } from "react";
import type { ItemProps } from "../types";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormValuesContext = createContext<any>(null);

export const FormValuesProvider = ({ children }: { children: React.ReactNode }) => {
  const [storedValues, setStoredValues] = useState<ItemProps[]>();

  useEffect(() => {
    const storedValues = localStorage.getItem("formValues");
    if (storedValues) {
      setStoredValues(JSON.parse(storedValues));
    }
  }, []);

  const handleStoreValues = (values: ItemProps[]) => {
    setStoredValues(values);
    localStorage.setItem("formValues", JSON.stringify(values));
  };

  return (
    <FormValuesContext.Provider value={{ storedValues, handleStoreValues }}>
      {children}
    </FormValuesContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useFormValues = () => useContext(FormValuesContext);
