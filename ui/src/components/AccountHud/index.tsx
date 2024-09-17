import { FaMoneyBillWave } from "react-icons/fa";
import { RiBankLine } from "react-icons/ri";
import { FaUserAlt } from "react-icons/fa";
import { formatNumberWithComma } from "../../utils/misc";
import useData from "../../hooks/useData";

export const AccountHud: React.FC = () => {
  const { accountHud } = useData();

  return (
    <div hidden={!accountHud.show || !accountHud.active}>
      <div className="flex flex-col items-end gap-0.5">
        <div className="flex text-white items-center">
          <div className="mr-1.5">
            <FaUserAlt className="h-3.5 w-3.5 text-orange_bar/80" />
          </div>
          <div>
            <span className="text font-bold">#{accountHud.playerServerId}</span>
          </div>
        </div>
        <div className="flex text-white items-center">
          <div className="mr-1.5 mt-0.5">
            <FaMoneyBillWave className="h-5 w-5 text-settings_green/80 -rotate-[20deg]" />
          </div>
          <div>
            <span className="font-SFPRO font-bold">
              {formatNumberWithComma(accountHud.playerBalance.cash)}
            </span>
          </div>
          <div>
            <span className="ml-1 text-base font-Antonio">$</span>
          </div>
        </div>
        <div className="flex text-white items-center">
          <div className="mr-1 mb-0.5">
            <RiBankLine className="w-6 h-6 text-settings_green/80" />
          </div>
          <div>
            <span className="text-lg font-SFPRO font-bold">
              {formatNumberWithComma(accountHud.playerBalance.bank)}
            </span>
          </div>
          <div>
            <span className="ml-1 font-Antonio">$</span>
          </div>
        </div>
      </div>
    </div>
  );
};
