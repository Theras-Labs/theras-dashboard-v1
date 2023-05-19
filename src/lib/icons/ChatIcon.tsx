import React from "react";

interface IChatIcon {
  svgFill: string;
  strokeColor: string;
}

const ChatIcon = ({ svgFill, strokeColor }: IChatIcon) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 12.3437C3 7.92547 6.58172 4.34375 11 4.34375H11.5C15.6421 4.34375 19 7.70161 19 11.8437V11.8437C19 15.9859 15.6421 19.3437 11.5 19.3437H4C3.44772 19.3437 3 18.896 3 18.3437V12.3437Z"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M19 10.3438C20.2275 11.3929 21 12.9174 21 14.6143V19.3888C21 19.9162 20.5523 20.3437 20 20.3437H15C13.9071 20.3437 12.8825 20.0647 12 19.5773"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="7" cy="12.3438" r="1" fill={svgFill} />
      <circle cx="11" cy="12.3438" r="1" fill={svgFill} />
      <circle cx="15" cy="12.3438" r="1" fill={svgFill} />
    </svg>
  );
};

export default ChatIcon;
