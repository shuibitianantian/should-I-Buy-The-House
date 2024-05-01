import { PropsWithChildren, useCallback, useState } from "react";
import HouseAnalyzingContext, {
  defaultHouseAnalyzingContext,
} from "./HouseAnalyzingContext";

export default ({ children }: PropsWithChildren<{}>) => {
  const [houseAnalyzingContext, setHouseAnalyzingContext] = useState(
    defaultHouseAnalyzingContext
  );

  const updateSetting = useCallback((field: string, value: any) => {
    setHouseAnalyzingContext((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const updateAll = useCallback(
    (values: typeof defaultHouseAnalyzingContext) => {
      setHouseAnalyzingContext({ ...values });
    },
    []
  );

  return (
    <HouseAnalyzingContext.Provider
      value={{
        ...houseAnalyzingContext,
        updateSetting,
        updateAll,
      }}
    >
      {children}
    </HouseAnalyzingContext.Provider>
  );
};
