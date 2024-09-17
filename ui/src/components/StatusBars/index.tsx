import useData from "../../hooks/useData";
import { StatusBarsType1 } from "./type1";
import { StatusBarsType2 } from "./type2";
import { StatusBarsType3 } from "./type3";
import { StatusBarsType4 } from "./type4";

export const StatusBars = () => {
  const { statusBars } = useData();

  return (
    <>
      {statusBars.type == 1 && <StatusBarsType1 />}
      {statusBars.type == 2 && <StatusBarsType2 />}
      {statusBars.type == 3 && <StatusBarsType3 />}
      {statusBars.type == 4 && <StatusBarsType4 />}
    </>
  );
};
