import { FaCoins, FaPeopleArrows } from "react-icons/fa";
import { AiFillFire } from "react-icons/ai";
import { BiTask, BiHelpCircle } from "react-icons/bi";

const TABS = [
  {
    title: "Total Earnings (Approx)",
    Icon: FaCoins,
    bgColor: "bg-gradient-to-r from-cyan-500 to-blue-500",
  },
  {
    title: "Balance (TFUEL)",
    Icon: AiFillFire,
    bgColor: "bg-gradient-to-r from-red-500 to-blue-500",
  },
  {
    title: "Total Sessions",
    Icon: BiTask,
    bgColor: "bg-gradient-to-r from-orange-500 to-slate-700",
  },
  {
    title: "Total Ads Sponsors",
    Icon: FaPeopleArrows,
    bgColor: "bg-gradient-to-r from-indigo-500 to-green-500",
  },
];

const SummaryFinance = () => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {TABS.map((item, i) => (
        <BalanceBox key={i} {...item} />
      ))}
    </div>
  );
};
export default SummaryFinance;

const BalanceBox = ({ Icon, title, bgColor = "" }) => {
  return (
    <div className={`rounded-md p-5 ${bgColor} flex`}>
      <div className=" mr-2">
        <Icon className="w-8 h-8" />
      </div>
      <div>
        <div>{title}</div>
        <div>-</div>
      </div>
    </div>
  );
};
