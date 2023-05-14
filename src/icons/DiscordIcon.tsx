import React from "react";

type TDiscordIcon = {
  svgColorFill: string;
};

const DiscordIcon = ({ svgColorFill }: TDiscordIcon) => {
  return (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_504_1667)">
        <path
          d="M20.3175 4.70425C18.7613 3.99005 17.1191 3.48031 15.432 3.18775C15.4167 3.18517 15.401 3.1874 15.3871 3.19411C15.3731 3.20083 15.3615 3.2117 15.354 3.22525C15.1425 3.60025 14.9085 4.09075 14.745 4.47475C12.9264 4.19876 11.0766 4.19876 9.25801 4.47475C9.07563 4.04698 8.8693 3.62982 8.64001 3.22525C8.63231 3.21185 8.62074 3.2011 8.60682 3.19441C8.5929 3.18771 8.57728 3.18539 8.56201 3.18775C6.87451 3.47875 5.23201 3.98875 3.67651 4.70425C3.6632 4.70933 3.65206 4.71887 3.64501 4.73125C0.534009 9.37975 -0.319491 13.9142 0.0990092 18.3917C0.100509 18.4127 0.114009 18.4337 0.130509 18.4472C1.9421 19.7892 3.9684 20.8137 6.12301 21.4772C6.13822 21.482 6.15457 21.4819 6.16967 21.4767C6.18478 21.4716 6.19786 21.4618 6.20701 21.4487C6.66901 20.8187 7.08001 20.1542 7.43401 19.4552C7.44139 19.4409 7.44391 19.4245 7.44121 19.4085C7.43851 19.3926 7.43072 19.3779 7.41901 19.3667C7.41126 19.3594 7.40206 19.3538 7.39201 19.3502C6.74575 19.1019 6.11985 18.8035 5.52001 18.4577C5.50325 18.4483 5.49079 18.4327 5.48521 18.4142C5.47962 18.3958 5.48134 18.3759 5.49001 18.3587C5.49511 18.3476 5.50283 18.3378 5.51251 18.3302C5.63851 18.2357 5.76451 18.1367 5.88451 18.0377C5.89511 18.0292 5.90783 18.0237 5.9213 18.0219C5.93478 18.02 5.9485 18.0219 5.96101 18.0272C9.88951 19.8212 14.142 19.8212 18.0225 18.0272C18.0355 18.0216 18.0497 18.0197 18.0637 18.0215C18.0777 18.0233 18.091 18.029 18.102 18.0377C18.222 18.1367 18.348 18.2357 18.474 18.3302C18.4842 18.3377 18.4924 18.3476 18.4979 18.359C18.5033 18.3704 18.5059 18.383 18.5053 18.3956C18.5047 18.4082 18.501 18.4205 18.4945 18.4314C18.488 18.4422 18.4789 18.4513 18.468 18.4577C17.8695 18.8066 17.2428 19.1047 16.5945 19.3487C16.5842 19.3525 16.5748 19.3585 16.567 19.3662C16.5592 19.374 16.5533 19.3834 16.5495 19.3937C16.546 19.4038 16.5446 19.4144 16.5454 19.425C16.5462 19.4355 16.5491 19.4458 16.554 19.4552C16.914 20.1527 17.3265 20.8187 17.7795 21.4487C17.7887 21.4618 17.8017 21.4716 17.8168 21.4767C17.8319 21.4819 17.8483 21.482 17.8635 21.4772C20.0217 20.8158 22.0513 19.7911 23.865 18.4472C23.8741 18.441 23.8816 18.4327 23.8871 18.4231C23.8926 18.4135 23.8958 18.4028 23.8965 18.3917C24.3975 13.2152 23.058 8.71825 20.3475 4.73275C20.3448 4.72617 20.3407 4.72023 20.3355 4.71532C20.3304 4.71041 20.3242 4.70664 20.3175 4.70425ZM8.02051 15.6647C6.83701 15.6647 5.86351 14.5787 5.86351 13.2467C5.86351 11.9132 6.81901 10.8272 8.02051 10.8272C9.23101 10.8272 10.1955 11.9222 10.1775 13.2467C10.1775 14.5787 9.22201 15.6647 8.02051 15.6647ZM15.9945 15.6647C14.8125 15.6647 13.8375 14.5787 13.8375 13.2467C13.8375 11.9132 14.793 10.8272 15.9945 10.8272C17.205 10.8272 18.171 11.9222 18.1515 13.2467C18.1515 14.5787 17.205 15.6647 15.9945 15.6647Z"
          fill={svgColorFill}
        />
      </g>
      <defs>
        <clipPath id="clip0_504_1667">
          <rect
            width="24"
            height="24"
            fill={svgColorFill}
            transform="translate(0 0.34375)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default DiscordIcon;
