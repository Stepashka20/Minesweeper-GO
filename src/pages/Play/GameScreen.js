
import {useEffect,useState} from 'react';
import { useLongPress } from 'use-long-press';
import { Grid,Card,Avatar,Text,Space,Badge,Divider,Progress,Button,Indicator,SegmentedControl     } from '@mantine/core';
import { useStyles } from './GameScreenStyle';
import {  useMediaQuery } from '@mantine/hooks';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';
import flag from '../../assets/svg/flag.svg';
import shovel from '../../assets/svg/shovel.svg';

  
import ScrollContainer from 'react-indiana-drag-scroll'
export function GameScreen({gameParams,setGameParams,connectGame}) {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [game,setGame] = useState(null)
    const [clickType,setClickType] = useState("shovel")
    const [currentPlayersResults,setCurrentPlayersResults] = useState(gameParams.players)
    const open = (event,i) => {
        event.preventDefault();
        if (!isMobile){
            if (event.button === 0) {     
                game.openCell(i)
            } else {
                game.flagCell(i)
            }
        } else {
            if (clickType === "shovel"){
                game.openCell(i)
            } else {
                game.flagCell(i)
            }
        }

    }
    const leaveGame = () => {
        game.leaveGame()

    }
    function sort_by_key(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x > y) ? -1 : ((x < y) ? 1 : 0));
        });
    }
    useEffect(() => {
        (async () => {
            console.log("connecting");
            setGame(await connectGame(gameParams.uid));
        })();
    },[])
    useEffect(() => {
        console.log(gameParams)
        let copy = [...gameParams.players]
        setCurrentPlayersResults(sort_by_key(copy,"points"))
    },[gameParams])

    const progressEnd = gameParams.timeStart + gameParams.timeBet*1000
    const progressStart = gameParams.timeStart

    const [progress, setProgress] = useState(100);
    useEffect(() => {
        if (gameParams.mode == "multiplayer") return
        var interval = null;  
        interval = setInterval(() => {
            const now = Date.now()
            if (now > progressEnd){
                setProgress(0)
                clearInterval(interval);
            } else {
                setProgress(100 - (now - progressStart)/(progressEnd - progressStart)*100)
            }
            // console.log(progress)
        }, 1000);
    }, []);
    const bind = useLongPress((i) => {
        // game.flagCell(i)
    },{
        threshold: 100,
        captureEvent: true,
        detect: 'both',
        filterEvents: event => true,

    });

    return (
        <div className={classes.centered} >
            <Grid>
                <Grid.Col span="auto">
                    
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Text weight="bold" fz="md" color="white" align="center">Игроки</Text>
                        <Space h="xs" />
                        {gameParams.players.map((player,i) => (
                            <>
                            {i !== 0 && <Space h="xs" />}
                            <div className={classes.flexCenter}>
                            <Avatar src={ player.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${player.avatar}` : ""} size={60}  radius={50} style={player.customisation.avatarBorder ? {border: `3px solid ${player.customisation.avatarBorder}`} : {}} />
                                    <div style={{marginLeft: 8}}>
                                        <Text weight="bold" style={player.customisation.usernameColor ? {color:player.customisation.usernameColor } : {}}>{player.username}</Text>
                                        <Text className={classes.flexCenter}>Рейтинг: {player.rating} <img src={star} width={16} style={{marginLeft: 8}}/></Text>
                                    </div>
                            </div>
                            </>
                        ))}

                    </Card>
                    <Space h="lg" />
                    <Card shadow="sm" radius="md" withBorder p="lg">
                        <Text weight="bold" fz="md" color="white" align="center">Текущие результаты</Text>
                        <Space h="xs" />
                        {currentPlayersResults.map((player,i) => (
                            <>
                                {i !== 0 && <Space h="xs" />}
                                <div className={classes.flexCenter}>
                                    <Indicator dot inline  offset={7} position="top-end" label={i+1} size={22} withBorder>
                                        <Avatar src={ player.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${player.avatar}` : ""} size={60}  radius={50} style={player.customisation.avatarBorder ? {border: `3px solid ${player.customisation.avatarBorder}`} : {}} />
                                    </Indicator>
                                        <div style={{marginLeft: 8}}>
                                            <Text weight="bold" style={player.customisation.usernameColor ? {color:player.customisation.usernameColor } : {}}>{player.username}</Text>
                                            <Text className={classes.flexCenter}>Очки: {player.points}</Text>
                                        </div>
                                </div>
                            </>
                        ))}
                    </Card>
                    
                </Grid.Col>
                <Grid.Col span={6} className={classes.gameGrid} style={isMobile?{flexBasis:"100%",maxWidth:"100%"}:{}}>
                    <Card shadow="sm" p={isMobile ? 0 : "lg"} radius="md" withBorder>
                    <ScrollContainer className="scroll-container" >
                        <div className={classes.table} >
                            {/* style={{width: isMobile && size==10 ? "600px" : "800px"}}       
                              style={{width: !isMobile?`calc(100% / ${size})`:{"10":`calc(100% / ${size})`,"15":`calc(100% / ${size})`,"20":15}[size]}} 
                              ...Array(size*size)
                              */}
                            {gameParams.field.map((item,i) => (
                                <>
                                {item==-2 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`}} onClick={(event)=>open(event,i)} onContextMenu={(e)=>open(e,i)} {...bind(i)}>
                                     
                                </div>}
                                {item==-1 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`,background:"none",border:"none"}} >
                                    <img src={bomb} className={classes.flag} width={16}/>
                                </div>}
                                {item>=0 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`,background:"none",border:"none"}}>
                                    {item>0 && <Text weight="bold" color={["#339AF0","#51CF66","#FF6B6B","#364FC7","#A52A2A","#30d5c8","#000","#fff"][item]}>{item}</Text>}
                                </div>}
                                {item==-3 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`}} onClick={(event)=>open(event,i)} onContextMenu={(e)=>open(e,i)} {...bind(i)}>
                                    <img src={flag} className={classes.flag} width={16}/>
                                </div>}
                                </>
                            ))}
                        </div>
                    </ScrollContainer>
                    

                    </Card>
                </Grid.Col>
                <Grid.Col span="auto" className={classes.topPlayers}>
                    {isMobile && 
                    <>
                    <SegmentedControl
                        data={[
                            { label: <img src={shovel}  width={16}/>, value: 'shovel' },
                            { label: <img src={flag} width={16}/>, value: 'flag' },        
                        ]}
                        size="md"
                        fullWidth={isMobile}
                        onChange={(value) => setClickType(value)}
                        value={clickType}
                    />
                    <Space h="xs" />
                    </>}
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Text weight="bold" fz="md" color="white" align="center">Об игре</Text>
                        <Space h="xs" />
                        <Text>Размер карты: <Badge>{gameParams.gameParams.size} x {gameParams.gameParams.size}</Badge></Text>
                        <Text>Сложность: <Badge color={{"easy":"","medium":"orange","hard":"red"}[gameParams.gameParams.difficulty]}>{{"easy":"легко","medium":"средне","hard":"тяжело"}[gameParams.gameParams.difficulty]}</Badge></Text>
                        <Text strikethrough={progress == 0} className={classes.flexCenter}>Награда: {gameParams.gameParams.reward.bombs > 0 ? gameParams.gameParams.reward.bombs : gameParams.gameParams.reward.stars} <img src={gameParams.gameParams.reward.bombs > 0 ? bomb : star} width={16} style={{marginLeft: 8}}/></Text>
                        {gameParams.mode != "multiplayer" ? <>
                            <Divider my="sm" />
                            <Text>Осталось времени:</Text>
                            <Progress size={10} value={progress}/>
                        </> : null}
                        <Divider my="sm" />
                        <Button fullWidth onClick={()=>leaveGame()}>Завершить игру</Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}