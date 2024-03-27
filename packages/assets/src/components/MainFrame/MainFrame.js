import {Frame, TopBar, Navigation} from '@shopify/polaris';
import React, {useEffect} from 'react';
import {useState} from 'react';
import {useLocation} from 'react-router-dom';

import {NotificationIcon, SettingsIcon, HomeIcon} from '@shopify/polaris-icons';

import './MainFrame.css';

function MainFrame({children}) {
  const location = useLocation();
  const [selected, setSelected] = useState(0);
  useEffect(() => {
    const path = location.pathname;
    console.log(path);
    setSelected(path === '/embed/notifications' ? 1 : path === '/embed/settings' ? 2 : 0);
  }, [location]);
  const userMenuMarkup = <TopBar.UserMenu name="Avada" initials="A" />;

  const navigationMarkup = (
    <Navigation location="">
      <Navigation.Section
        items={[
          {
            label: 'Home',
            icon: HomeIcon,
            url: '/',
            selected: selected === 0 ? true : false,
            onClick: () => {
              setSelected(0);
            }
          },
          {
            label: 'Notifications',
            icon: NotificationIcon,
            url: '/notifications',
            selected: selected === 1 ? true : false,
            onClick: () => {
              setSelected(1);
            }
          },
          {
            label: 'Settings',
            icon: SettingsIcon,
            url: '/settings',
            selected: selected === 2 ? true : false,
            onClick: () => {
              setSelected(2);
            }
          }
        ]}
      />
    </Navigation>
  );
  const topBarMarkup = <TopBar showNavigationToggle userMenu={userMenuMarkup} />;

  const logo = {
    width: 86,
    topBarSource: 'https://i.imgur.com/0keLdNe.png',
    contextualSaveBarSource: 'https://i.imgur.com/0keLdNe.png',
    accessibilityLabel: 'Shopify'
  };

  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationMarkup}>
      {children}
    </Frame>
  );
}

export default MainFrame;
