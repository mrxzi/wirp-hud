import {
  FaHeadSideCough,
  FaHeadphones,
  FaLeaf,
  FaRunning,
  FaTerminal,
} from "react-icons/fa";
import useData from "../../hooks/useData";
import { RiBrainFill, RiHeart3Fill } from "react-icons/ri";
import { PiEngineFill, PiHamburgerFill, PiShieldFill } from "react-icons/pi";
import { GiBrokenShield } from "react-icons/gi";
import { IoMdWater } from "react-icons/io";
import { SiOxygen } from "react-icons/si";
import { SquareBar } from "../SquareBar";

export const StatusBarsType3: React.FC = () => {
  const { statusBars, vehicleHud } = useData();

  return (
    <div className="flex gap-2.5 mt-2">
      {/* voice ? */}
      <SquareBar
        noAnim={true}
        color={
          (statusBars?.voice?.isTalking && statusBars?.voice?.isTalkingColor) ||
          statusBars?.voice?.color
        }
        occupancy={
          statusBars.voice.range <= 3
            ? statusBars.voice.range * 30
            : 90 + (statusBars.voice.range - 3) * 10
        }
        hidden={!statusBars?.voice?.active}
        animDelay="100ms"
      >
        <span>
          {!statusBars?.voice?.radio && (
            <FaHeadSideCough className={"text-white w-3.5 h-3.5"} />
          )}
          {statusBars?.voice?.radio && (
            <FaHeadphones className={"text-white w-3.5 h-3.5"} />
          )}
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* health */}
      <SquareBar
        color={statusBars?.health?.color}
        occupancy={statusBars?.health?.progressLevel}
        hidden={
          !statusBars?.health?.active ||
          (statusBars?.health?.autoHide < 100 &&
            statusBars?.health?.progressLevel > statusBars?.health?.autoHide)
        }
      >
        <span>
          <RiHeart3Fill className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* armor */}
      <SquareBar
        color={statusBars?.armor?.color}
        occupancy={statusBars?.armor?.progressLevel}
        hidden={
          !statusBars?.armor?.active ||
          (statusBars?.armor?.autoHide < 100 &&
            statusBars?.armor?.progressLevel > statusBars?.armor?.autoHide) ||
          statusBars.armor.progressLevel == 0
        }
      >
        <span>
          {statusBars?.armor?.progressLevel > 0 ? (
            <PiShieldFill className={"text-white w-3.5 h-3.5"} />
          ) : (
            <GiBrokenShield className={"text-white w-3.5 h-3.5"} />
          )}
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* hunger */}
      <SquareBar
        color={statusBars?.hunger?.color}
        occupancy={statusBars?.hunger?.progressLevel}
        hidden={
          !statusBars?.hunger?.active ||
          (statusBars?.hunger.autoHide < 100 &&
            statusBars?.hunger?.progressLevel > statusBars?.hunger?.autoHide)
        }
      >
        <span>
          <PiHamburgerFill className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* thirst */}
      <SquareBar
        color={statusBars?.thirst?.color}
        occupancy={statusBars?.thirst?.progressLevel}
        hidden={
          !statusBars?.thirst?.active ||
          (statusBars?.thirst?.autoHide < 100 &&
            statusBars?.thirst?.progressLevel > statusBars?.thirst?.autoHide)
        }
      >
        <span>
          <IoMdWater className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* oxygen */}
      <SquareBar
        color={statusBars?.oxygen?.color}
        occupancy={statusBars?.oxygen?.progressLevel}
        hidden={
          !statusBars?.oxygen?.active ||
          (statusBars?.oxygen?.autoHide < 100 &&
            statusBars?.oxygen?.progressLevel > statusBars?.oxygen?.autoHide)
        }
      >
        <span>
          <SiOxygen className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* stamina */}
      <SquareBar
        color={statusBars?.stamina?.color}
        occupancy={statusBars?.stamina?.progressLevel}
        hidden={
          !statusBars?.stamina?.active ||
          (statusBars?.stamina?.autoHide < 100 &&
            statusBars?.stamina?.progressLevel > statusBars?.stamina?.autoHide)
        }
      >
        <span>
          <FaRunning className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* engine health */}
      <SquareBar
        color={
          vehicleHud.engineHealth > 599
            ? "green"
            : vehicleHud.engineHealth > 0
            ? "orange"
            : "red"
        }
        occupancy={vehicleHud.engineHealth / 10}
        hidden={
          vehicleHud.hidden ||
          !vehicleHud.show ||
          !statusBars.engineHealth.active ||
          vehicleHud.engineHealth == 1000 ||
          (statusBars?.engineHealth?.autoHide < 100 &&
            vehicleHud.engineHealth / 10 > statusBars?.engineHealth?.autoHide)
        }
      >
        <span>
          <PiEngineFill className="w-4.5 h-4.5 text-white" />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* stress */}
      <SquareBar
        color={statusBars?.stress?.color}
        occupancy={statusBars?.stress?.progressLevel}
        hidden={
          !statusBars?.stress?.active ||
          (statusBars?.stress?.autoHide < 100 &&
            statusBars?.stress?.progressLevel > statusBars?.stress?.autoHide) ||
          statusBars?.stress?.progressLevel == 0
        }
      >
        <span>
          <RiBrainFill className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* terminal */}
      <SquareBar
        color={statusBars?.terminal?.color}
        occupancy={statusBars?.terminal?.progressLevel}
        hidden={!statusBars?.terminal?.active}
        animDelay="500ms"
      >
        <span>
          <FaTerminal className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
      {/* leaf */}
      <SquareBar
        color={statusBars?.leaf?.color}
        occupancy={statusBars?.leaf?.progressLevel}
        hidden={!statusBars?.leaf?.active}
        animDelay="550ms"
      >
        <span>
          <FaLeaf className={"text-white w-3.5 h-3.5"} />
        </span>
        <div className="inherit"></div>
      </SquareBar>
    </div>
  );
};
