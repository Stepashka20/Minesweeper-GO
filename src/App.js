import React, { useEffect, useState }  from"react";
import { MantineProvider, LoadingOverlay } from '@mantine/core';
import { HeaderResponsive } from './components/Header/Header';
import {IconGolf,IconTrophy,IconShoppingCart,IconUser} from '@tabler/icons';
import { BrowserRouter as Router, Navigate,Route,Routes  } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';

import {Main} from './pages/Main/Main';
import {Play} from './pages/Play/Play';
import {Top} from './pages/Top/Top';
import {Shop} from './pages/Shop/Shop';
import {Profile} from './pages/Profile/Profile';

import {LoginModal} from './components/Modals/LoginModal';


export default function App() {
    const [userAuth, setUserAuth] = useState(false);
    const [user, setUser] = useState({
        username: "",
        balance: 0,
        rating: 0,
        avatar: "",
    });
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = () => setOpened(true);
    const closeModal = () => setOpened(false);

    useEffect(() => {
        async function checkAuth() {
            const token = localStorage.getItem("token");
            if (token) {
                setLoading(true);
                const raw = await fetch(process.env.REACT_APP_API_URL+"/auth", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                })
                const response = await raw.json();
                if (raw.ok){
                    setUserAuth(true);
                    setUser(response);
                }
                setLoading(false);
            }
        }
        checkAuth();
    }, []);

    const logout = () => {
        localStorage.removeItem("token");
        setUserAuth(false);
        setUser({
            username: "",
            balance: 0,
            rating: 0,
            avatar: "",
        });
    }
    return (
        <Router>
            
            <MantineProvider withGlobalStyles withNormalizeCSS theme={{colorScheme: 'dark'}}>
                <LoadingOverlay visible={loading} overlayBlur={2} />
                <NotificationsProvider position="top-right" >
                    <LoginModal opened={opened} closeModal={closeModal} setUserAuth={setUserAuth} setUser={setUser}/>
                    <HeaderResponsive user={user} auth={auth} logout={logout}  links={userAuth ? [
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
                        
                        {userAuth ? <>
                        <Route index path="/play" element={<Play />} />
                        <Route path="/top" element={<Top />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route
                            path="*"
                            element={<Navigate to="/play" replace />}
                        />
                        </>:
                        <>
                            <Route index path="/" element={<Main auth={auth}/>} />
                            <Route
                                path="*"
                                element={<Navigate to="/" replace />}
                            />
                        </>
                        }

                        {/* <Route path="*" element={<Main />} /> */}
                    </Routes>
                </NotificationsProvider>
            </MantineProvider>
        </Router>
        
    );
}