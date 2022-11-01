import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { useStyles } from './ShopStyle';
import bomb from '../../assets/svg/bomb.svg';
export function Product({image, title, price, description}) {
    const { classes } = useStyles();
    
    return (
        <Card shadow="sm" p="lg" radius="md" withBorder className={classes.card}>
            <Card.Section>
                <Image
                    src={image}
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

            <Button variant="filled" color="blue" fullWidth mt="md" radius="md">
                Купить
            </Button>
        </Card>
    )
}