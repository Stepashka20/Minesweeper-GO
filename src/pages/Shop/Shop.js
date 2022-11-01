import { useStyles } from './ShopStyle';
import {  Text, Group } from '@mantine/core';

import {Product} from './Product';
import yellowNickname from '../../assets/img/shop/yellow_nickname.png';
import orangeNickname from '../../assets/img/shop/orange_nickname.png';
export function Shop() {
    const { classes } = useStyles();
    
    return (
        <div className={classes.root}>
            <Text size="xl" weight={700} className={classes.sectionTitle}>Кастомизация никнейма</Text>

            <Group className={classes.products} >
                <Product
                    image={yellowNickname}
                    title="Желтый ник"
                    price="100"
                    description="Цвет никнейма в топе и в профиле будет жёлтым"
                />
                <Product
                    image={orangeNickname}
                    title="Оранжевый ник"
                    price="120"
                    description="Цвет никнейма в топе и в профиле будет оранжевым"
                />
                <Product
                    image={yellowNickname}
                    title="Синий ник"
                    price="100"
                    description="Цвет никнейма в топе и в профиле будет жёлтым"
                />
                <Product
                    image={orangeNickname}
                    title="Красный ник"
                    price="120"
                    description="Цвет никнейма в топе и в профиле будет оранжевым"
                />
                <Product
                    image={yellowNickname}
                    title="RGB ник"
                    price="1000"
                    description="Цвет никнейма будет переливаться разными цветами"
                />
            </Group>

            <Text size="xl" weight={700} className={classes.sectionTitle}>Кастомизация аватарки</Text>
            <Group className={classes.products} >
                <Product
                    image={yellowNickname}
                    title="Желтый ник"
                    price="100"
                    description="Цвет никнейма в топе и в профиле будет жёлтым"
                />
                <Product
                    image={orangeNickname}
                    title="Оранжевый ник"
                    price="120"
                    description="Цвет никнейма в топе и в профиле будет оранжевым"
                />
                <Product
                    image={yellowNickname}
                    title="Синий ник"
                    price="100"
                    description="Цвет никнейма в топе и в профиле будет жёлтым"
                />
                <Product
                    image={orangeNickname}
                    title="Красный ник"
                    price="120"
                    description="Цвет никнейма в топе и в профиле будет оранжевым"
                />
                <Product
                    image={yellowNickname}
                    title="RGB ник"
                    price="1000"
                    description="Цвет никнейма будет переливаться разными цветами"
                />
            </Group>
            
        </div>
    )
}