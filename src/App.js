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

import star from './assets/svg/star.svg';
import bomb from './assets/svg/bomb.svg';

class GameProcess {
    constructor(uid,gameParams,setGameParams,user,setGameScreen,setUser) {
        this.uid = uid;
        this.gameParams = gameParams;
        this.setGameParams = setGameParams;
        this.user = user;
        this.setGameScreen = setGameScreen;
        this.setUser = setUser;
    }

    async connect(){
        this.socket = new WebSocket(`wss://${process.env.REACT_APP_API_URL.replace("https://","")}/ws/?uid=${this.uid}&token=${localStorage.getItem("token").replace("Bearer ","")}`);
        this.socket.onopen = () => {
            console.log("connected");
            var interval = null;  
            interval = setInterval(() => {
                if (!this.socket) {
                    clearInterval(interval);
                }
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
            } else if (data.type === "leave"){
                game = null;
                showNotification({
                    title: "Игра закончена",
                    message: "Вы покинули игру",
                    color: "red",
                    icon: <IconTrophy size={24} />,
                    timeout: 2000,
                });
                this.setGameScreen(false);
                this.socket = null;
            }else if (data.type === "gameover"){
                game = null;
                this.setGameParams({
                    ...this.gameParams,
                    field: data.data.userField,
                    timeStart: 0
                });
                showNotification({
                    title: "Игра закончена",
                    message: "Вы попали на мину",
                    color: "red",
                    icon: <IconTrophy size={24} />,
                    
                });
            }else if (data.type === "win"){
                game = null;
                if (data.data.reward){
                    this.setUser({
                        ...this.user,
                        balance: this.user.balance + data.data.bombs,
                        rating: this.user.rating + data.data.stars
                    })
                    showNotification({
                        title: "Игра закончена",
                        message: "Вы выиграли!",
                        color: "green",
                        icon: <IconTrophy size={24} />,
                        
                    });
                    showNotification({
                        title: "+ "+data.data.bombs,
                        color: "dark",
                        icon: <img src={bomb} width={30} style={{marginLeft: 8}}/>,
                        styles: (theme) => ({"icon":{backgroundColor: "#25262b !important"}}),
                        // autoClose: false,
                    });
                    showNotification({
                        title: "+ "+data.data.stars,
                        color: "dark",
                        icon: <img src={star} width={24} style={{marginLeft: 8}}/>,
                        styles: (theme) => ({"icon":{backgroundColor: "#25262b  !important"}}),
                        // autoClose: false,
                    });
                } else {
                    showNotification({
                        title: "Игра закончена",
                        message: "Вы прошли игру, но не получаете награды, так как не прошли за установленное время",
                        color: "green",
                        icon: <IconTrophy size={24} />,
                        
                    });
                }
                
            }else if (data.type === "error"){
                showNotification({
                    title: "Ошибка",
                    message: data.data,
                    color: "red",
                });
                this.setGameScreen(false);
                this.socket = null;
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

var game = null;

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
        if (!game){
            console.log("no game")
            game = new GameProcess(uid,gameParams,setGameParams,user,setGameScreen,setUser);
            game.connect();
            return game;
            
        } else {
            return game;
        }
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
            if (response.mode == "multiplayer") return
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