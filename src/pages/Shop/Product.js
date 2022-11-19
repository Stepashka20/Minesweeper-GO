import {useState} from 'react';
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useStyles } from './ShopStyle';
import { showNotification } from '@mantine/notifications';
import bomb from '../../assets/svg/bomb.svg';
export function Product({id,image, title, price, description,isBuyed,isActivated,setUser,user}) {
    const { classes } = useStyles();
    const [buying,setBuying] = useState(false);
    const buyItem =async  () => {
        console.log("buying");
        setBuying(true);
        const raw = await fetch(`${process.env.REACT_APP_API_URL}/shop/buy/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
        const response = await raw.json();
        console.log(response);
        console.log(raw.ok)
        if (raw.ok){
            setUser({...user, balance: response.balance,
                items: response.items})
            showNotification({
                message: response.message,
            })
        } else {
            showNotification({
                message: response.message,
                color: 'red'
            })
        }
        setBuying(false);

    }

    const activateItem =async  () => {
        console.log("activating");
        setBuying(true);
        const raw = await fetch(`${process.env.REACT_APP_API_URL}/shop/activate/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
        const response = await raw.json();
        console.log(response);
        console.log(raw.ok)
        if (raw.ok){
            setUser({...user, 
                activeItems: response.activeItems,
                shop: response.shop
            })
            showNotification({
                message: response.message,
            })
        } else {
            showNotification({
                message: response.message,
                color: 'red'
            })
        }
        setBuying(false);

    }

    const deactivateItem =async  () => {
        console.log("deactivating");
        setBuying(true);
        const raw = await fetch(`${process.env.REACT_APP_API_URL}/shop/deactivate/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem("token")
            },
        })
        const response = await raw.json();
        console.log(response);
        console.log(raw.ok)
        if (raw.ok){
            setUser({...user, 
                activeItems: response.activeItems,
                shop: response.shop
            })
            showNotification({
                message: response.message,
            })
        } else {
            showNotification({
                message: response.message,
                color: 'red'
            })
        }
        setBuying(false);

    }
    var button = null
    if (isBuyed) {
        if (isActivated) {
            button = <Button variant="outline" color="red" fullWidth mt="md" radius="md" loading={buying} onClick={()=>deactivateItem()}>Деактивировать</Button>
        } else {
            button = <Button variant="outline" color="blue" fullWidth mt="md" radius="md" loading={buying} onClick={()=>activateItem()}>Активировать</Button>
        }
    } else {
        button = <Button variant="filled" color="blue" fullWidth mt="md" radius="md" onClick={()=>buyItem()} loading={buying}>Купить</Button>
    }
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder className={classes.card}>
            <Card.Section>
                <Image
                    src={`${process.env.REACT_APP_API_URL}/cdn/shop/${image}`}
                    alt="orangeNickname"
                />
            </Card.Section>

            <Group position="left" mt="md" mb="xs" className={classes.topCard}>
                <Text weight={500}>{title}</Text>
                <Badge size="lg" color="lime" variant="light">
                    <span  className={classes.priceBadge}>
                        {price} <img src={bomb} width="18px" style={{marginLeft: 4}}/>
                    </span>
                
                </Badge>
            </Group>

            <Text size="sm" color="dimmed">
                {description}
            </Text>
            {button}
        </Card>
    )
}