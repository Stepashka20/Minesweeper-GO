import {Avatar,Badge   } from '@mantine/core';
import { createStyles } from '@mantine/core';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

const useStyles = createStyles((theme, _params, getRef) => ({
    tableHeader:{
        background: "#1A1B1E",
        backdropFilter: "blur(14px)",
        // maxWidth: 1400,
        height: "47px",
        borderRadius: "10px",
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
        margin: "0 auto",
        padding:"0 20px",
        marginBottom: 12,
        marginTop: 20
    },
    item: {
        display: "flex",
        alignItems: "center",
        height: "100%",
        fontWeight: 500,
        fontSize: "14px",
    },
    row:{
        background: "#1A1B1E",
        backdropFilter: "blur(14px)",
        // maxWidth: 1400,
        height: "47px",
        borderRadius: "10px",
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr 1fr",
        margin: "0 auto",
        padding:"0 20px",
        marginBottom: 12,
    },
    avatar:{
        marginRight: 8
    }
    
}));


export function HistoryTable({history}) {
    const { classes } = useStyles();
    // history = [
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 0, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 2, betValue: 432, betType: 1, result: 0},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Админчик", difficulty: 1, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Чё", difficulty: 2, betValue: 800, betType: 1, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 0, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 2, betValue: 432, betType: 1, result: 0},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Админчик", difficulty: 1, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Чё", difficulty: 2, betValue: 800, betType: 1, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 0, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 2, betValue: 432, betType: 1, result: 0},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Админчик", difficulty: 1, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Чё", difficulty: 2, betValue: 800, betType: 1, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 0, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Супер Валера", difficulty: 2, betValue: 432, betType: 1, result: 0},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Админчик", difficulty: 1, betValue: 200, betType: 0, result: 1},
    //     {avatarUrl: "https://avatars.githubusercontent.com/u/10353856?s=460&u=88394dfd67727327c1f7670a1764dc38a8a24831&v=4", name: "Чё", difficulty: 2, betValue: 800, betType: 1, result: 1},
    // ]
    if (history.length === 0) {
        return (<div style={{marginTop: 20, textAlign: "center"}}>Пусто :(</div>)
    }
    return ( 
        <>
            
            <div className={classes.tableHeader}>
                <div className={classes.item}>
                    Противник
                </div>
                <div className={classes.item}>
                    Сложность
                </div>
                <div className={classes.item}>
                    Ставка
                </div>
                <div className={classes.item}>
                    Результат
                </div>
            </div>
            <div className={classes.tableBody}>
                {history.map((item, index) => (
                    <div key={index} className={classes.row}>
                        <div className={classes.item}>
                            <Avatar className={classes.avatar} src={item.avatarUrl ? `${process.env.REACT_APP_API_URL}/cdn/avatar/${item.avatarUrl}`:""} alt="" radius="xl" size={38} />
                            <span className={classes.name}>{item.name}</span>
                        </div>
                        <div className={classes.item}>
                            {[ "Легко", "Средне", "Сложно"][item.difficulty]}
                        </div>
                        <div className={classes.item}>
                            {item.betValue} <img style={{marginLeft: 8}} width={16} src={item.betType == 0 ? bomb : star}/>
                        </div>
                        <div className={classes.item}>
                            {item.result == 0 ? <Badge variant="gradient" gradient={{ from: 'orange', to: 'red' }}>Поражение</Badge> : <Badge variant="gradient" gradient={{ from: 'teal', to: 'lime', deg: 105 }}>Победа</Badge>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}