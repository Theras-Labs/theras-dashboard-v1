import { BiTask, BiHelpCircle } from "react-icons/bi";
import { TbCategory2 } from "react-icons/tb";
import {
  BsDiscord,
  BsChatDots,
  BsFillLayersFill,
  BsListCheck,
  BsCollectionPlayFill,
  BsBoxes,
  BsBox,
  BsFillHouseAddFill,
} from "react-icons/bs";
import { getPath } from "src/lib/const";
import { Settings } from "tabler-icons-react";
import { SiMlflow } from "react-icons/si";
import { GiSandsOfTime } from "react-icons/gi";

export const ITEMS = [
  {
    href: getPath("INDEX"),
    label: "Dashboard",
    Icon: TbCategory2,
    size: "1.5rem",
  },
  {
    href: getPath("OVERLAY"),
    label: "Overlay",
    // Icon: BsFillLayersFill,
    Icon: BsBox,
    size: "1.5rem",
  },
  {
    href: getPath("HISTORY"),
    label: "History Tx",
    Icon: BsListCheck,
  },
  {
    href: getPath("SESSION"),
    label: "Session",
    Icon: GiSandsOfTime,
  },
  {
    href: getPath("GROUP_CHAT"),
    label: "Attendance",
    Icon: BiTask,
    comingSoon: true,
  },
  {
    href: getPath("GROUP_CHAT"),
    label: "NFT Factory",
    Icon: BsFillHouseAddFill,
    comingSoon: true,
  },

  {
    href: getPath("GROUP_CHAT"),
    label: "Stream TNT",
    Icon: SiMlflow,
    comingSoon: true,
  },
  {
    href: getPath("GROUP_CHAT"),
    label: "NFT Overlay",
    Icon: BsBoxes,
    comingSoon: true,
  },
  {
    href: getPath("GROUP_CHAT"),
    label: "NFT Courses",
    Icon: BsCollectionPlayFill,
    comingSoon: true,
  },
];

export const ITEMS_PROFILE = [
  {
    href: getPath("SETTINGS"),
    label: "Settings",
    Icon: Settings,
  },
  {
    href: getPath("HELP"),
    label: "Help",
    Icon: BiHelpCircle,
  },
];
