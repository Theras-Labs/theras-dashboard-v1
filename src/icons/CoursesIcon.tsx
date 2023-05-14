import React from "react";

const CoursesIcon = (strokeColour: string) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="3"
        y="4.34375"
        width="18"
        height="17"
        rx="2"
        stroke={strokeColour}
        strokeWidth="1.5"
      />
      <path
        d="M7 5.34375V3.34375"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 5.34375V3.34375"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M3 9.34375H21"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 13.3438L7 14.3438L9 12.3438"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 17.3438L7 18.3438L9 16.3438"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 13.3438H18"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 17.3438H18"
        stroke={strokeColour}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default CoursesIcon;
