import React, { useEffect, useState }  from"react";
import { MantineProvider, Text } from '@mantine/core';
import { HeaderResponsive } from './components/Header/Header';
import {IconGolf,IconTrophy,IconShoppingCart,IconUser} from '@tabler/icons';
import { BrowserRouter as Router, useLocation,Route,Routes  } from 'react-router-dom';

import {Main} from './pages/Main/Main';
import {Play} from './pages/Play/Play';
import {Top} from './pages/Top/Top';
import {Shop} from './pages/Shop/Shop';
import {Profile} from './pages/Profile/Profile';
export default function App() {

  const [user, setUser] = useState({
    auth: true,
  });
  // const [page, setPageg] = useState('#play');
  //arrow function auth
  const auth =async () => {
    setUser({ auth: true });
  };
  // const setPage = (page) => {
  //   setPageg(page);
  // };
  return (
    <Router>
        <MantineProvider withGlobalStyles withNormalizeCSS theme={{
            colorScheme: 'dark'}}>
            <HeaderResponsive auth={auth} links={user.auth ? [
            {
                label: 'Играть',
                link: '/play',
                icon: <IconGolf/>
            },
            {
                label: 'Топ',
                link: '/top',
                icon: <IconTrophy/>
            },
            {
                label: 'Магазин',
                link: '/shop',
                icon: <IconShoppingCart/>
            },
            {
                label: 'Профиль',
                link: '/profile',
                icon: <IconUser/>
            },
            ] : []} />
            {/* <Main/> */}
            {/* <Play/> */}
            {/* <Top/> */}
            {/* <Shop/> */}
            <Routes>
                <Route path="/main" element={<Main />} />
                <Route path="/play" element={<Play />} />
                <Route path="/top" element={<Top />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/profile" element={<Profile />} />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>

        </MantineProvider>
    </Router>
    
  );
}