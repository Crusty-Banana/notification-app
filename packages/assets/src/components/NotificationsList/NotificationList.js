import React, {useEffect} from 'react';
import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  InlineStack,
  BlockStack
} from '@shopify/polaris';
import {useState} from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import {api} from '../../helpers';

function NotificationsList() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);
  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };

  const items = [
    {
      firstName: 'Jack',
      city: 'Hanoi',
      country: 'Vietnam',
      productName: 'Shoes',
      timestamp: 'Now',
      productImage:
        'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f98c48e5-bdfe-40e3-9cf1-c30da5d8dc56/structure-25-road-running-shoes-pxbP4c.png'
    }
  ];
  const [popUps, setPopUps] = useState(items);

  const fetchPopUps = async () => {
    const url = '/notifications';
    setPopUps(await api(url));
  };

  useEffect(() => {
    fetchPopUps();
  }, []);

  useEffect(() => {
    const sortedPopUps = [...popUps];
    if (sortValue === 'DATE_MODIFIED_DESC') {
      sortedPopUps.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    } else {
      sortedPopUps.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    }
    setPopUps(sortedPopUps);
  }, [sortValue]);

  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={popUps}
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
    const {id, city, country, firstName, timestamp, productImage, productName} = item;
    const modifiedAt = new Date(timestamp);
    const daysAgo = Math.floor((new Date() - modifiedAt) / (1000 * 60 * 60 * 24));
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    return (
      <ResourceItem id={id}>
        <InlineStack align="space-between">
          <NotificationPopup
            firstName={firstName}
            city={city}
            country={country}
            productName={productName}
            timestamp={daysAgo + ' day(s) ago'}
            productImage={productImage}
          />
          <BlockStack inlineAlign="end">
            <Text>
              From {months[modifiedAt.getMonth()]} {modifiedAt.getDate()},
            </Text>
            <Text>{modifiedAt.getFullYear()}</Text>
          </BlockStack>
        </InlineStack>
      </ResourceItem>
    );
  }
}

export default NotificationsList;
