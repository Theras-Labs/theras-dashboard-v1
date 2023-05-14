import React from "react";
import { Container } from "@mantine/core";

interface IRadioButton {
  radioValue?: string;
  cssStyles?: string;
  label: React.ReactNode;
  radId: number;
  checkedPlan: boolean;
  radioHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const RadioButton = ({
  radioValue,
  cssStyles,
  label,
  radId,
  checkedPlan,
  radioHandler,
}: IRadioButton) => {
  return (
    <Container
      style={{
        width: "100%",
        margin: "0",
        display: "flex",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 1.5rem 0 1rem",
          borderRadius: "15px",
          backgroundColor: "#f4f4f4",
          width: "100%",
        }}
      >
        <label
          htmlFor={`bordered-radio-${radId}`}
          style={{
            width: "100%",
            padding: "1rem 0 1rem 0",
            marginLeft: ".5rem",
            fontSize: "14px",
            fontWeight: "500",
            textTransform: "capitalize",
          }}
        >
          {label}
        </label>
        <input
          id={`bordered-radio-${radId}`}
          type="radio"
          onChange={radioHandler}
          checked={checkedPlan}
          value={radioValue}
          name="bordered-radio"
          style={{
            width: "16px",
            height: "16px",
            color: "#EC3C2B",
          }}
          className={`w-4 h-4 text-sfOrange bg-gray-100 border-sfOrange focus:ring-sfBlack focus:ring-2 ${cssStyles}`}
        />
      </div>
    </Container>
  );
};

export default RadioButton;
