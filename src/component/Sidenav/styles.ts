import { createStyles } from "@mantine/core";

const useStyles = createStyles<string, { collapsed?: boolean }>(
  (theme, params, getRef) => {
    // const icon: string = getRef("icon");
    const icon: string = null;

    return {
      navbar: {
        position: "sticky",
        top: 0,
        bottom: 0,
        left: 0,
        width: params?.collapsed ? 81 : 264,
        transition: params?.collapsed ? "width 0.1s linear" : "none",
        background: "#0C1E37", //lbue
        // background: "#2A333E",
        border: 0,
      },

      header: {
        paddingBottom: theme.spacing.md,
        fontSize: theme.fontSizes.xs,
        // marginVe: theme.spacing.md,
        // borderBottom: `1px solid ${theme.colors.gray[2]}`,
      },

      menu: {
        height: "50%",
      },

      footer: {
        paddingTop: theme.spacing.xs,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      },

      logo: {
        ...theme.fn.focusStyles(),
        width: "100%",
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.sm,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: "#64FFDB",
        border: "1px solid #64FFDB",
        padding: 10,
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 10,

        // padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        fontWeight: 700,
      },
      title: {
        color: theme.white,
        paddingBottom: theme.spacing.xs,
      },
      divider: {
        marginTop: theme.spacing.lg,
        marginBottom: theme.spacing.lg,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      },
      link: {
        ...theme.fn.focusStyles(),
        width: "100%",
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.xs,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.sm}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,
        // marginTop: theme.spacing.xs,
        // marginBottom: theme.spacing.xs,

        "&:hover": {
          // backgroundColor: theme.colors.gray[0],
          color: theme.white,

          [`& .${icon}`]: {
            color: theme.white,
          },
        },
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: "#172A46",
          color: theme.white,
          [`& .${icon}`]: {
            color: "#64FFDB",
          },
        },
      },

      linkIcon: {
        ref: icon,
        color: theme.colors.gray[6],
      },

      linkLabel: params?.collapsed ? { display: "none" } : {},
    };
  }
);

export default useStyles;
