import { useState,useEffect } from 'react';
import { createStyles, Header, Container, Burger, Paper, Transition, Menu,Avatar, UnstyledButton,Group,Text, Button,Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import { Link,useLocation } from "react-router-dom"
import {IconLogout} from '@tabler/icons';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';
import logo from '../../assets/svg/logo.svg';
import './Header.css';
const HEADER_HEIGHT = 60;

const useStyles = createStyles((theme) => ({
  root: {
    position: 'relative',
    zIndex: 1,
  },

  dropdown: {
    position: 'absolute',
    top: HEADER_HEIGHT,
    left: 0,
    right: 0,
    zIndex: 0,
    borderTopRightRadius: 0,
    borderTopLeftRadius: 0,
    borderTopWidth: 0,
    overflow: 'hidden',

    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '100%',
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: '8px 12px',
    fontSize: "0.875 rem",
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.md,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    '&:hover': {
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
    },

    [theme.fn.smallerThan('sm')]: {
      borderRadius: 0,
      padding: theme.spacing.md,
    },
    svg:{
      marginRight: theme.spacing.xs,
    }
  },
  userActive: {
    '&': {
        padding: "4px 16px",
        borderRadius: 8,
    },
    '&:hover': {
        backgroundColor: "#25262b",
        color: theme.fn.variant({ variant: 'transparent', color: theme.primaryColor }).color,
      },
  },


  linkActive: {
    '&, &:hover': {
      backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
      color: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).color,
    },
  },

  balanceIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  pointsIcon :{
    width: 16,
    height: 16,
    marginRight: 2,
  }
}));



export function HeaderResponsive({ links,auth,user,logout }) {
    const location = useLocation();
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links.length > 0 ? links[0].link : null);
    //use effect for active
    useEffect(() => {
        setActive(links.length > 0 ? links[0].link : null);
    },[auth]);

    const { classes, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const items = links.map((link) => (
        <Link
            key={link.label}
            to={link.link}
            className={cx(classes.link, { [classes.linkActive]: location.pathname === link.link })}
            onClick={(event) => {
                setActive(link.link);
            }}
        >
        {link.icon}
        {link.label}
        </Link>
    ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size={1400} className={classes.header}>
        {/* <MantineLogo type="" size={28} /> */}
        <div>
        <img src={logo} alt="logo" style={{width: 36}}/>
        Minesweeper GO
        </div>
        {links.length > 0 ?  <>
            <Group spacing={5} className={classes.links}>
            {items}
            </Group>
            <Menu
                width={260}
                position="bottom-end"
                transition="pop-top-right"
                onClose={() => setUserMenuOpened(false)}
                onOpen={() => setUserMenuOpened(true)}
            >
                <Menu.Target>
                <UnstyledButton
                    className={classes.userActive}
                >
                    <Group spacing={7}>
                    <Avatar style={user.shop.avatarBorder ? {border: `3px solid ${user.shop.avatarBorder}`} : {}} src={user.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${user.avatar}`:""} alt="" radius="xl" size={44} />
                    <Text weight={500} size="lg" sx={{ lineHeight: 1 }} mr={3}>
                        <div className='userName' style={user.shop.usernameColor ? {color:user.shop.usernameColor } : {}}>{user.username}</div>
                        <div className='balanceAndRating'>
                        <span className='imgAndText'>
                            <img className={classes.pointsIcon} src={bomb} alt="star" />
                            {user.balance}
                            
                        </span>
                        <span className='imgAndText'>
                            <img className={classes.balanceIcon} src={star} alt="star" />
                            {user.rating}
                        </span>
                        </div>
                    </Text>
                    </Group>
                </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                    <Menu.Item icon={<IconLogout size={14} />} onClick={()=>logout()}>
                        Выйти
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />
            <Drawer
                opened={opened}
                onClose={toggle}
                // title="Register"
                padding="xl"
                size="xl"
                transition="rotate-left"
                transitionDuration={250}
                transitionTimingFunction="ease"
            >
                {items}
            </Drawer>
            {/* <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
                </Paper>
            )}
            </Transition> */}
        </> : <Button variant="filled" onClick={auth} color="blue" size="md">Войти</Button>}
      </Container>
    </Header>
  );
}