import { SegmentedControl, Box, Button, Grid,Input,Divider ,Avatar,Badge,ScrollArea,Transition      } from '@mantine/core';
import { useState } from 'react';
import { useStyles } from './PlayStyle';
import video from "./1234462006.mp4"


import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

import "./Play.css";
export function Play() {
    const { classes } = useStyles();
    const [mode, setMode] = useState('singleplayer');
    const [typeBet, setTypeBet] = useState('rating');
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
    const isMobile = window.innerWidth < 768;
    return (
        <>
            {/* <video id="background-video" autoPlay loop muted controls>
                <source src={video} type="video/mp4"/>
            </video> */}
            {/* <video width="750" height="500"  loop>
                <source src={video} type="video/mp4"/>
            </video> */}
            <div className={classes.centered}>
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
                        <div>Ставка</div>
                        <SegmentedControl
                            data={[
                                { label: '1:20 - 500', value: 'r3ea7ct' },
                                { label: '3:20 - 300', value: 'n39g' },
                                { label: '4:20 - 100', value: 'n312g' },
                            ]}
                            size={isMobile ? 'sm' : 'md'}
                        />
                    </div>
                    <Button fullWidth={true} variant="filled" radius="md" size="md" >
                        Начать игру
                    </Button>
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
                            <Button fullWidth={true} variant="filled" radius="md" size="md" >
                                Создать лобби
                            </Button>
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
    )
}