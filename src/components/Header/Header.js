import { useState,useEffect } from 'react';
import { createStyles, Header, Container, Burger, Paper, Transition, Menu,Avatar, UnstyledButton,Group,Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MantineLogo } from '@mantine/ds';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

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



export function HeaderResponsive({ links,auth,setPage,page }) {
    const [opened, { toggle, close }] = useDisclosure(false);
    const [active, setActive] = useState(links.length > 0 ? links[0].link : null);
    //use effect for active
    useEffect(() => {
        setActive(links.length > 0 ? links[0].link : null);
    },[auth]);
    useEffect(() => {
        setActive(page);
    },[page]);
    const { classes, cx } = useStyles();
    const [userMenuOpened, setUserMenuOpened] = useState(false);
    const items = links.map((link) => (
        <a
        key={link.label}
        href={link.link}
        className={cx(classes.link, { [classes.linkActive]: active === link.link })}
        onClick={(event) => {
            event.preventDefault();
            setPage(link.link);
            
        }}
        >
        {link.icon}
        {link.label}
        </a>
    ));

  return (
    <Header height={HEADER_HEIGHT} className={classes.root}>
      <Container size={1400} className={classes.header}>
        <MantineLogo size={28} />
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
                    // className={cx(classes.user, { [classes.userActive]: userMenuOpened })}
                    className={classes.userActive}
                >
                    <Group spacing={7}>
                    <Avatar src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4" alt="" radius="xl" size={44} />
                    <Text weight={500} size="lg" sx={{ lineHeight: 1 }} mr={3}>
                        <div className='userName'>Stepashka20</div>
                        <div className='balanceAndRating'>
                        <span className='imgAndText'>
                            <img className={classes.pointsIcon} src={bomb} alt="star" />
                            56560
                            
                        </span>
                        <span className='imgAndText'>
                            <img className={classes.balanceIcon} src={star} alt="star" />
                            
                            1000
                        </span>
                        </div>
                    </Text>
                    {/* <IconChevronDown size={12} stroke={1.5} /> */}
                    </Group>
                </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                <Menu.Item color="red">
                    Выйти
                </Menu.Item>
                </Menu.Dropdown>
            </Menu>
            <Burger opened={opened} onClick={toggle} className={classes.burger} size="sm" />

            <Transition transition="pop-top-right" duration={200} mounted={opened}>
            {(styles) => (
                <Paper className={classes.dropdown} withBorder style={styles}>
                {items}
                </Paper>
            )}
            </Transition>
        </> : <Button variant="filled" onClick={auth} color="blue" size="md">Войти</Button>}
      </Container>
    </Header>
  );
}