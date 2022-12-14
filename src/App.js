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
    constructor(uid,gameParams,setGameParams,user,setGameScreen,setUser,setSearching,reconnect) {
        this.uid = uid;
        this.gameParams = gameParams;
        this.setGameParams = setGameParams;
        this.user = user;
        this.setGameScreen = setGameScreen;
        this.setUser = setUser;
        this.setSearching = setSearching;
        this.reconnect = reconnect;
    }

    async connect(){
        this.socket = new WebSocket(`wss://${process.env.REACT_APP_API_URL.replace("https://","")}/ws/?uid=${this.uid}&token=${localStorage.getItem("token").replace("Bearer ","")}`);
        this.socket.onopen = () => {
            console.log("connected");
            if (this.reconnect){
                this.socket.send(JSON.stringify({type: "reconnect"}));
            }
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
            //TODO get function by type and call it this[data.type](data);
            if (data.type === "open"){
                this.gameParams.field = data.data.userField;
                this.gameParams.players.find((player) => player.username == this.user.username).points = data.data.points;
                await this.setGameParams({
                    ...this.gameParams,
                    field: this.gameParams.field,
                    players: this.gameParams.players
                });
                console.log(this.gameParams);
            } else if (data.type === "leave"){
                game = null;
                showNotification({
                    title: "???????? ??????????????????",
                    message: "???? ???????????????? ????????",
                    color: "red",
                    icon: <IconTrophy size={24} />,
                    timeout: 2000,
                });
                this.setGameScreen(false);
                this.socket = null;
            }else if (data.type === "gameover"){
                game = null;
                this.gameParams.field = data.data.userField;
                this.gameParams.timeStart = 0
                this.setGameParams({
                    ...this.gameParams,
                    
                });
                showNotification({
                    title: "???????? ??????????????????",
                    message: "???? ???????????? ???? ????????",
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
                        title: "???????? ??????????????????",
                        message: "???? ????????????????!",
                        color: "green",
                        icon: <IconTrophy size={24} />,
                        
                    });
                    if (data.data.bombs>0){
                        showNotification({
                            title: "+ "+data.data.bombs,
                            color: "dark",
                            icon: <img src={bomb} width={30} style={{marginLeft: 8}}/>,
                            styles: (theme) => ({"icon":{backgroundColor: "#25262b !important"}}),
                        });
                    }
                    if (data.data.stars>0){
                        showNotification({
                            title: "+ "+data.data.stars,
                            color: "dark",
                            icon: <img src={star} width={24} style={{marginLeft: 8}}/>,
                            styles: (theme) => ({"icon":{backgroundColor: "#25262b  !important"}}),
                        });
                    }   
                } else {
                    showNotification({
                        title: "???????? ??????????????????",
                        message: "???? ???????????? ????????, ???? ???? ?????????????????? ??????????????, ?????? ?????? ???? ???????????? ???? ?????????????????????????? ??????????",
                        color: "green",
                        icon: <IconTrophy size={24} />,
                        
                    });
                }
                
            }else if (data.type === "error"){
                showNotification({
                    title: "????????????",
                    message: data.data,
                    color: "red",
                });
                this.setGameScreen(false);
                this.socket = null;
            }else if (data.type === "startgame"){
                const response = data.data.gameParams;
                this.gameParams = {
                    ...this.gameParams,
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
                    field: response.userFields[0].field,
                    players: response.players,
                }
                this.setGameParams({
                    ...this.gameParams,
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
                    field: response.userFields[0].field,
                    players: response.players,
                });
                this.setGameScreen(true);
            }else if (data.type === "opponent_points"){
                this.gameParams.players.find(player => player.username != this.user.username).points = data.data.points;
                this.setGameParams({
                    ...this.gameParams,
                    players: this.gameParams.players
                });
            }else if (data.type === "opponent_status"){
                showNotification({
                    title: "???????????????????? ?? ????????????????????",
                    message: data.data.status == "defeat" ? "?????????????????? ?????????? ???? ????????. ?????? ???????????? ?????? ???????? ???????????????? ???????????? ??????????" : data.data.status,
                });
            } else if (data.type === "lose"){
                showNotification({
                    title: "????????????????",
                    message: "???? ??????????????????",
                });
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
        this.setSearching(false);
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
    useEffect(() => {
        console.log(gameParams)
    }, [gameParams])

    const [top, setTop] = useState([]);
    const [shopItems, setShopItems] = useState([]);
    const [opened, setOpened] = useState(false);
    const [loading, setLoading] = useState(false);

    const [searching, setSearching] = useState(false);
    const auth = () => setOpened(true);
    const closeModal = () => setOpened(false);
    // var reconnect = false;
    const [reconnect, setReconnect] = useState(false);
    const connectGame = async (uid,reconnect=false) => {
        if (!game){
            console.log("no game")
            game = new GameProcess(uid,gameParams,setGameParams,user,setGameScreen,setUser,setSearching,reconnect);
            game.connect();
            return game;
            
        } else {
            return game;
        }
    }

    useEffect(() => {
        if (user.game && reconnect){
            setReconnect(false);
            checkGame(user.game);
        }
    }, [reconnect])

    const checkGame = async (uid) => {
        const raw = await fetch(`${process.env.REACT_APP_API_URL}/game/${uid}`, {
            method: "GET",
            headers: {
                "Authorization": localStorage.getItem("token")
            }
        });
        const response = await raw.json();
        if (raw.ok){
            if (response.mode == "multiplayer"){
                if (response.status == "waiting"){
                    connectGame(response.uid);
                    setSearching(true);
                } else if (response.status == "playing") {
                    connectGame(uid);
                    setSearching(true);
                }
            } else {
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
            }
           
            
            
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
                    if (response.user.game){
                        setReconnect(true);
                    }
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
                        label: '????????????',
                        link: '/play',
                        icon: <IconGolf/>
                    },
                    {
                        label: '??????',
                        link: '/top',
                        icon: <IconTrophy/>
                    },
                    {
                        label: '??????????????',
                        link: '/shop',
                        icon: <IconShoppingCart/>
                    },
                    {
                        label: '??????????????',
                        link: '/profile',
                        icon: <IconUser/>
                    },
                    ] : []} />
                    
                    <Routes>
                        
                        {userAuth ? <>
                        <Route index path="/play" element={<Play searching={searching} setSearching={setSearching} user={user}  setUser={setUser} gameParams={gameParams} setGameParams={setGameParams} connectGame={connectGame} gameScreen={gameScreen} setGameScreen={setGameScreen}/>} />
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