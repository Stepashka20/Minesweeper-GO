import { useStyles } from './ShopStyle';
import {  Text, Group } from '@mantine/core';

import {Product} from './Product';

export function Shop({shopItems,user,setUser}) {
    const { classes } = useStyles();

    
    return (
        <div className={classes.root}>
            {
                Object.keys(shopItems).map((key) => {
                    return (
                        <div>
                            <Text size="xl" weight={700} className={classes.sectionTitle}>{shopItems[key][0].typeLabel}</Text>
                            <Group className={classes.products}>
                                {
                                    shopItems[key].map((item) => {
                                        console.log(item.id,user.items.includes(item.id),user.activeItems[key] == item.id)
                                        return (
                                            <Product 
                                                setUser={setUser}
                                                user={user}
                                                id={item.id}
                                                image={item.item.img}
                                                title={item.item.name}
                                                price={item.item.price}
                                                description={item.item.description}
                                                isBuyed={user.items.includes(item.id)}
                                                isActivated={user.activeItems[key] == item.id}
                                            />
                                        )
                                    })
                                }
                            </Group>
                        </div>
                    )
                })
            }
            
            
        </div>
    )
}