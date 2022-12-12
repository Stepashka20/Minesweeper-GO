import { SegmentedControl, Box, Button, Grid,Input,Divider ,Avatar,Badge,ScrollArea,LoadingOverlay,Loader,Text   } from '@mantine/core';
import { useEffect, useState,useRef } from 'react';
import { useStyles } from './PlayStyle';
import { useMediaQuery } from '@mantine/hooks';
import {IconHelp} from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

import { GameScreen } from './GameScreen';
import { HelpSingleGameModal} from '../../components/Modals/HelpSingleGameModal';
import { HelpMultiplayerGame} from '../../components/Modals/HelpMultiplayerGameModal';

export function Play({gameParams,setGameParams,connectGame,gameScreen,setGameScreen,setUser,user,setSearching,searching}) {
    const { classes } = useStyles();
    const [mode, setMode] = useState('singleplayer');
    const [loading, setLoading] = useState(false);
    const [singleGameHelpOpened, setSingleGameHelpOpened] = useState(false);
    const [multiplayerGameHelpOpened, setMultiplayerGameHelpOpened] = useState(false);

    const [lobbies, setLobbies] = useState([]);
    const [size, setSize] = useState("10");
    const [difficulty, setDifficulty] = useState("easy");
    const [timeBet, setTimeBet] = useState("time_0");
    const [betType, setBetType] = useState("rating");

    

    const bet = useRef();
    
    const [bets, setBets] = useState([
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_0' },
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_1' },
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_2' },
    ]);

    const secondsToMS = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = seconds % 60;
        return `${minutes}:${secondsLeft<10 ? "0":""}${secondsLeft}`;
    }
    useEffect(() => {
        const getlobbyes = async () => {
            const raw = await fetch(process.env.REACT_APP_API_URL+"/game/getLobbies", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem("token")
                }
            });
            const data = await raw.json();
            if (raw.ok) {
                setLobbies(data);
            }
        }
        getlobbyes()
        // setInterval(getlobbyes, 1000);
    }, []);
    useEffect(() => {
        const p = {"easy": 1,"medium": 2,"hard": 3}
        const max_b = 450
        const max_t = {"easy": 100,"medium": 150,"hard": 200}[difficulty]
        const b = max_b / 9
        const t = max_t / 5
        const pointsMin = b*(3*(size/5-2)+p[difficulty]);
        const timeMin = t*(size/5-2+4-p[difficulty]);
        
        setBets([
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin)} - {Math.floor(pointsMin*1.9*1.9)} <img src={bomb} width={20} style={{marginLeft: 4}}/></div>, value: 'time_0' },
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin*2)} - {Math.floor(pointsMin*1.8)} <img src={bomb} width={20} style={{marginLeft: 4}}/></div>, value: 'time_1' },
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin*3)} - {pointsMin} <img src={bomb} width={20} style={{marginLeft: 4}}/></div>, value: 'time_2' },
        ])
    },[size,difficulty])

    const startSingleGame =async () => {
        setLoading(true);
        const raw = await fetch(process.env.REACT_APP_API_URL+"/game/start", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                size: +size,
                difficulty: difficulty,
                timeBet: timeBet,
                mode: "single"
            })
        });

        const response = await raw.json();
        console.log(response)
        if(raw.ok){
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
            setLoading(false);
            setGameScreen(true)
        }else{
            showNotification({
                type: "error",
                message: response.message
            })
        }

    }

    const createLobby = async () => {
        console.log(size,difficulty,betType,bet.current.value)
        setSearching(true);
        const raw = await fetch(process.env.REACT_APP_API_URL+"/game/createLobby", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
            body: JSON.stringify({
                size: +size,
                difficulty: difficulty,
                betType: betType,
                bet: +bet.current.value,
            })
        });

        const response = await raw.json();
        console.log(response)
        if(raw.ok){
            const uid = response.uid;
            connectGame(uid);
            setUser({
                ...user,
                balance: response.balance,
                rating: response.rating
            })
        }else{
            showNotification({
                type: "error",
                message: response.message
            })
            setSearching(false);
        }
    }

    const joinLobby = async (uid) => {
        setSearching(true);
        const raw = await fetch(process.env.REACT_APP_API_URL+"/game/joinLobby/"+uid, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });

        const response = await raw.json();
        console.log(response)
        if(raw.ok){    
            connectGame(uid);
            setUser({
                ...user,
                balance: response.balance,
                rating: response.rating
            })
            setSearching(false);
        }else{
            showNotification({
                type: "error",
                message: response.message
            })
            setSearching(false);
        }
    }
    const delLobby = async () => {
        const raw = await fetch(process.env.REACT_APP_API_URL+"/game/deleteLobby", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            }
        });

        const response = await raw.json();
        console.log(response)
        if(raw.ok){
            setSearching(false);
            showNotification({
                message: response.message
            })
            setUser({
                ...user,
                balance: response.refundBet.balance,
                rating: response.refundBet.rating
            })
        }else{
            showNotification({
                type: "error",
                message: response.message
            })
            setSearching(false);
        }
    }
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <>
        {!gameScreen ? 
        !searching ?
        <>
            <div className={classes.centered}>
                <HelpSingleGameModal opened={singleGameHelpOpened} closeModal={()=>setSingleGameHelpOpened(false)}/>
                <HelpMultiplayerGame opened={multiplayerGameHelpOpened} closeModal={()=>setMultiplayerGameHelpOpened(false)}/>
                <LoadingOverlay visible={loading} overlayBlur={2} radius={8} loaderProps={{ variant: 'dots' }}/>
                <SegmentedControl
                    data={[
                        { label: 'Одиночная игра', value: 'singleplayer' },
                        { label: 'Мультиплеер', value: 'multyplayer' },
                    ]}
                    size="md"
                    className={classes.segmented}
                    fullWidth={isMobile}
                    onChange={(value) => setMode(value)}
                    value={mode}
                />
                {mode === 'singleplayer'?
                
                <Box className={classes.card}>
                    <div className={classes.settingsRow}>
                        <div>Размер поля</div>
                        <SegmentedControl
                            data={[
                                { label: '10x10', value: "10" },
                                { label: '15x15', value: "15" },
                                { label: '20x20', value: "20" },
                            ]}
                            size={isMobile ? 'sm' : 'md'}
                            onChange={(value) => setSize(value)}
                        />
                    </div>
                    <div className={classes.settingsRow}>
                        <div>Сложность</div>
                        <SegmentedControl
                            data={[
                                { label: 'Легкая', value: 'easy' },
                                { label: 'Средняя', value: 'medium' },
                                { label: 'Сложная', value: 'hard' },
                            ]}
                            size={isMobile ? 'sm' : 'md'}
                            onChange={(value) => setDifficulty(value)}
                        />
                    </div>
                    <div className={classes.settingsRow}>
                        <div>Бонус</div>
                        <SegmentedControl
                            data={bets}
                            size={isMobile ? 'sm' : 'md'}
                            orientation={isMobile ? 'vertical' : 'horizontal'}
                            onChange={(value) => setTimeBet(value)}
                           
                        />
                    </div>
                    <div className={classes.startGameRow}>
                        <Button fullWidth={true} variant="filled" radius="md" size="md" onClick={()=>startSingleGame()}>
                            Начать игру 
                        </Button>
                        <IconHelp size={36} onClick={()=>setSingleGameHelpOpened(true)}/>
                    </div>
                </Box>
                :
                <Box className={classes.card}>
                    <Grid grow align="flex-start">
                        <Grid.Col span={4}>
                            <div className={classes.settingsRow}>
                                <div>Размер поля</div>
                                <SegmentedControl
                                    data={[
                                        { label: '10x10', value: '10' },
                                        { label: '15x15', value: '15' },
                                        { label: '20x20', value: '20' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                    onChange={(value) => setSize(value)}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Сложность</div>
                                <SegmentedControl
                                    data={[
                                        { label: 'Легкая', value: 'easy' },
                                        { label: 'Средняя', value: 'medium' },
                                        { label: 'Сложная', value: 'hard' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                    onChange={(value) => setDifficulty(value)}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Тип ставки</div>
                                <SegmentedControl
                                    data={[
                                        { label: 'Рейтинг', value: 'rating' },
                                        { label: 'Бомбы', value: 'balance' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                    onChange={(value) => setBetType(value)}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Ставка</div>
                                <Input style={{width:100}} size="md"  rightSection={<img width={24} src={betType == "balance" ?bomb:star} alt="balance"/>} ref={bet} />
                            </div>
                            <div className={classes.startGameRow}>
                                <Button fullWidth={true} variant="filled" radius="md" size="md" onClick={()=>createLobby()}>
                                    Создать лобби
                                </Button>
                                <IconHelp size={36} onClick={()=>setMultiplayerGameHelpOpened(true)}/>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={4} >
                            <ScrollArea  style={{ height: 260 }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
                                <div className={classes.lobbyRows}>
                                    {lobbies.map((lobby, index) => (
                                        <>
                                            <div className={classes.lobbyRowInfo}>
                                                <div className={classes.personInfo}>
                                                    <Avatar className={classes.avatar} src={ lobby.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${lobby.avatar}` : ""} style={lobby.customisation.avatarBorder ? {border: `3px solid ${lobby.customisation.avatarBorder}`} : {}} alt="" radius="xl" size={44}/>
                                                    <div className={classes.lobbyRowNameBet}>
                                                        <div style={lobby.customisation.usernameColor ? {color:lobby.customisation.usernameColor } : {}}>{lobby.username}</div>
                                                        <div style={{display: "flex",alignItems: "center", gap: 4}}>{lobby.bet} <img width={16} src={lobby.betType == "rating" ? star : bomb}/> <Badge color={{"easy":"","medium":"indigo","hard":"red"}[lobby.difficulty]}>{{"easy":"ЛЕГКО","medium":"СРЕДНЕ","hard":"СЛОЖНО"}[lobby.difficulty]}</Badge></div>
                                                    </div>
                                                </div>
                                                <Button className={classes.enterGameBtn} variant="filled" radius="md" size="md" onClick={()=>joinLobby(lobby.uid)}>
                                                    Вступить
                                                </Button>
                                            </div>
                                            {index != lobbies.length-1 &&  <Divider my="sm" />}
                                        </>
                                    ))}
                                </div>
                            </ScrollArea>
                        </Grid.Col>
                    </Grid>
                </Box>
                
                }

                
            </div>
        </>
        : 
        <>
            <div className={classes.centered}>
                <Box className={classes.card}>
                    <Text size="md" align="center" weight="bold" >Ожидание соперника...</Text>
                    <div className={classes.lobbyLoader}>
                        <Loader variant="bars"/>
                    </div>
                    
                    
                    <Button fullWidth={true} variant="filled" radius="md" size="md" onClick={()=>delLobby()}>
                        Отменить
                    </Button>
                </Box>
            </div>
        </>
        :
        <GameScreen gameParams={gameParams} setGameParams={setGameParams} connectGame={connectGame}/>}
        </>
    )
}