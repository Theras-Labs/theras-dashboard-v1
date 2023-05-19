import { BiTask, BiHelpCircle } from "react-icons/bi";
import { TbCategory2 } from "react-icons/tb";
import { BsDiscord, BsChatDots } from "react-icons/bs";
import { getPath } from "src/lib/const";
import { Settings } from "tabler-icons-react";

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
    Icon: TbCategory2,
    size: "1.5rem",
  },
  {
    href: getPath("HISTORY"),
    label: "History Tx",
    Icon: BiTask,
  },
  {
    href: getPath("HISTORY"),
    label: "NFT Factory",
    Icon: BiTask,
  },
  // {
  // giveaway select winners?
  //   href: getPath("HISTORY"),
  //   label: "NFT Factory",
  //   Icon: BiTask,
  // },
  {
    href: getPath("GROUP_CHAT"),
    label: "Stream TNT",
    Icon: BsChatDots,
    comingSoon: true,
  },
  {
    href: getPath("GROUP_CHAT"),
    label: "NFT Courses",
    Icon: BsChatDots,
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
