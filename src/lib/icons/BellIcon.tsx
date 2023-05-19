import React from "react";

const BellIcon = (strokeColor: any) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.9013 6.25374L14.0688 6.24999C9.88876 6.23999 6.26002 9.63624 6.23127 13.75V18.4875C6.23127 19.475 6.10627 20.4387 5.56752 21.26L5.20877 21.8075C4.66252 22.6375 5.25002 23.75 6.23127 23.75H23.7688C24.75 23.75 25.3363 22.6375 24.7913 21.8075L24.4325 21.26C23.895 20.4387 23.7688 19.4737 23.7688 18.4862V13.7512C23.7188 9.63624 20.0813 6.26374 15.9013 6.25374Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.75 23.75C18.75 24.7446 18.3549 25.6984 17.6517 26.4017C16.9484 27.1049 15.9946 27.5 15 27.5C14.0054 27.5 13.0516 27.1049 12.3483 26.4017C11.6451 25.6984 11.25 24.7446 11.25 23.75"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 2.5C15.663 2.5 16.2989 2.76339 16.7678 3.23223C17.2366 3.70107 17.5 4.33696 17.5 5V6.25H12.5V5C12.5 4.33696 12.7634 3.70107 13.2322 3.23223C13.7011 2.76339 14.337 2.5 15 2.5Z"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default BellIcon;
