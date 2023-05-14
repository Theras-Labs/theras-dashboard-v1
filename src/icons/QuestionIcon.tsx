import React from "react";

const QuestionIcon = (strokeColor: string) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="12"
        cy="12.3438"
        r="9"
        stroke={strokeColor}
        strokeWidth="1.5"
      />
      <path
        d="M10 9.34375C10 8.23918 10.8954 7.34375 12 7.34375C13.1046 7.34375 14 8.23918 14 9.34375C14 10.2775 13.3601 11.0618 12.4949 11.282C12.2273 11.3502 12 11.5676 12 11.8438V13.3438"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M12 16.3438V17.3438"
        stroke={strokeColor}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default QuestionIcon;
