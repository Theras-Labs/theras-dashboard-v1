import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    padding: `${theme.spacing.xs}px ${theme.spacing.md}px`,
    backgroundColor: theme.white,
  },
  title: {
    fontWeight: "bold",
    fontSize: "24px",
    margin: "0",
  },
  label: {
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: "16px",
    color: "#7C7A84",
  },
  user: {
    display: "block",
    width: "auto",
    padding: theme.spacing.md,
    color: theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[8]
          : theme.colors.gray[0],
    },
    dropdown: {
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      padding: "25px",
      gap: "24px",
      width: "286px",
    },
  },
}));

export default useStyles;
