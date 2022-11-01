import React, { useEffect, useState }  from"react";
import { MantineProvider, Text } from '@mantine/core';
import { HeaderResponsive } from './components/Header/Header';
import {IconGolf,IconTrophy,IconShoppingCart,IconUser} from '@tabler/icons';

import {Main} from './pages/Main/Main';
import {Play} from './pages/Play/Play';
import {Top} from './pages/Top/Top';
import {Shop} from './pages/Shop/Shop';
export default function App() {
  const [user, setUser] = useState({
    auth: true,
  });
  const [page, setPageg] = useState('#play');
  //arrow function auth
  const auth =async () => {
    setUser({ auth: true });
  };
  const setPage = (page) => {
    setPageg(page);
  };
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={{
      colorScheme: 'dark'}}>
      <HeaderResponsive setPage={setPage} page={page} auth={auth} links={user.auth ? [
        {
          label: 'Играть',
          link: '#play',
          icon: <IconGolf/>
        },
        {
          label: 'Топ',
          link: '#top',
          icon: <IconTrophy/>
        },
        {
          label: 'Магазин',
          link: '#shop',
          icon: <IconShoppingCart/>
        },
        {
          label: 'Профиль',
          link: '#profile',
          icon: <IconUser/>
        },
      ] : []} />
      {/* <Main/> */}
      {/* <Play/> */}
      {/* <Top/> */}
      {/* <Shop/> */}
      {page === '#main' && <Main/>}
      {page === '#play' && <Play/>}
      {page === '#top' && <Top/>}
      {page === '#shop' && <Shop/>}

    </MantineProvider>
    
  );
}