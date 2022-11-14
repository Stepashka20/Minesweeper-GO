import { useStyles } from './ShopStyle';
import {  Text, Group } from '@mantine/core';

import {Product} from './Product';
import yellowNickname from '../../assets/img/shop/yellow_nickname.png';
import orangeNickname from '../../assets/img/shop/orange_nickname.png';
import blueNickname from '../../assets/img/shop/blue_nickname.png';
import whiteNickname from '../../assets/img/shop/white_nickname.png';
import redNickname from '../../assets/img/shop/red_nickname.png';

import yellow_ava_border from '../../assets/img/shop/yellow_ava_border.png';
import orange_ava_border from '../../assets/img/shop/orange_ava_border.png';
import blue_ava_border from '../../assets/img/shop/blue_ava_border.png';
import white_ava_border from '../../assets/img/shop/white_ava_border.png';
import red_ava_border from '../../assets/img/shop/red_ava_border.png';
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
                    image={blueNickname}
                    title="Синий ник"
                    price="100"
                    description="Цвет никнейма в топе и в профиле будет синим"
                />
                <Product
                    image={whiteNickname}
                    title="Белый ник"
                    price="120"
                    description="Цвет никнейма в топе и в профиле будет белым"
                />
                <Product
                    image={redNickname}
                    title="Красный ник"
                    price="300"
                    description="Цвет никнейма в топе и в профиле будет красным"
                />
            </Group>

            <Text size="xl" weight={700} className={classes.sectionTitle}>Кастомизация аватарки</Text>
            <Group className={classes.products} >
                <Product
                    image={yellow_ava_border}
                    title="Желтая рамка"
                    price="100"
                    description="Цвет рамки аватарки в топе и профиле будет жёлтым"
                />
                <Product
                    image={orange_ava_border}
                    title="Оранжевая рамка"
                    price="120"
                    description="Цвет рамки аватарки в топе и профиле будет оранжевым"
                />
                <Product
                    image={blue_ava_border}
                    title="Синяя рамка"
                    price="100"
                    description="Цвет рамки аватарки в топе и профиле будет синим"
                />
                <Product
                    image={white_ava_border}
                    title="Белая рамка"
                    price="120"
                    description="Цвет рамки аватарки в топе и профиле будет белым"
                />
                <Product
                    image={red_ava_border}
                    title="Красная рамка"
                    price="1000"
                    description="Цвет рамки аватарки в топе и профиле будет красным"
                />
            </Group>
            
        </div>
    )
}