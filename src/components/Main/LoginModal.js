import { useState } from 'react';
import { Modal, Button, Space,TextInput,PasswordInput,Text  } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt,IconLock,IconUser } from '@tabler/icons';


export function LoginModal({opened, closeModal}) {
    const [modalType, setModalType] = useState("login");
    const isMobile = useMediaQuery('(max-width: 600px)');
    return (
        <>
        <Modal
            opened={opened}
            onClose={() => closeModal()}
            title={modalType=="login" ? <Text size={20} weight="bold">Авторизация</Text> : <Text size={20} weight="bold">Регистрация</Text>}
            centered 
            fullScreen={isMobile} 
        >
            {modalType=="login" ? <>
                <TextInput label="Email" placeholder="Email" icon={<IconAt size={14} />} />
                <Space h="xs" />
                <PasswordInput
                    placeholder="Пароль"
                    label="Пароль"
                    icon={<IconLock size={16} />}
                />
                <Space h="md" />
                <Button fullWidth variant="fill" onClick={() => 1}>
                    Войти
                </Button>
                <Space h="xs" />
                <Text onClick={()=>setModalType("register")} size={14} align="center" color="dimmed" variant="link" style={{cursor: "pointer", userSelect:"none"}}>Нет аккаунта? Зарегестрируйтесь</Text>
            </> : <>
                <TextInput label="Логин" placeholder="Придумайте логин" icon={<IconUser size={14} />} />
                <Space h="xs" />
                <TextInput label="Email" placeholder="Email" type="email" icon={<IconAt size={14} />} />
                <Space h="xs" />
                <PasswordInput
                    placeholder="Пароль"
                    label="Пароль"
                    icon={<IconLock size={16} />}
                />
                <Space h="xs" />
                <PasswordInput
                    placeholder="Повторите пароль"
                    label="Повторите пароль"
                    icon={<IconLock size={16} />}
                />
                <Space h="md" />
                <Button fullWidth variant="fill" onClick={() => 1}>
                    Зарегестрироваться
                </Button>
                <Space h="xs" />
                <Text onClick={()=>setModalType("login")} size={14} align="center" color="dimmed" variant="link" style={{cursor: "pointer", userSelect:"none"}}>Уже есть аккаунт? Войдите</Text>
            </>}
        </Modal>

        </>
    );
}