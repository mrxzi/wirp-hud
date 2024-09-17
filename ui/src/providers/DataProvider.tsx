import React, { createContext, useEffect, useState } from "react";
import {
  AccountHudProps,
  CompassHudProps,
  DataContextProps,
  StatusBarsProps,
  VehicleHudProps,
} from "../types/DataProviderTypes";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { debugData } from "../utils/debugData";
import { fetchNui } from "../utils/fetchNui";

debugData([
  {
    action: "UPDATE_HUD_DATA",
    data: {
      compass: {
        show: true,
        heading: 180,
      },
    },
  },
]);

debugData([
  {
    action: "UPDATE_HUD_DATA",
    data: {
      vehicle: {
        show: true,
        isSeatbeltOn: false,
        engineHealth: 500,
        type: 1,
        speed: 300,
        gear: 1,
        rpm: 1.0,
        cruiseControlStatus: true,
      },
    },
  },
]);

export const DataCtx = createContext<DataContextProps>({} as DataContextProps);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [statusBars, setStatusBars] = useState<StatusBarsProps>({
    show: true,
    type: 1,
    position: {
      x: 0,
      y: 0,
      left: 24,
      bottom: 8,
    },
    voice: {
      isTalking: false,
      active: true,
      color: "zinc",
      isTalkingColor: "red",
      microphone: true,
      radio: true,
      range: 2,
    },
    health: {
      active: true,
      color: "red",
      progressLevel: 100,
      autoHide: 100,
    },
    armor: {
      active: true,
      color: "blue",
      progressLevel: 100,
      autoHide: 200,
    },
    hunger: {
      active: true,
      color: "orange",
      progressLevel: 50,
      autoHide: 100,
    },
    thirst: {
      active: true,
      color: "cyan",
      progressLevel: 20,
      autoHide: 100,
    },
    stress: {
      active: false,
      color: "red",
      progressLevel: 0,
      autoHide: 100,
    },
    leaf: {
      active: false,
      color: "black",
      progressLevel: 100,
      autoHide: 100,
    },
    terminal: {
      active: false,
      color: "black",
      progressLevel: 100,
      autoHide: 100,
    },
    oxygen: {
      active: true,
      color: "cyan",
      progressLevel: 35,
      autoHide: 99,
    },
    stamina: {
      active: true,
      color: "lime",
      progressLevel: 35,
      autoHide: 100,
    },
    engineHealth: {
      active: true,
      progressLevel: 35,
      autoHide: 100,
    },
  } as StatusBarsProps);

  const [vehicleHud, setVehicleHud] = useState<VehicleHudProps>({
    hidden: false,
    show: false,
    inVehicle: false,
    speed: 100,
    kmH: false,
    type: 1,
    fuel: {
      level: 50,
      max_level: 100,
      type: "gasoline",
    },
    cruiseControlStatus: false,
    entity: -1,
    gear: 1,
    isPassenger: false,
    isSeatbeltOn: false,
    rpm: 0.0,
    miniMaP: {
      alwaysActive: false,
      style: "square",
    },
    speedoMeter: {
      fps: 15,
    },
    position: {
      left: 352,
      bottom: 80,
    },
    lightsOn: false,
    engineHealth: 1000,
  } as VehicleHudProps);

  const [compassHud, setCompassHud] = useState<CompassHudProps>({
    onlyInVehicle: false,
    active: true,
    show: false,
    crossRoad: {
      street1: "...",
      street2: "...",
    },
    heading: 60,
  } as CompassHudProps);

  const [accountHud, setAccountHud] = useState<AccountHudProps>({
    active: true,
    show: true,
    playerBalance: {
      cash: 0,
      bank: 0,
    },
    playerServerId: 1,
    position: {
      right: 32,
      top: 32,
    },
  } as AccountHudProps);

  const [cinematicMode, setCinematicMode] = useState<boolean>(false);

  useEffect(() => {
    fetchNui(
      "OnVehicleHudChanged",
      {
        silence: true,
        newVH: {
          miniMap: {
            alwaysActive: vehicleHud.miniMaP.alwaysActive,
            style: vehicleHud.miniMaP.style,
          },
          speedoMeter: {
            fps: vehicleHud.speedoMeter.fps,
          },
        },
      },
      true
    );
  }, [vehicleHud.miniMaP, vehicleHud.speedoMeter]);

  useEffect(() => {
    fetchNui(
      "OnCompassHudChanged",
      {
        newCompass: {
          onlyInVehicle: compassHud.onlyInVehicle,
          show: compassHud.show,
        },
      },
      true
    );
  }, [compassHud.show, compassHud.onlyInVehicle]);

  useNuiEvent("SET_HUDS_ACTIVE", (newValues) => {
    if (newValues.bars) {
      setStatusBars((prevState) => ({
        ...prevState,
        voice: {
          ...prevState.voice,
          active: newValues.bars.voice.active,
        },
        health: {
          ...prevState.health,
          active: newValues.bars.health.active,
        },
        armor: {
          ...prevState.armor,
          active: newValues.bars.armor.active,
        },
        hunger: {
          ...prevState.hunger,
          active: newValues.bars.hunger.active,
        },
        thirst: {
          ...prevState.thirst,
          active: newValues.bars.thirst.active,
        },
        stress: {
          ...prevState.stress,
          active: newValues.bars.stress.active,
        },
        leaf: {
          ...prevState.leaf,
          active: newValues.bars.leaf.active,
        },
        terminal: {
          ...prevState.terminal,
          active: newValues.bars.terminal.active,
        },
        oxygen: {
          ...prevState.oxygen,
          active: newValues.bars.oxygen.active,
        },
        stamina: {
          ...prevState.stamina,
          active: newValues.bars.stamina.active,
        },
      }));
    }
    if (newValues.vehicle) {
      setVehicleHud((p) => ({
        ...p,
        hidden: !newValues.vehicle.active,
        manualModeType: newValues.vehicle.manualModeType,
      }));
    }
    if (newValues.compass) {
      setCompassHud((p) => ({
        ...p,
        active: newValues.compass.active,
      }));
    }
    if (newValues.account) {
      setAccountHud((p) => ({
        ...p,
        active: newValues.account.active,
      }));
    }
  });
  useNuiEvent("UPDATE_HUD_DATA", (data) => {
    if (data.bars) {
      const newValues = data.bars;
      setStatusBars((prevState) => ({
        ...prevState,
        voice: {
          ...prevState.voice,
          ...newValues.voice,
        },
        health: {
          ...prevState.health,
          progressLevel: newValues.health,
        },
        armor: {
          ...prevState.armor,
          progressLevel: newValues.armor,
        },
        hunger: {
          ...prevState.hunger,
          progressLevel: newValues.hunger,
        },
        thirst: {
          ...prevState.thirst,
          progressLevel: newValues.thirst,
        },
        stress: {
          ...prevState.stress,
          progressLevel: newValues.stress,
        },
        leaf: {
          ...prevState.leaf,
          progressLevel: newValues.leaf,
        },
        terminal: {
          ...prevState.terminal,
          progressLevel: newValues.terminal,
        },
        oxygen: {
          ...prevState.oxygen,
          progressLevel: newValues.oxygen,
        },
        stamina: {
          ...prevState.stamina,
          progressLevel: newValues.stamina,
        },
      }));
    }
    if (data.vehicle) {
      const newValues = data.vehicle;
      setVehicleHud((p) => ({
        ...p,
        engineHealth: newValues?.engineHealth,
        cruiseControlStatus: newValues?.cruiseControlStatus,
        entity: newValues?.entity,
        fuel: {
          ...p.fuel,
          ...newValues.fuel,
        },
        gear: newValues?.gear,
        inVehicle: newValues?.inVehicle,
        isPassenger: newValues?.isPassenger,
        isSeatbeltOn: newValues?.isSeatbeltOn,
        kmH: newValues?.kmH,
        lightsOn: newValues?.lightsOn,
        rpm: newValues?.rpm,
        show: newValues?.show,
        speed: newValues?.speed,
      }));
    }
    if (data.compass) {
      const newValues = data.compass;
      setCompassHud((p) => ({
        ...p,
        show: newValues.show,
        crossRoad: newValues.crossRoad,
        heading: newValues.heading,
      }));
    }
    if (data.account) {
      const newValues = data.account;
      setAccountHud((p) => ({
        ...p,
        playerServerId: newValues.playerServerId,
        playerBalance: newValues.playerBalance,
      }));
    }
  });
  useNuiEvent("LOAD_HUD_STORAGE", () => {
    getSettings();
  });

  function handleLocalStorage(key: string, type: "set" | "get", newData?: any) {
    if (localStorage) {
      if (type === "get") {
        if (localStorage.getItem(key) != null) {
          return JSON.parse(localStorage.getItem(key) ?? "{}");
        }
        return false;
      }
      localStorage.setItem(key, JSON.stringify(newData));
    } else {
      return false;
    }
  }
  const saveSettings = (type: string) => {
    switch (type) {
      case "hud":
        handleLocalStorage("miniMap", "set", {
          alwaysActive: vehicleHud.miniMaP.alwaysActive,
          style: vehicleHud.miniMaP.style,
        });
        handleLocalStorage("speedoMeter", "set", {
          fps: vehicleHud.speedoMeter.fps,
        });
        handleLocalStorage("health", "set", {
          active: statusBars.health.active,
          autoHide: statusBars.health.autoHide,
          color: statusBars.health.color,
        });
        handleLocalStorage("armor", "set", {
          active: statusBars.armor.active,
          autoHide: statusBars.armor.autoHide,
          color: statusBars.armor.color,
        });
        handleLocalStorage("hunger", "set", {
          active: statusBars.hunger.active,
          autoHide: statusBars.hunger.autoHide,
          color: statusBars.hunger.color,
        });
        handleLocalStorage("thirst", "set", {
          active: statusBars.thirst.active,
          autoHide: statusBars.thirst.autoHide,
          color: statusBars.thirst.color,
        });
        handleLocalStorage("oxygen", "set", {
          active: statusBars.oxygen.active,
          autoHide: statusBars.oxygen.autoHide,
          color: statusBars.oxygen.color,
        });
        handleLocalStorage("stamina", "set", {
          active: statusBars.stamina.active,
          autoHide: statusBars.stamina.autoHide,
          color: statusBars.stamina.color,
        });
        handleLocalStorage("stress", "set", {
          active: statusBars.stress.active,
          autoHide: statusBars.stress.autoHide,
          color: statusBars.stress.color,
        });
        handleLocalStorage("terminal", "set", {
          active: statusBars.terminal.active,
          autoHide: statusBars.terminal.autoHide,
          color: statusBars.terminal.color,
        });
        handleLocalStorage("leaf", "set", {
          active: statusBars.leaf.active,
          autoHide: statusBars.leaf.autoHide,
          color: statusBars.leaf.color,
        });
        handleLocalStorage("engineHealth", "set", {
          active: statusBars.engineHealth.active,
          autoHide: statusBars.engineHealth.autoHide,
          color: statusBars.engineHealth.color,
        });
        handleLocalStorage("vehicleHud", "set", {
          position: {
            bottom: vehicleHud?.position?.bottom || 0,
            left: vehicleHud?.position?.left || 0,
          },
          type: vehicleHud?.type || 2,
        });
        handleLocalStorage("compassHud", "set", {
          onlyInVehicle: compassHud.onlyInVehicle,
          show: compassHud.show,
        });
        handleLocalStorage("accountHud", "set", {
          show: accountHud.show,
          position: {
            top: accountHud?.position?.top || 0,
            right: accountHud?.position?.right || 0,
          },
        });
        handleLocalStorage("bars_type", "set", statusBars.type);
        handleLocalStorage("bars_position", "set", statusBars.position);
        break;
      default:
        break;
    }
    fetchNui("OnSettingsSaved");
    fetchNui("OnHideSettingsMenu");
  };
  const getSettings = () => {
    setVehicleHud((p) => ({
      ...p,
      miniMaP: {
        ...p.miniMaP,
        alwaysActive:
          handleLocalStorage("miniMap", "get").alwaysActive ??
          p.miniMaP.alwaysActive,
        style: handleLocalStorage("miniMap", "get").style ?? p.miniMaP.style,
      },
      speedoMeter: {
        ...p.speedoMeter,
        fps: handleLocalStorage("speedoMeter", "get").fps ?? p.speedoMeter.fps,
      },
      position: {
        bottom: handleLocalStorage("vehicleHud", "get")
          ? handleLocalStorage("vehicleHud", "get").position?.bottom
          : p?.position?.bottom,
        left: handleLocalStorage("vehicleHud", "get")
          ? handleLocalStorage("vehicleHud", "get").position?.left
          : p?.position?.left,
      },
      type: handleLocalStorage("vehicleHud", "get").type ?? p.type,
    }));
    setStatusBars((prevState) => ({
      ...prevState,
      position: {
        x:
          handleLocalStorage("bars_position", "get").x ??
          prevState.position.bottom,
        y: handleLocalStorage("bars_position", "get").y ?? prevState.position.y,
        bottom:
          handleLocalStorage("bars_position", "get").bottom ??
          prevState.position.bottom,
        left:
          handleLocalStorage("bars_position", "get").left ??
          prevState.position.left,
      },
      type: handleLocalStorage("bars_type", "get") || prevState.type,
      health: {
        ...prevState.health,
        active:
          typeof handleLocalStorage("health", "get").active == "boolean"
            ? handleLocalStorage("health", "get").active
            : prevState.health.active,
        autoHide: handleLocalStorage("health", "get").autoHide
          ? handleLocalStorage("health", "get").autoHide
          : prevState.health.autoHide,
        color: handleLocalStorage("health", "get").color
          ? handleLocalStorage("health", "get").color
          : prevState.health.color,
      },
      armor: {
        ...prevState.armor,
        active:
          typeof handleLocalStorage("armor", "get").active == "boolean"
            ? handleLocalStorage("armor", "get").active
            : prevState.armor.active,
        autoHide: handleLocalStorage("armor", "get").autoHide
          ? handleLocalStorage("armor", "get").autoHide
          : prevState.armor.autoHide,
        color: handleLocalStorage("armor", "get").color
          ? handleLocalStorage("armor", "get").color
          : prevState.armor.color,
      },
      hunger: {
        ...prevState.hunger,
        active:
          typeof handleLocalStorage("hunger", "get").active == "boolean"
            ? handleLocalStorage("hunger", "get").active
            : prevState.hunger.active,
        autoHide: handleLocalStorage("hunger", "get").autoHide
          ? handleLocalStorage("hunger", "get").autoHide
          : prevState.hunger.autoHide,
        color: handleLocalStorage("hunger", "get").color
          ? handleLocalStorage("hunger", "get").color
          : prevState.hunger.color,
      },
      thirst: {
        ...prevState.thirst,
        active:
          typeof handleLocalStorage("thirst", "get").active == "boolean"
            ? handleLocalStorage("thirst", "get").active
            : prevState.thirst.active,
        autoHide: handleLocalStorage("thirst", "get").autoHide
          ? handleLocalStorage("thirst", "get").autoHide
          : prevState.thirst.autoHide,
        color: handleLocalStorage("thirst", "get").color
          ? handleLocalStorage("thirst", "get").color
          : prevState.thirst.color,
      },
      oxygen: {
        ...prevState.oxygen,
        active:
          typeof handleLocalStorage("oxygen", "get").active == "boolean"
            ? handleLocalStorage("oxygen", "get").active
            : prevState.oxygen.active,
        autoHide: handleLocalStorage("oxygen", "get").autoHide
          ? handleLocalStorage("oxygen", "get").autoHide
          : prevState.oxygen.autoHide,
        color: handleLocalStorage("oxygen", "get").color
          ? handleLocalStorage("oxygen", "get").color
          : prevState.oxygen.color,
      },
      stamina: {
        ...prevState.stamina,
        active:
          typeof handleLocalStorage("stamina", "get").active == "boolean"
            ? handleLocalStorage("stamina", "get").active
            : prevState.stamina.active,
        autoHide: handleLocalStorage("stamina", "get").autoHide
          ? handleLocalStorage("stamina", "get").autoHide
          : prevState.stamina.autoHide,
        color: handleLocalStorage("stamina", "get").color
          ? handleLocalStorage("stamina", "get").color
          : prevState.stamina.color,
      },
      stress: {
        ...prevState.stress,
        active:
          typeof handleLocalStorage("stress", "get").active == "boolean"
            ? handleLocalStorage("stress", "get").active
            : prevState.stress.active,
        autoHide: handleLocalStorage("stress", "get").autoHide
          ? handleLocalStorage("stress", "get").autoHide
          : prevState.stress.autoHide,
        color: handleLocalStorage("stress", "get").color
          ? handleLocalStorage("stress", "get").color
          : prevState.stress.color,
      },
      terminal: {
        ...prevState.terminal,
        active:
          typeof handleLocalStorage("terminal", "get").active == "boolean"
            ? handleLocalStorage("terminal", "get").active
            : prevState.terminal.active,
      },
      leaf: {
        ...prevState.leaf,
        active:
          typeof handleLocalStorage("leaf", "get").active == "boolean"
            ? handleLocalStorage("leaf", "get").active
            : prevState.leaf.active,
      },
      engineHealth: {
        ...prevState.engineHealth,
        active:
          typeof handleLocalStorage("engineHealth", "get").active == "boolean"
            ? handleLocalStorage("engineHealth", "get").active
            : prevState.engineHealth.active,
      },
    }));
    setCompassHud((p) => ({
      ...p,
      onlyInVehicle:
        handleLocalStorage("compassHud", "get").onlyInVehicle ??
        p.onlyInVehicle,
      show: handleLocalStorage("compassHud", "get").show ?? p.show,
    }));
    setAccountHud((p) => ({
      ...p,
      show: handleLocalStorage("accountHud", "get").show ?? p.show,
      position: {
        top: handleLocalStorage("accountHud", "get")
          ? handleLocalStorage("accountHud", "get").position?.top
          : p?.position?.top,
        right: handleLocalStorage("accountHud", "get")
          ? handleLocalStorage("accountHud", "get").position?.right
          : p?.position?.right,
      },
    }));
  };

  const value = {
    statusBars,
    vehicleHud,
    setStatusBars,
    setVehicleHud,
    saveSettings,
    compassHud,
    setCompassHud,
    accountHud,
    setAccountHud,
    cinematicMode,
    setCinematicMode,
  };

  return <DataCtx.Provider value={value}>{children}</DataCtx.Provider>;
};
