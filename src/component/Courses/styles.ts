import { createStyles } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colors.orange[9],
  },

  title: {
    color: theme.fn.rgba(theme.white, 0.65),
  },
  button: {
    backgroundColor: "#EC3C2B",
  },
}));

export default useStyles;
