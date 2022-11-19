import { useState, useRef  } from 'react';
import { Modal, Button, Space,TextInput,PasswordInput,Text   } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { useMediaQuery } from '@mantine/hooks';
import { IconAt,IconLock,IconUser,IconAlertTriangle } from '@tabler/icons';
import { useNavigate } from "react-router-dom";

export function LoginModal({opened, closeModal,setUserAuth,setUser}) {
    const [modalType, setModalType] = useState("login");
    const isMobile = useMediaQuery('(max-width: 600px)');
    const navigate = useNavigate();
    const   email = useRef(null),
            password = useRef(null),
            login = useRef(null),
            password2 = useRef(null);
    const [regLoading, setRegLoading] = useState(false);
    const [logLoading, setLogLoading] = useState(false);

    const register = async () =>{
        if (login.current.value.length < 3) {
            return showNotification({
                message: 'Длина логина должна быть минимум 3 символа',
                color: 'red',
                icon: <IconAlertTriangle size={18}/>,
            })
        }
        if (!email.current.value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
            return showNotification({
                message: 'Неверный формат email',
                color: 'red',
                icon: <IconAlertTriangle size={18}/>,
            })
        }
        if (password.current.value !== password2.current.value) {
            return showNotification({
                message: 'Пароли не совпадают',
                color: 'red',
                icon: <IconAlertTriangle size={18}/>,
            })
        }
        if (password.current.value.length < 8  || password2.current.value.length < 8) {
            return showNotification({
                message: 'Длина пароля должна быть минимум 8 символов',
                color: 'red',
                icon: <IconAlertTriangle size={18}/>,
            })
        }
        setRegLoading(true);
        const raw = await fetch(process.env.REACT_APP_API_URL+"/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: login.current.value,
                email: email.current.value,
                password: password.current.value,
            })
        })
        const response = await raw.json();
        if(raw.ok){
            setUser(response);
            //set jwt to localstorage
            localStorage.setItem('token', `Bearer ${response.token}`);
            setRegLoading(false);
            setUserAuth(true);
            closeModal();
            navigate("/play");
            showNotification({
                message: "Регистрация прошла успешно",
            })
        }else{
            showNotification({
                message: response.message,
                color: 'red'
            })
            setRegLoading(false);
        }
        

    }

    const login_user = async () =>{
        if (login.current.value.length < 3) {
            return showNotification({
                message: 'Длина логина должна быть минимум 3 символа',
                color: 'red'
            })
        }
        if (password.current.value.length < 8) {
            return showNotification({
                message: 'Длина пароля должна быть минимум 8 символов',
                color: 'red'
            })
        }
        const raw = await fetch(process.env.REACT_APP_API_URL+"/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login.current.value,
                password: password.current.value,
            })
        })
        const response = await raw.json();
        console.log(raw);
        if(raw.ok){
            localStorage.setItem('token', `Bearer ${response.token}`);
            setUser(response);
            setLogLoading(false);
            setUserAuth(true);
            closeModal();
            navigate("/play");
            showNotification({
                message: "Авторизация прошла успешно",
            })
        }else{
            showNotification({
                message: response.message,
                color: 'red'
            })
            setLogLoading(false);
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
                <TextInput label="Логин" placeholder="Логин" icon={<IconUser size={14} />} radius={8} ref={login}/>
                <Space h="xs" />
                <PasswordInput
                    placeholder="Пароль"
                    label="Пароль"
                    icon={<IconLock size={16} />}
                    radius={8}
                    ref={password}
                />
                <Space h="md" />
                <Button fullWidth variant="fill" onClick={() => login_user()} loading={logLoading}>
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
                <Button fullWidth variant="fill" onClick={() => register()} loading={regLoading}>
                    Зарегестрироваться
                </Button>
                <Space h="xs" />
                <Text onClick={()=>setModalType("login")} size={14} align="center" color="dimmed" variant="link" style={{cursor: "pointer", userSelect:"none"}}>Уже есть аккаунт? Войдите</Text>
            </>}
        </Modal>

        </>
    );
}