import { Modal,Text,Space  } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

export function HelpSingleGameModal({opened, closeModal}) {
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <Modal
            radius={8}
            opened={opened}
            onClose={() => closeModal()}
            title={<Text size={20} weight="bold">Как играть в одиночную игру?</Text> }
            centered 
            fullScreen={isMobile} 
            size="lg"
        >
            <Text><b>Сапёр</b> - одна из самых популярных компьютерных игр-головоломок.</Text>
            <Space h="xs" />
            <Text><b>Цель</b> - открыть все поля без мин,а все мины пометить флажком.</Text>
            <Space h="xs" />
            <Text>При клике на поле,если на нём нет мин,то открывается пустое поле, на котором написано количество мин вокруг этой клетки. Если вокруг нет мин, то открываются следующие поля, до тех пор пока на границах не будут изображены цифры.</Text>
            <Text>Если на поле есть мина,то игра заканчивается поражением.</Text>
            <Space h="xs" />
            <Text>В одиночной игры вы можете выбрать сложность игры, размер карты и бонус. Бонус - это награда, которую вы получите, если пройдёте уровень за конкретное время. Например, если вы выбрали бонус 1:30 - 500 ⭐, то вы получите 500 рейтинга, если пройдёте игру не дольше, чем за 1 минуту 30 секунд.</Text>
        </Modal>
    )
}