import { MantineProvider } from "@mantine/core";
import type { FC, ReactNode } from "react";

export const AppMantineProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colors: {
          black: ["#000000"],
          orange: ["#EC3C2B"],
          white: ["#ffffff"],
          green: ["#64FFDB"],
          blue: ["#0A192F", "#172A46"],
        },
        fontSizes: {
          xxl: "1.4rem",
          xxxl: "1.6rem",
        },
        fontFamily: "Space Grotesk, sans-serif",
      }}
    >
      {children}
    </MantineProvider>
  );
};
