import React, {useEffect, useState} from 'react';
import {Layout, Page} from '@shopify/polaris';
import SettingTabs from '../../components/SettingTabs/SettingTabs';
import './Settings.css';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import defaultSettings from '../../components/SettingTabs/defaultSetting';
import {api} from '../../helpers';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [input, setInput] = useState(defaultSettings);
  const callApi = async () => {
    try {
      await setInput(await api('/settings'));
    } catch {
      console.log("Shop don't have saved settings yet!");
    }
  };

  useEffect(() => {
    callApi();
    console.log(input);
  }, []);

  const saveInput = async () => {
    await api('/settings', {body: input, method: 'PUT'});
  };
  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save', onAction: saveInput}}
      subtitle="Decide how your notifications will display"
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup />
        </Layout.Section>
        <Layout.Section>
          <SettingTabs input={input} setInput={setInput} />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
