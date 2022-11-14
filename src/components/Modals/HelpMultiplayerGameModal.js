import { Modal,Text,Space,List  } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function HelpMultiplayerGame({opened, closeModal}) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Modal
            radius={8}
            opened={opened}
            onClose={() => closeModal()}
            title={<Text size={20} weight="bold">Как играть в многопользовательскую игру?</Text> }
            centered 
            fullScreen={isMobile} 
            size="lg"
        >
            <Text>Правила игры почти такие же, как и в обычном сапёре (узнать их можно из меню одиночной игры), но добавляется соревновательный момент.</Text>
            <Space h="xs" />
            <Text><b>Цель</b> - открыть все поля без мин быстрее противника,а все мины пометить флажком.</Text>
            <Space h="xs" />
            <Text>В начале игры вы также выбираете размер поля и сложность игры. Далее выбираете, на что вы хотите играть: рейтинг или бомбы, а затем создаёте лобби</Text>
            <Text>Другой игрок присоединяется к вам и игра начинается.</Text>
            <List>
                <List.Item>Если вы попали на мину,а противник прошёл игру - то вы проиграли</List.Item>
                <List.Item>Если вы оба попали на мину, то побеждает тот, кто набрал больше очков</List.Item>
                <List.Item>Если вы оба прошли игру, то побеждает тот, кто прошёл быстрее</List.Item>
            </List>
        </Modal>
    )
}