import { Avatar, Card, Image, Text, Badge, Button, Group  } from '@mantine/core';
import { IconCloudUpload } from '@tabler/icons';
import { useStyles } from './ProfileStyle';

import star from '../../assets/svg/star.svg';
import bomb from '../../assets/svg/bomb.svg';

export function Profile() {
    const { classes } = useStyles();
    
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
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                    <br/>

                </Card>
            </div>
        </div>
    )
}