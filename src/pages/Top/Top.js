import { BackgroundImage,Avatar, Button } from '@mantine/core';

import { useStyles } from './TopStyle';
import posterImg from '../../assets/img/header_new.webp';
import cup from '../../assets/svg/cup.svg';
import star from '../../assets/svg/star.svg';
import {IconQuestionMark,IconInfoCircle} from '@tabler/icons';

export function Top({top}) {
    const { classes } = useStyles();

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
                    {top.map((user, index) => (
                        <div key={index} className={classes.topRow}>
                            <div className={classes.item}> {index+1} </div>
                            <div className={classes.item}>
                                <Avatar className={classes.avatar} style={user.shop.avatarBorder ? {border: `3px solid ${user.shop.avatarBorder}`} : {}} src={user.avatar ? `${process.env.REACT_APP_API_URL}/cdn/${user.avatar}`:""} alt="" radius="xl" size={38} />
                                <span className={classes.name} style={user.shop.usernameColor ? {color:user.shop.usernameColor } : {}}>{user.username}</span>
                            </div>
                            <div className={classes.item}> {user.rating} <img style={{marginLeft: 8}} width={16} src={star}/> </div>
                            <div className={classes.item}> {user.wins} </div>
                            <div className={classes.item}> {user.losses} </div>
                            <div className={classes.item}> {+(user.wins/user.losses).toFixed(2) || 0} </div>
                        </div>
                    ))}
                    
                </div>
            </div>
           

        </div>
    )
}