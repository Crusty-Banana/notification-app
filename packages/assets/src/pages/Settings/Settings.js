import React from 'react';
import {Card, Layout, Page} from '@shopify/polaris';
import './Settings.css';
/**
 * @return {JSX.Element}
 */
export default function Settings() {
  return (
    <Page title="Settings" primaryAction={{content: 'Save'}}>
      <Layout sectioned>
        <Card sectioned>Settings 3</Card>
      </Layout>
    </Page>
  );
}

Settings.propTypes = {};
