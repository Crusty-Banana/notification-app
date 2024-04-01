import React, {useEffect, useState} from 'react';
import {
  Layout,
  Page,
  SkeletonPage,
  LegacyCard,
  LegacyTabs,
  SkeletonBodyText,
  SkeletonDisplayText
} from '@shopify/polaris';
import SettingTabs from '../../components/SettingTabs/SettingTabs';
import './Settings.css';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
import {api} from '../../helpers';
import defaultSettings from './defaultSetting';

/**
 * @return {JSX.Element}
 */
export default function Settings() {
  const [input, setInput] = useState(defaultSettings);
  const [loading, setLoading] = useState(false);
  const callApi = async () => {
    try {
      setLoading(true);
      await setInput(await api('/settings'));
      setLoading(false);
    } catch {
      setLoading(true);
      await setInput(await api('/settings/default'));
      setLoading(false);
      console.log("Shop don't have saved settings yet!");
    }
  };

  useEffect(() => {
    callApi();
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
          {loading ? (
            <SkeletonPage>
              <LegacyCard>
                <LegacyTabs
                  tabs={[
                    {
                      id: 'tab-1',
                      content: <SkeletonDisplayText />
                    },
                    {
                      id: 'tab-2',
                      content: <SkeletonDisplayText />
                    }
                  ]}
                >
                  <LegacyCard.Section title={'Apperance'}>
                    <SkeletonBodyText />
                  </LegacyCard.Section>
                </LegacyTabs>
              </LegacyCard>
            </SkeletonPage>
          ) : (
            <SettingTabs input={input} setInput={setInput} />
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
