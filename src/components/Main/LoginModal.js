import { useState, useRef  } from 'react';
import { Modal, Button, Space,TextInput,PasswordInput,Text   } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt,IconLock,IconUser,IconAlertTriangle } from '@tabler/icons';
import { useNavigate } from "react-router-dom";

export function LoginModal({opened, closeModal,setUser}) {
    const [modalType, setModalType] = useState("login");
    const isMobile = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const   email = useRef(null),
            password = useRef(null),
            login = useRef(null),
            password2 = useRef(null);

    const auth = () =>{
        console.log(email.current.value,password.current.value);
        if(email.current.value == "admin" && password.current.value == "admin"){
            setUser({auth: true});
            closeModal();
            navigate("/play");
        }
    }
    const register = () =>{
        console.log(login.current.value,email.current.value,password.current.value,password2.current.value);
        if (password.current.value !== password2.current.value) {
            showNotification({
                message: 'Пароли не совпадают',
                color: 'red',
                icon: <IconAlertTriangle size={18}/>,
            })
        }
    }
    return (
        <>
        <Modal
            radius={8}
            opened={opened}
            onClose={() => closeModal()}
            title={modalType=="login" ? <Text size={20} weight="bold">Авторизация</Text> : <Text size={20} weight="bold">Регистрация</Text>}
            centered 
            fullScreen={isMobile} 
        >
            {modalType=="login" ? <>
                <TextInput label="Email" placeholder="Email" icon={<IconAt size={14} />} radius={8} ref={email}/>
                <Space h="xs" />
                <PasswordInput
                    placeholder="Пароль"
                    label="Пароль"
                    icon={<IconLock size={16} />}
                    radius={8}
                    ref={password}
                />
                <Space h="md" />
                <Button fullWidth variant="fill" onClick={() => auth()}>
                    Войти
                </Button>
                <Space h="xs" />
                <Text onClick={()=>setModalType("register")} size={14} align="center" color="dimmed" variant="link" style={{cursor: "pointer", userSelect:"none"}}>Нет аккаунта? Зарегестрируйтесь</Text>
            </> : <>
                <TextInput label="Логин" placeholder="Придумайте логин" icon={<IconUser size={14} />} radius={8} ref={login}/>
                <Space h="xs" />
                <TextInput label="Email" placeholder="Email" type="email" icon={<IconAt size={14} />} radius={8} ref={email}/>
                <Space h="xs" />
                <PasswordInput
                    placeholder="Пароль"
                    label="Пароль"
                    icon={<IconLock size={16} />}
                    radius={8}
                    ref={password}
                />
                <Space h="xs" />
                <PasswordInput
                    placeholder="Повторите пароль"
                    label="Повторите пароль"
                    icon={<IconLock size={16} />}
                    radius={8}
                    ref={password2}
                />
                <Space h="md" />
                <Button fullWidth variant="fill" onClick={() => register()}>
                    Зарегестрироваться
                </Button>
                <Space h="xs" />
                <Text onClick={()=>setModalType("login")} size={14} align="center" color="dimmed" variant="link" style={{cursor: "pointer", userSelect:"none"}}>Уже есть аккаунт? Войдите</Text>
            </>}
        </Modal>

        </>
    );
}