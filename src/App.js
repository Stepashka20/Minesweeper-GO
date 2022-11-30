import React, { useEffect, useState }  from"react";
import { MantineProvider, LoadingOverlay } from '@mantine/core';
import { HeaderResponsive } from './components/Header/Header';
import {IconGolf,IconTrophy,IconShoppingCart,IconUser} from '@tabler/icons';
import { BrowserRouter as Router, Navigate,Route,Routes  } from 'react-router-dom';
import { NotificationsProvider } from '@mantine/notifications';
import { showNotification } from '@mantine/notifications';

import {Main} from './pages/Main/Main';
import {Play} from './pages/Play/Play';
import {Top} from './pages/Top/Top';
import {Shop} from './pages/Shop/Shop';
import {Profile} from './pages/Profile/Profile';

import {LoginModal} from './components/Modals/LoginModal';


class GameProcess {
    constructor(uid,gameParams,setGameParams,user) {
        this.uid = uid;
        this.gameParams = gameParams;
        this.setGameParams = setGameParams;
        this.user = user;
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
                    //game.players.find(player => player.username == username).points
                    players: this.gameParams.players.map(player => {
                        if (player.username == this.user.username){
                            return {
                                ...player,
                                points: data.data.points
                            }
                        } else {
                            return player
                        }
                    })
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
    const [gameScreen, setGameScreen] = useState(false);
    const [gameParams, setGameParams] = useState({
        gameType: 1,
        active: false,
        uid: 0,
        players: [],
        points: {},
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
        field:[]
    });


    const [top, setTop] = useState([]);
    const [shopItems, setShopItems] = useState([]);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);
    const auth = () => setOpened(true);
    const closeModal = () => setOpened(false);
    const connectGame = async (uid) => {
        const game = new GameProcess(uid,gameParams,setGameParams,user); //Move to gameParams
        await game.connect();
        return game;
    }
    const checkGame = async (uid) => {
        const raw = await fetch(`${process.env.REACT_APP_API_URL}/game/${uid}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        const response = await raw.json();
        if (raw.ok){
            setGameParams({
                ...gameParams,
                uid: response.uid,
                active: true,
                gameParams:{
                    size: response.size,
                    difficulty: response.difficulty,
                    reward: response.reward,
                },
                timeBet: response.timeBet,
                timeStart: response.timeStart,
                mode: response.mode,
                field: response.userField,
                players: response.players,
            })
            setGameScreen(true);
            
        } else {
            showNotification({
                type: "error",
                message: response.message
            })
        }
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
                    if (response.user.game){
                        checkGame(response.user.game);
                    }
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
                        <Route index path="/play" element={<Play gameParams={gameParams} setGameParams={setGameParams} connectGame={connectGame} gameScreen={gameScreen} setGameScreen={setGameScreen}/>} />
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