import {useState, useEffect} from 'react';
import { Avatar, Card, FileButton, Text, Badge, Button, Grid   } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { IconCloudUpload, IconHistory, IconChartBar } from '@tabler/icons';
import { useStyles } from './ProfileStyle';
import { StatisticCard } from './StatisticCard'
import { HistoryTable } from './HistoryTable'
import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

import time from './time.png'
import game from './game.png'
import cup from './cup.png'
export function Profile({user,setUser}) {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    const [avatarFile, setAvatarFile] = useState(null);
    const [avatarUploading, setAvatarUploading] = useState(false);
    useEffect(() => {
        async function uploadAvatar() {
            if (avatarFile) {
                console.log(avatarFile)
                if (avatarFile.size > 1024 * 1024) {
                    showNotification({
                        message: 'Размер аватарки не должен превышать 1 МБ',
                        color: 'red'
                    })
                    setAvatarFile(null);
                    return
                }
                setAvatarUploading(true);
                const formData = new FormData();
                formData.append('file', avatarFile);
                const raw = await fetch(process.env.REACT_APP_API_URL+"/upload", {
                    method: 'POST',
                    headers: {
                        authorization: localStorage.getItem('token')
                    },
                    body: formData
                })
                const response = await raw.json();
                if (raw.ok){
                    showNotification({
                        message: response.message,
                        color: 'green'
                    })
                    setUser({...user, avatar: response.url})
                } else {
                    showNotification({
                        message: response.message,
                        color: 'red'
                    })
                }
                setAvatarUploading(false);
            }
        }
        uploadAvatar();
    }, [avatarFile]);
    const msToMMSS = (ms) => {
        let seconds = Math.floor((ms / 1000) % 60);
        let minutes = Math.floor((ms / (1000 * 60)) % 60);

        seconds = seconds < 10 ? '0' + seconds : seconds;
        minutes = minutes < 10 ? '0' + minutes : minutes;

        return minutes + ':' + seconds;
    }
    const getWinPercent = (wins, games) => {
        if (games === 0) return "0 %";
        return Math.round(wins / games * 100) + " %";
    }

    return ( 
        <div className={classes.root}>
            <div className={classes.container}>
                <Card shadow="sm" p="lg" radius="md" withBorder className={classes.userAvatarUploadCard}>
                    <Avatar style={user.shop.avatarBorder ? {border: `3px solid ${user.shop.avatarBorder}`} : {}} src={user.avatar ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${user.avatar}`:""} size="xl"  radius={50}/>
                    <Text weight="bold" style={user.shop.usernameColor ? {color:user.shop.usernameColor } : {}}>{user.username}</Text>
                    <Text className={classes.textWithImage}>Баланс: {user.balance} <img src={star} width={16} style={{marginLeft: 8}}/></Text>
                    <Text className={classes.textWithImage}>Рейтинг: {user.rating} <img src={bomb} width={16} style={{marginLeft: 8}}/></Text>
                    
                    <FileButton onChange={setAvatarFile} accept="image/png,image/jpeg,image/jpg">
                        {(props) => 
                            <Button {...props} loading={avatarUploading} variant="light" color="blue" fullWidth mt="md" radius="md" leftIcon={<IconCloudUpload/>}>
                                Загрузить аватар
                            </Button>
                        }
                    </FileButton>
                </Card>
                <Card shadow="sm" p="lg" radius="md" withBorder className={classes.userInfo}>
                    <Grid justify="space-around">
                        <Grid.Col span={4} style={{flexBasis: isMobile?"100%":"40%",maxWidth: isMobile?"100%":"40%"}}>
                            <Text size={24} weight="light" style={{marginBottom: 20, marginLeft: 20, display: "flex", alignItems: "center"}}><IconChartBar style={{marginRight: 8}}/>Статистика</Text>
                            <StatisticCard
                                totalLabel="Лучшее время"
                                img={time}
                                
                                difficulty={[
                                    {label: "Лёгкая", time: msToMMSS(user.statistics.bestTime.easy)},
                                    {label: "Средняя", time: msToMMSS(user.statistics.bestTime.medium)},
                                    {label: "Сложная", time: msToMMSS(user.statistics.bestTime.hard)},
                                ]}
                            />
                            <StatisticCard
                                totalLabel="Количество игр"
                                img={game}
                                difficulty={[
                                    {label: "Лёгкая", time: user.statistics.games.easy},
                                    {label: "Средняя", time: user.statistics.games.medium},
                                    {label: "Сложная", time: user.statistics.games.hard},
                                ]}
                            />
                            <StatisticCard
                                totalLabel="Процент побед"
                                img={cup}
                                difficulty={[
                                    {label: "Лёгкая", time: getWinPercent(user.statistics.wins.easy, user.statistics.games.easy)},
                                    {label: "Средняя", time: getWinPercent(user.statistics.wins.medium, user.statistics.games.medium)},
                                    {label: "Сложная", time: getWinPercent(user.statistics.wins.hard, user.statistics.games.hard)},
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col span={4} style={{flexBasis: isMobile?"100%":"60%",maxWidth: isMobile?"100%":"60%"}}>
                            <Text size={24} weight="light" style={{display: "flex", alignItems: "center"}}><IconHistory style={{marginRight: 8}}/> История игр</Text>
                            <HistoryTable history={user.gameHistory}/>
                        </Grid.Col>
                    </Grid>
                </Card>
            </div>
        </div>
    )
}