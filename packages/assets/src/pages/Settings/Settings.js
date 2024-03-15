import React from 'react';
import {Layout, Page} from '@shopify/polaris';
import SettingTabs from '../../components/SettingTabs/SettingTabs';
import './Settings.css';
import NotificationPopup from '../../components/NotificationPopup/NotificationPopup';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  return (
    <Page
      title="Settings"
      primaryAction={{content: 'Save'}}
      subtitle="Decide how your notifications will display"
    >
      <Layout>
        <Layout.Section variant="oneThird">
          <NotificationPopup />
        </Layout.Section>
        <Layout.Section>
          <SettingTabs />
        </Layout.Section>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
