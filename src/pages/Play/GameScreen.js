import { Grid,Card,Avatar,Text,Space,Badge,Divider,Progress,Button,Indicator,ScrollArea     } from '@mantine/core';
import { useStyles } from './GameScreenStyle';
import { useMediaQuery } from '@mantine/hooks';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

import ScrollContainer from 'react-indiana-drag-scroll'
export function GameScreen() {
    const { classes } = useStyles();
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <div className={classes.centered}>
            <Grid>
                <Grid.Col span="auto">
                    
                    <Card shadow="sm" p="lg" radius="md" withBorder>
                        <Text weight="bold" fz="md" color="white" align="center">Игроки</Text>
                        <Space h="xs" />
                        <div className={classes.flexCenter}>
                            <Avatar src="https://avatars.githubusercontent.com/u/14338007?v=4" size={60}  radius={50}/>
                                <div style={{marginLeft: 8}}>
                                    <Text weight="bold">Stepashka20</Text>
                                    <Text className={classes.flexCenter}>Рейтинг: 5000 <img src={bomb} width={16} style={{marginLeft: 8}}/></Text>
                                </div>
                        </div>
                        <Space h="xs" />
                        <div className={classes.flexCenter}>
                            <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" size={60}  radius={50}/>
                                <div style={{marginLeft: 8}}>
                                    <Text weight="bold">ValeraNatural</Text>
                                    <Text className={classes.flexCenter}>Рейтинг: 856 <img src={bomb} width={16} style={{marginLeft: 8}}/></Text>
                                </div>
                        </div>

                    </Card>
                    <Space h="lg" />
                    <Card shadow="sm" radius="md" withBorder p="lg">
                        <Text weight="bold" fz="md" color="white" align="center">Текущие результаты</Text>
                        <Space h="xs" />
                        <div className={classes.flexCenter}>
                            <Indicator dot inline offset={7} position="top-end" label={1} size={22} withBorder>
                                <Avatar src="https://avatars.githubusercontent.com/u/14338007?v=4" size={60}  radius={50}/>
                            </Indicator>
                                <div style={{marginLeft: 8}}>
                                    <Text weight="bold">Stepashka20</Text>
                                    <Text className={classes.flexCenter}>Очки: 323</Text>
                                </div>
                        </div>
                        <Space h="xs" />
                        <div className={classes.flexCenter}>
                            <Indicator dot inline  offset={7} position="top-end" label={2} size={22} withBorder>
                                <Avatar src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=250&q=80" size={60}  radius={50}/>
                            </Indicator>
                                <div style={{marginLeft: 8}}>
                                    <Text weight="bold">ValeraNatural</Text>
                                    <Text className={classes.flexCenter}>Очки: 234</Text>
                                </div>
                        </div>
                    </Card>
                </Grid.Col>
                <Grid.Col span={6} className={classes.gameGrid} style={isMobile?{flexBasis:"100%",maxWidth:"100%"}:{}}>
                    <Card shadow="sm" p={isMobile ? 0 : "lg"} radius="md" withBorder>
                    {/* <SimpleGrid cols={10}>
                        {[...Array(100)].map((item,i) => (
                            <div className={classes.box}>
                                {i+1}
                            </div>
                        ))}
                    </SimpleGrid> */}
                    {/* Generate table 10x10 */}
                    {/* <table>
                        <tbody>
                            {[...Array(10)].map((item,i) => (
                                <tr>
                                    {[...Array(10)].map((item,i) => (
                                        <td className={classes.box}>
                                            
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table> */}
                    <ScrollContainer className="scroll-container">
                        <div className={classes.table}>
                            {[...Array(400)].map((item,i) => (
                                <div className={classes.box}>
                                    {/* {i+1} */}
                                </div>
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
                    <Text>Прошло времени: 1:23</Text>
                    <Text>Порог: 2:30</Text>
                    <Progress size={6} value={50} />
                    <Divider my="sm" />
                    <Button fullWidth>Покинуть игру</Button>
                    </Card>
                </Grid.Col>
            </Grid>
        </div>
    )
}