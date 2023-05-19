import { FC } from "react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import {
  Navbar,
  Group,
  UnstyledButton,
  Tooltip,
  MediaQuery,
  Text,
  Divider,
  Image,
  Badge,
} from "@mantine/core";
import { ArrowLeft, ArrowRight } from "tabler-icons-react";
import { getPath } from "src/lib/const";
import { ActiveLink } from "src/lib/next";

import { BannerFluencr, styles } from "../../component/Sidenav";
import { ITEMS, ITEMS_PROFILE } from "../../lib/const/MenuItems";

export const LogoTheras = () => {
  const { classes } = styles(false);

  return <a className={classes.logo}>THERAS</a>;
};

export const SideNav: FC<{ className?: string }> = ({ className }) => {
  const [collapsed, handlers] = useDisclosure(false);
  const { classes, cx } = styles({ collapsed });

  return (
    <Navbar p="md" className={cx(classes.navbar, className)}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Link href={getPath("INDEX")}>
            <LogoTheras />
          </Link>
        </Group>
        <Group className={classes.menu}>
          <Text className={classes.title}>MENU</Text>
          {ITEMS.map(({ label, href, Icon, comingSoon }) => (
            <Tooltip
              key={label}
              label={label}
              disabled={!collapsed}
              position="right"
              withArrow
              sx={{ width: "100%" }}
            >
              <ActiveLink href={href} passHref>
                {(isActive) => {
                  return (
                    <a
                      style={{ padding: 10 }}
                      className={cx(classes.link, {
                        [classes.linkActive]: isActive,
                      })}
                    >
                      <Icon className={classes.linkIcon} size={24} />
                      <span className={classes.linkLabel}>{label}</span>
                      {comingSoon && !collapsed ? (
                        <Badge
                          // className={classes.linkSoon}
                          style={{ position: "relative", bottom: 20 }}
                          variant={"filled"}
                          color="red"
                          size="xs"
                        >
                          Coming Soon
                        </Badge>
                      ) : (
                        ""
                      )}
                    </a>
                  );
                }}
              </ActiveLink>
            </Tooltip>
          ))}
          <Divider className={classes.divider} />
        </Group>
      </Navbar.Section>

      {/* ADS THERAS */}
      {!collapsed ? <BannerFluencr /> : ""}

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section>
          <UnstyledButton className={classes.link} onClick={handlers.toggle}>
            {collapsed ? (
              <ArrowRight className={classes.linkIcon} />
            ) : (
              <>
                <ArrowLeft className={classes.linkIcon} />
                {/* <span>Minimize</span> */}
              </>
            )}
          </UnstyledButton>
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  );
};
