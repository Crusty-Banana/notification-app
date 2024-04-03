import React from 'react';
import {Page} from '@shopify/polaris';
import NotificationsList from '../../components/NotificationsList/NotificationList';
/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  return (
    <Page title="Notifications" subtitle="List of sales notificaition from Shopify" fullWidth>
      <NotificationsList />
    </Page>
  );
}
