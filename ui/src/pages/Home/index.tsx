import React, { MouseEvent } from "react";
import classNames from "classnames";
import { CompassHud } from "../../components/CompassHud";
import { StatusBars } from "../../components/StatusBars";
import { VehicleHud } from "../../components/VehicleHud";
import useRouter from "../../hooks/useRouter";
import { IoMoveOutline } from "react-icons/io5";
import useData from "../../hooks/useData";
import { AccountHud } from "../../components/AccountHud";
import "./index.sass";

const Home: React.FC = () => {
  const {
    statusBars,
    setStatusBars,
    vehicleHud,
    setVehicleHud,
    accountHud,
    setAccountHud,
    cinematicMode,
    compassHud,
  } = useData();
  const { router } = useRouter();

  const onDragEnd = (
    event: MouseEvent<HTMLDivElement>,
    type: "bar" | "vehicle" | "account"
  ) => {
    let newPosition: any = {
      left: event.clientX,
      bottom: window.innerHeight - event.clientY,
    };
    if (type == "bar") {
      setStatusBars((previousHudState) => ({
        ...previousHudState,
        position: newPosition,
      }));
    } else if (type == "vehicle") {
      setVehicleHud((previousHudState) => ({
        ...previousHudState,
        position: newPosition,
      }));
    } else {
      newPosition = {
        right: window.innerWidth - event.clientX,
        top: event.clientY,
      };
      setAccountHud((previousHudState) => ({
        ...previousHudState,
        position: newPosition,
      }));
    }
  };

  return (
    <>
      {!cinematicMode && (
        <>
          {/* Start Status Bars */}
          <div
            className={classNames("absolute", {
              "cursor-pointer": router === "settings",
            })}
            id="StatusBarHud_Positining"
            style={{
              left: `${statusBars.position.left}px`,
              bottom: `${statusBars.position.bottom}px`,
            }}
            draggable={router === "settings"}
            onDragEnd={(e) => onDragEnd(e, "bar")}
          >
            {router === "settings" && (
              <IoMoveOutline className="w-5 h-5 text-red-400 absolute -bottom-3 -left-3" />
            )}
            <StatusBars />
          </div>
          {/* End Status Bars */}
          {/* Start Car Hud */}
          <div
            id="VehicleHud_Positining"
            className={classNames("absolute", {
              "cursor-pointer": router === "settings",
            })}
            style={{
              left: `${vehicleHud.position.left}px`,
              bottom: `${vehicleHud.position.bottom}px`,
            }}
            draggable={router === "settings"}
            onDragEnd={(e) => onDragEnd(e, "vehicle")}
          >
            {router === "settings" && (
              <IoMoveOutline className="w-5 h-5 text-red-400 absolute -bottom-3 -left-3" />
            )}
            <VehicleHud />
          </div>
          {/* End Car Hud */}
          {/* Start Compass Hud */}
          <div className="absolute top-0 w-full" id="compassHud">
            {compassHud.active &&
              ((compassHud.onlyInVehicle && vehicleHud.inVehicle) ||
                (!compassHud.onlyInVehicle && compassHud.show)) && (
                <CompassHud />
              )}
          </div>
          {/* End Compass Hud */}
          {/* Start Account Hud */}
          <div
            className={classNames("absolute", {
              "cursor-pointer": router === "settings",
            })}
            id="AccountHud_Positining"
            style={{
              right: `${accountHud.position.right}px`,
              top: `${accountHud.position.top}px`,
            }}
            draggable={router === "settings"}
            onDragEnd={(e) => onDragEnd(e, "account")}
          >
            {router === "settings" && (
              <IoMoveOutline className="w-5 h-5 text-red-400 absolute -top-3 -right-3" />
            )}
            <AccountHud />
          </div>
          {/* End Account Hud */}
        </>
      )}
      {cinematicMode && (
        <>
          {/* Start Cinematic Mode */}
          <div className="cinematic-bar fade-in" style={{ top: 0 }}></div>
          <div className="cinematic-bar fade-in" style={{ bottom: 0 }}></div>
          {/* End Cinematic Mode */}
        </>
      )}
    </>
  );
};

export default Home;
