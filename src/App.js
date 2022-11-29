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


class GameProcess {
    constructor(uid,gameParams,setGameParams) {
        this.uid = uid;
        this.gameParams = gameParams;
        this.setGameParams = setGameParams;

    }

    async connect(){
        this.socket = new WebSocket(`wss://${process.env.REACT_APP_API_URL.replace("https://","")}/ws/?uid=${this.uid}&token=${localStorage.getItem("token").replace("Bearer ","")}`);
        this.socket.onopen = () => {
            console.log("connected");
            setInterval(() => {
                this.socket.send(JSON.stringify({type: "ping"}));
            }, 10000);
        }
        this.socket.onclose = () => {
            console.log("disconnected");
        }
        this.socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            console.log(data);
            if (data.type === "open"){
                await this.setGameParams({
                    ...this.gameParams,
                    field: data.data.userField, 
                });
                console.log(this.gameParams);
            }
        }
    }

    async openCell(i){
        this.socket.send(JSON.stringify({
            type: "open",
            data: i
        }))
    }

    async flagCell(i){
        this.socket.send(JSON.stringify({
            type: "flag",
            data: i
        }))
    }

    async unflagCell(i){
        this.socket.send(JSON.stringify({
            type: "unflag",
            data: i
        }))
    }

    async leaveGame(){
        this.socket.send(JSON.stringify({
            type: "leave"
        }))
    }
}

export default function App() {
    const [userAuth, setUserAuth] = useState(false);
    const [user, setUser] = useState({
        username: "",
        balance: 0,
        rating: 0,
        avatar: "",
    });

    const [gameParams, setGameParams] = useState({
        gameType: 1,
        active: false,
        uid: 0,
        opponent: {
            username: "",
            avatar: "",
            rating: 0,
        },
        results: {
            me: 0,
            opponent: 0,
        },
        timer: 0,
        gameParams: {
            size: 10,
            difficulty: 0,
            reward:0
        },
        field:[1,2,2,2,2,2,2,0,0,3,0,1,0,0,0,4,0,0,5,1,0,0,0,4,0,1,0,0,4,0,0,0,-1,0,0,0,1,-1,0,0,0,0,0,0,1,0,0,-1,0,0,1,0,0,0,4,5,3,4,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0]
    });


    const [top, setTop] = useState([]);
    const [shopItems, setShopItems] = useState([]);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = () => setOpened(true);
    const closeModal = () => setOpened(false);
    const connectGame = async (uid) => {
        const game = new GameProcess(uid,gameParams,setGameParams); //Move to gameParams
        await game.connect();
        return game;
    }
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
                    setUser(response.user);
                    console.log(response.top);
                    setTop(response.top);
                } else {
                    return setLoading(false)
                }
                const raw2 = await fetch(process.env.REACT_APP_API_URL+"/shop/items", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    },
                })
                const response2 = await raw2.json();
                if (raw2.ok){
                    setShopItems(response2);
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
                    <LoginModal opened={opened} closeModal={closeModal} setUserAuth={setUserAuth} setUser={setUser} setTop={setTop} setShopItems={setShopItems}/>
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
                        <Route index path="/play" element={<Play gameParams={gameParams} setGameParams={setGameParams} connectGame={connectGame}/>} />
                        <Route path="/top" element={<Top top={top}/>} />
                        <Route path="/shop" element={<Shop shopItems={shopItems} user={user} setUser={setUser}/> } />
                        <Route path="/profile" element={<Profile user={user} setUser={setUser}/>} />
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