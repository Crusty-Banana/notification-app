import React from 'react';
import {
  ResourceItem,
  ResourceList,
  Page,
  useIndexResourceState,
  Text,
  Avatar
} from '@shopify/polaris';
import useFetchApi from '@assets/hooks/api/useFetchApi';
import NotificationsList from '../../components/NotificationsList/NotificationList';
/**
 * Just render a sample page
 *
 * @return {React.ReactElement}
 * @constructor
 */
export default function Notifications() {
  const {data: todos, loading} = useFetchApi({url: '/samples'});

  return (
    <Page title="Notifications" subtitle="List of sales notificaition from Shopify">
      <NotificationsList />
    </Page>
  );
}
