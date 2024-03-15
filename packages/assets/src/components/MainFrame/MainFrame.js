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
    setSelected(path === '/embed' ? 0 : path === '/embed/settings' ? 2 : 1);
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
    topBarSource:
      'https://s3-alpha-sig.figma.com/img/66f5/d160/93cd24e048cf62f7be519066a8949e25?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ht2frANf3cyOk-eKRi4ruLhev93aOz3BhLmBhXrU93-2Ppx5zPCstzPtq-brYeVhgrdLvtwRiUh9kU3tAw6o7XdVJZVh66YP94HpnFJ2jnsKpLugFflyIJq~h-5N7RvoKj1voAcEAZI8bDgjyufCLfroOqwxOFdb3NMrOsybJ9ktWkatryax7-VOd1pTFioT-UrfQkOlIDihOTa9S3GuzRQhHWHdrFLSC7a-GydUY3BZ0oSmFqaq5yTPD2pkrNqdroOE3loHqyyZuZ7ANS9uoFffYNXYYwRKJ53uG42A4NaKnefBnxzgdaE3cBQ2s-0djHPcsKftn-z-2Wv3bkg6PA__',
    contextualSaveBarSource:
      'https://s3-alpha-sig.figma.com/img/66f5/d160/93cd24e048cf62f7be519066a8949e25?Expires=1711324800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ht2frANf3cyOk-eKRi4ruLhev93aOz3BhLmBhXrU93-2Ppx5zPCstzPtq-brYeVhgrdLvtwRiUh9kU3tAw6o7XdVJZVh66YP94HpnFJ2jnsKpLugFflyIJq~h-5N7RvoKj1voAcEAZI8bDgjyufCLfroOqwxOFdb3NMrOsybJ9ktWkatryax7-VOd1pTFioT-UrfQkOlIDihOTa9S3GuzRQhHWHdrFLSC7a-GydUY3BZ0oSmFqaq5yTPD2pkrNqdroOE3loHqyyZuZ7ANS9uoFffYNXYYwRKJ53uG42A4NaKnefBnxzgdaE3cBQ2s-0djHPcsKftn-z-2Wv3bkg6PA__',
    accessibilityLabel: 'Shopify'
  };

  return (
    <Frame logo={logo} topBar={topBarMarkup} navigation={navigationMarkup}>
      {children}
    </Frame>
  );
}

export default MainFrame;
