
import {useEffect,useState} from 'react';

import { Grid,Card,Avatar,Text,Space,Badge,Divider,Progress,Button,Indicator,ScrollArea     } from '@mantine/core';
import { useStyles } from './GameScreenStyle';
import { useMediaQuery } from '@mantine/hooks';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';
import flag from '../../assets/svg/flag.svg';

  
import ScrollContainer from 'react-indiana-drag-scroll'
export function GameScreen({gameParams,setGameParams,connectGame}) {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [game,setGame] = useState(null)
    const open = (event,i) => {
        event.preventDefault();
        if (event.button === 0) {     
            game.openCell(i)
        } else {
            game.flagCell(i)
        }


    }
    function sort_by_key(array, key) {
        return array.sort(function(a, b) {
            var x = a[key]; var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }
    useEffect(() => {
        (async () => {
            console.log("connecting");
            setGame(await connectGame(gameParams.uid));
        })();
    },[])


    const progressEnd = gameParams.timeStart + gameParams.timeBet*1000
    const progressStart = gameParams.timeStart

    const [progress, setProgress] = useState(100);
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now()
            if (now > progressEnd){
                setProgress(0)
                return clearInterval(interval);
            } else {
                setProgress(100 - (now - progressStart)/(progressEnd - progressStart)*100)
            }
            console.log(progress)
        }, 1000);
    }, []);


    return (
        <div className={classes.centered}>
            <Grid>
                <Grid.Col span="auto">
                    
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Text weight="bold" fz="md" color="white" align="center">Игроки</Text>
                        <Space h="xs" />
                        {gameParams.players.map((player,i) => (
                            <>
                            {i !== 0 && <Space h="xs" />}
                            <div className={classes.flexCenter}>
                                <Avatar src={ player.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${player.avatar}` : ""} size={60}  radius={50}/>
                                    <div style={{marginLeft: 8}}>
                                        <Text weight="bold">{player.username}</Text>
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
                        {sort_by_key(gameParams.players).map((player,i) => (
                            <>
                                {i !== 0 && <Space h="xs" />}
                                <div className={classes.flexCenter}>
                                    <Indicator dot inline  offset={7} position="top-end" label={i+1} size={22} withBorder>
                                        <Avatar src={ player.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${player.avatar}` : ""} size={60}  radius={50}/>
                                    </Indicator>
                                        <div style={{marginLeft: 8}}>
                                            <Text weight="bold">{player.username}</Text>
                                            <Text className={classes.flexCenter}>Очки: {player.points}</Text>
                                        </div>
                                </div>
                            </>
                        ))}
                    </Card>
                </Grid.Col>
                <Grid.Col span={6} className={classes.gameGrid} style={isMobile?{flexBasis:"100%",maxWidth:"100%"}:{}}>
                    <Card shadow="sm" p={isMobile ? 0 : "lg"} radius="md" withBorder>
                    <ScrollContainer className="scroll-container">
                        <div className={classes.table} >
                            {/* style={{width: isMobile && size==10 ? "600px" : "800px"}}       
                              style={{width: !isMobile?`calc(100% / ${size})`:{"10":`calc(100% / ${size})`,"15":`calc(100% / ${size})`,"20":15}[size]}} 
                              ...Array(size*size)
                              */}
                            {gameParams.field.map((item,i) => (
                                <>
                                {item==-2 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`}} onClick={(event)=>open(event,i)} onContextMenu={(e)=>open(e,i)}>
                                     
                                </div>}
                                {item==-1 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`,background:"none",border:"none"}} >
                                    <img src={bomb} className={classes.flag} width={16}/>
                                </div>}
                                {item>=0 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`,background:"none",border:"none"}}>
                                    <div className={classes.number}>{item}</div>
                                </div>}
                                {item==-3 && <div className={classes.box} style={{width: `calc(100% / ${gameParams.gameParams.size})`}} onClick={(event)=>open(event,i)}>
                                    <img src={flag} className={classes.flag} width={16}/>
                                </div>}
                                </>
                            ))}
                        </div>
                    </ScrollContainer>
                    

                    </Card>
                </Grid.Col>
                <Grid.Col span="auto" className={classes.topPlayers}>
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                    <Text weight="bold" fz="md" color="white" align="center">Об игре</Text>
                    <Space h="xs" />
                    <Text>Размер карты: <Badge>10x10</Badge></Text>
                    <Text>Сложность: <Badge>легко</Badge></Text>
                    <Text className={classes.flexCenter}>Награда: 564 <img src={star} width={16} style={{marginLeft: 8}}/></Text>
                    <Divider my="sm" />
                    <Text>Осталось времени:</Text>
                    <Progress size={10} value={progress}/>
                    <Divider my="sm" />
                    <Button fullWidth>Покинуть игру</Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}