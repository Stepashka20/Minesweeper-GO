import { SegmentedControl, Box, Button, Grid,Input,Divider ,Avatar,Badge,ScrollArea,LoadingOverlay,Select  } from '@mantine/core';
import { useEffect, useState } from 'react';
import { useStyles } from './PlayStyle';
import { useMediaQuery } from '@mantine/hooks';
import {IconHelp} from '@tabler/icons';
import { showNotification } from '@mantine/notifications';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

import { GameScreen } from './GameScreen';
import { HelpSingleGameModal} from '../../components/Modals/HelpSingleGameModal';
import { HelpMultiplayerGame} from '../../components/Modals/HelpMultiplayerGameModal';

export function Play({gameParams,setGameParams,connectGame,gameScreen,setGameScreen}) {
    const { classes } = useStyles();
    const [mode, setMode] = useState('singleplayer');
    const [typeBet, setTypeBet] = useState('rating');
    const [loading, setLoading] = useState(false);
    const [singleGameHelpOpened, setSingleGameHelpOpened] = useState(false);
    const [multiplayerGameHelpOpened, setMultiplayerGameHelpOpened] = useState(false);
    const lobbies = [
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "125 💣", difficulty: 1},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1000 ⭐", difficulty: 2},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "5485 💣", difficulty: 3},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1054 ⭐", difficulty: 2},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "6254 ⭐", difficulty: 1},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1005 💣", difficulty: 3},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "125 💣", difficulty: 1},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1000 ⭐", difficulty: 2},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "5485 💣", difficulty: 3},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1054 ⭐", difficulty: 2},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "6254 ⭐", difficulty: 1},
        { name: "Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", bet: "1005 💣", difficulty: 3},
      ];
    const [size, setSize] = useState("10");
    const [difficulty, setDifficulty] = useState("easy");
    const [timeBet, setTimeBet] = useState("time_0");
    const [bets, setBets] = useState([
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_0' },
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_1' },
        { label: <div style={{display:"flex",alignItems:"center"}}>0 <img src={star} width={20}/></div>, value: 'time_2' },
    ]);
    // const [gameScreen, setGameScreen] = useState(false);
    const secondsToMS = (seconds) => {
        let minutes = Math.floor(seconds / 60);
        let secondsLeft = seconds % 60;
        return `${minutes}:${secondsLeft<10 ? "0":""}${secondsLeft}`;
    }
    useEffect(() => {
        const p = {
            "easy": 1,
            "medium": 2,
            "hard": 3
        }
        const pointsMin = p[difficulty]*(size*5+70);
        const timeMin = (p[difficulty]+2)*(size*2+Math.floor(size/2));

        setBets([
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin)} - {pointsMin} <img src={star} width={20} style={{marginLeft: 4}}/></div>, value: 'time_0' },
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin*2)} - {Math.floor(pointsMin*1.8)} <img src={star} width={20} style={{marginLeft: 4}}/></div>, value: 'time_1' },
            { label: <div style={{display:"flex",alignItems:"center"}}>{secondsToMS(timeMin*3)} - {Math.floor(pointsMin*1.9*1.9)} <img src={star} width={20} style={{marginLeft: 4}}/></div>, value: 'time_2' },
        ])
    },[size,difficulty])

    const startSingleGame =async () => {
        setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        //     setGameScreen(true);
        // }, 1000);

        ///game/start
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
                // title: "Error",
                message: response.message
            })
        }

    }
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <>
        {!gameScreen ? 
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
                            // defaultValue="r3ea7ct"
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
                                        { label: '10x10', value: 'rea7ct' },
                                        { label: '15x15', value: 'n9g' },
                                        { label: '20x20', value: 'n12g' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Сложность</div>
                                <SegmentedControl
                                    data={[
                                        { label: 'Легкая', value: 'r23ea7ct' },
                                        { label: 'Средняя', value: 'n29g' },
                                        { label: 'Сложная', value: '3n12g' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Тип ставки</div>
                                <SegmentedControl
                                    data={[
                                        { label: 'Рейтинг', value: 'rating' },
                                        { label: 'Бомбы', value: 'bomb' },
                                    ]}
                                    size={isMobile ? 'sm' : 'md'}
                                    onChange={(value) => setTypeBet(value)}
                                />
                            </div>
                            <div className={classes.settingsRow}>
                                <div>Ставка</div>
                                <Input style={{width:100}} size="md"  rightSection={<img width={24} src={typeBet == "bomb" ?bomb:star} alt="bomb"/>} />
                            </div>
                            <div className={classes.startGameRow}>
                                <Button fullWidth={true} variant="filled" radius="md" size="md" >
                                Создать лобби
                                </Button>
                                <IconHelp size={36} onClick={()=>setMultiplayerGameHelpOpened(true)}/>
                            </div>
                        </Grid.Col>
                        <Grid.Col span={4} >
                            {/* ScrollArea  */}
                            <ScrollArea  style={{ height: 260 }} offsetScrollbars scrollbarSize={6} scrollHideDelay={500}>
                                <div className={classes.lobbyRows}>
                                    {lobbies.map((lobby, index) => (
                                        <>
                                            <div className={classes.lobbyRowInfo}>
                                                <div className={classes.personInfo}>
                                                    <Avatar className={classes.avatar} src="https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4" alt="" radius="xl" size={44} />
                                                    <div className={classes.lobbyRowNameBet}>
                                                        <div>{lobby.name}</div>
                                                        <div>{lobby.bet} <Badge color={["","indigo","red"][lobby.difficulty-1]}>{["ЛЕГКО","СРЕДНЕ","СЛОЖНО"][lobby.difficulty-1]}</Badge></div>
                                                    </div>
                                                </div>
                                                <Button className={classes.enterGameBtn} variant="filled" radius="md" size="md" >
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
        <GameScreen gameParams={gameParams} setGameParams={setGameParams} connectGame={connectGame}/>}
        </>
    )
}