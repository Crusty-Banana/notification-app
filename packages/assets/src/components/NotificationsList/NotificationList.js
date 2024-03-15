import React from 'react';
import {
  LegacyCard,
  ResourceList,
  Avatar,
  ResourceItem,
  Text,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import {useState} from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';

function NotificationsList() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);
  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const items = [
    {
      id: '1',
      url: '#',
      name: 'Mae Jemison',
      location: 'Decatur, USA'
    },
    {
      id: '206',
      url: '#',
      name: 'Ellen Ochoa',
      location: 'Los Angeles, USA'
    }
  ];

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={items}
        renderItem={renderItem}
        sortValue={sortValue}
        sortOptions={[
          {label: 'Newest update', value: 'DATE_MODIFIED_DESC'},
          {label: 'Oldest update', value: 'DATE_MODIFIED_ASC'}
        ]}
        onSortChange={selected => {
          setSortValue(selected);
          console.log(`Sort option changed to ${selected}.`);
        }}
        selectedItems={selectedItems}
        onSelectionChange={setSelectedItems}
        selectable={true}
        pagination={{
          hasNext: true,
          onNext: () => {}
        }}
      />
    </LegacyCard>
  );

  function renderItem(item) {
    const {id, url, name, location} = item;

    return (
      <ResourceItem id={id} url={url}>
        <InlineStack align="space-between">
          <NotificationPopup firstName={name} />
          <BlockStack inlineAlign="end">
            <Text>From March 8,</Text>
            <Text>2021</Text>
          </BlockStack>
        </InlineStack>
      </ResourceItem>
    );
  }
}

export default NotificationsList;
