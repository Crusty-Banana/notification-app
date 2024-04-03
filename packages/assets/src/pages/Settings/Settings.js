import React, {useEffect} from 'react';
import {Layout, Page, SkeletonPage, SkeletonBodyText} from '@shopify/polaris';
import SettingTabs from '../../components/SettingTabs/SettingTabs';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import defaultSettings from './defaultSetting';
import useFetchApi from '../../hooks/api/useFetchApi';
import useEditApi from '../../hooks/api/useEditApi';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const {fetchApi: fetchSettings, data: settings, setData: setSettings, loading} = useFetchApi({
    url: '/settings',
    defaultData: defaultSettings
  });
  const {handleEdit: editSettigns} = useEditApi({url: '/settings'});

  useEffect(() => {
    fetchSettings();
    console.log(settings);
  }, []);

  const saveSettings = async () => {
    await editSettigns(settings);
  };
  if (loading) {
    return (
      <SkeletonPage
        fullWidth
        title="Settings"
        primaryAction={{content: 'Save'}}
        subtitle={<SkeletonBodyText>asfdfafdafdsafd</SkeletonBodyText>}
      >
        <Layout>
          <Layout.Section variant="oneThird">
            <NotificationPopup />
          </Layout.Section>
          <Layout.Section>
            <SettingTabs input={settings} setInput={setSettings} loading={true} />
          </Layout.Section>
        </Layout>
      </SkeletonPage>
    );
  }
  return (
    <Page
      fullWidth
      title="Settings"
      primaryAction={{content: 'Save', onAction: saveSettings}}
      subtitle="Decide how your notifications will display"
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup />
        </Layout.Section>
        <Layout.Section>
          <SettingTabs input={settings} setInput={setSettings} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
