import React from "react";

interface IDashboard {
  dashIconFill: string;
  strokeColor: string;
}

const DashboardIcon = ({ dashIconFill, strokeColor }: IDashboard) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        width="24"
        height="24"
        transform="translate(0 0.34375)"
        fill={dashIconFill}
      />
      <rect
        x="3"
        y="3.34375"
        width="7"
        height="7"
        rx="3.5"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="14.3438"
        width="7"
        height="7"
        rx="2.5"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="3.34375"
        width="7"
        height="7"
        rx="2.5"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <rect
        x="14"
        y="14.3438"
        width="7"
        height="7"
        rx="3.5"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
    </svg>
  );
};

export default DashboardIcon;
