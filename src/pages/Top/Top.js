import { BackgroundImage,Avatar, Button } from '@mantine/core';

import { useStyles } from './TopStyle';
import posterImg from '../../assets/img/header_new.webp';
import cup from '../../assets/svg/cup.svg';
import star from '../../assets/svg/star.svg';
import {IconQuestionMark,IconInfoCircle} from '@tabler/icons';

export function Top() {
    const { classes } = useStyles();
    const topUsers = [
        {name:"Stepashka20", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", totalPoints: 19000, wins: 100, looses: 34},
        {name:"SuperValerka", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", totalPoints: 10800, wins:98, looses: 11},
        {name:"WTF", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", totalPoints: 6782, wins: 45, looses: 11},
        {name:"TOMATO", avatar: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", totalPoints: 476, wins: 12, looses: 4},
    ]
    return (
        <div>
            <BackgroundImage
                src={posterImg}
                radius="sm"
                className={classes.poster}
            >
                <div className={classes.posterTitle}>
                    <img src={cup}/> MINESWEEPER GO  LEADERS
                </div>
                <div className={classes.posterDescription}>
                    Соревнуйся с игроками и поднимайся по рейтинговой системе!
                </div>
                <div className={classes.posterBtns}>
                    <Button leftIcon={<IconInfoCircle/>} color="teal" variant="outline" size="sm" style={{marginRight: 12,marginBottom: 12}}>
                        Как зарабатывать очки?
                    </Button>
                    <Button leftIcon={<IconQuestionMark/>}  color="teal" variant="outline" size="sm">
                        Как устроен лидерборд?
                    </Button>
                </div>
            </BackgroundImage>
            <div className={classes.table}>
                <div className={classes.topHeader}>
                    <div className={classes.item}>
                        Позиция
                    </div>
                    <div className={classes.item}>
                        Игрок
                    </div>
                    <div className={classes.item}>
                        Всего очков
                    </div>
                    <div className={classes.item}>
                        Победы
                    </div>
                    <div className={classes.item}>
                        Поражения
                    </div>
                    <div className={classes.item}>
                        W/L
                    </div>
                </div>
                <div className={classes.topBody}>
                    {topUsers.map((user, index) => (
                        <div key={index} className={classes.topRow}>
                            <div className={classes.item}> {index+1} </div>
                            <div className={classes.item}>
                                <Avatar className={classes.avatar} src={user.avatar} alt="" radius="xl" size={38} />
                                <span className={classes.name}>{user.name}</span>
                            </div>
                            <div className={classes.item}> {user.totalPoints} <img style={{marginLeft: 8}} width={16} src={star}/> </div>
                            <div className={classes.item}> {user.wins} </div>
                            <div className={classes.item}> {user.looses} </div>
                            <div className={classes.item}> {+(user.wins/user.looses).toFixed(2)} </div>
                        </div>
                    ))}
                    
                </div>
            </div>
           

        </div>
    )
}