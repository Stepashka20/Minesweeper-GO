import React, { useEffect, useState }  from"react";
import { MantineProvider, Text } from '@mantine/core';
import { HeaderResponsive } from './components/Header/Header';
import {IconGolf,IconTrophy,IconShoppingCart,IconUser} from '@tabler/icons';
import { BrowserRouter as Router, Redirect,Route,Routes  } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';

import {Main} from './pages/Main/Main';
import {Play} from './pages/Play/Play';
import {Top} from './pages/Top/Top';
import {Shop} from './pages/Shop/Shop';
import {Profile} from './pages/Profile/Profile';

import {LoginModal} from './components/Modals/LoginModal';

export default function App() {

    const [user, setUser] = useState({
        auth: true,
    });
    const [opened, setOpened] = useState(false);

    const auth = () => setOpened(true);
    const closeModal = () => setOpened(false);
    return (
        <Router>
            
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark'}}>
                <NotificationsProvider position="top-right" >
                    <LoginModal opened={opened} closeModal={closeModal} setUser={setUser}/>
                    <HeaderResponsive auth={auth} links={user.auth ? [
                    {
                        label: 'Играть',
                        link: '/play',
                        icon: <IconGolf/>
                    },
                    {
                        label: 'Топ',
                        link: '/top',
                        icon: <IconTrophy/>
                    },
                    {
                        label: 'Магазин',
                        link: '/shop',
                        icon: <IconShoppingCart/>
                    },
                    {
                        label: 'Профиль',
                        link: '/profile',
                        icon: <IconUser/>
                    },
                    ] : []} />
                    
                    <Routes>
                        
                        {user.auth ? <>
                        <Route index path="/play" element={<Play />} />
                        <Route path="/top" element={<Top />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/profile" element={<Profile />} />
                        </>:
                        <Route index path="/" element={<Main />} />
                        }

                        {/* <Route path="*" element={<Main />} /> */}
                    </Routes>
                </NotificationsProvider>
            </MantineProvider>
        </Router>
        
    );
}