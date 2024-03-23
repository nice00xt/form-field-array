import { useEffect, useState } from "react";
import type { ItemProps } from "../types";


export const useGetValues = (fields: ItemProps[]) => {
  const [storedValues, setStoredValues] = useState<ItemProps[]>();

  // ....
  return { storedValues, setStoredValues };  
}