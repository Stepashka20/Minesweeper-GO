import { Avatar, Card, Image, Text, Badge, Button, Grid   } from '@mantine/core';
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
export function Profile() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    return ( 
        <div className={classes.root}>
            <div className={classes.container}>
                <Card shadow="sm" p="lg" radius="md" withBorder className={classes.userAvatarUploadCard}>
                    <Avatar src="https://avatars.githubusercontent.com/u/14338007?v=4" size="xl"  radius={50}/>
                    <Text weight="bold">Stepashka20</Text>
                    <Text className={classes.textWithImage}>Баланс: 5000 <img src={star} width={16} style={{marginLeft: 8}}/></Text>
                    <Text className={classes.textWithImage}>Рейтинг: 5000 <img src={bomb} width={16} style={{marginLeft: 8}}/></Text>
                    <Button variant="light" color="blue" fullWidth mt="md" radius="md" leftIcon={<IconCloudUpload/>}>
                        Загрузить аватар
                    </Button>
                </Card>
                <Card shadow="sm" p="lg" radius="md" withBorder className={classes.userInfo}>
                    <Grid justify="space-around">
                        <Grid.Col span={4} style={{flexBasis: isMobile?"100%":"40%",maxWidth: isMobile?"100%":"40%"}}>
                            <Text size={24} weight="light" style={{marginBottom: 20, marginLeft: 20, display: "flex", alignItems: "center"}}><IconChartBar style={{marginRight: 8}}/>Статистика</Text>
                            <StatisticCard
                                totalLabel="Лучшее время"
                                img={time}
                                
                                difficulty={[
                                    {label: "Лёгкая", time: "1:20"},
                                    {label: "Средняя", time: "4:20"},
                                    {label: "Сложная", time: "8:37"},
                                ]}
                            />
                            <StatisticCard
                                totalLabel="Количество игр"
                                img={game}
                                difficulty={[
                                    {label: "Лёгкая", time: "20"},
                                    {label: "Средняя", time: "55"},
                                    {label: "Сложная", time: "64"},
                                ]}
                            />
                            <StatisticCard
                                totalLabel="Процент побед"
                                img={cup}
                                difficulty={[
                                    {label: "Лёгкая", time: "33 %"},
                                    {label: "Средняя", time: "50 %"},
                                    {label: "Сложная", time: "15 %"},
                                ]}
                            />
                        </Grid.Col>
                        <Grid.Col span={4} style={{flexBasis: isMobile?"100%":"60%",maxWidth: isMobile?"100%":"60%"}}>
                            <Text size={24} weight="light" style={{display: "flex", alignItems: "center"}}><IconHistory style={{marginRight: 8}}/> История игр</Text>
                            <HistoryTable/>
                        </Grid.Col>
                    </Grid>
                </Card>
            </div>
        </div>
    )
}