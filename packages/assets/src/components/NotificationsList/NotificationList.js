import React, {useEffect} from 'react';
import {
  LegacyCard,
  ResourceList,
  ResourceItem,
  Text,
  InlineStack,
  BlockStack,
  TextContainer,
  SkeletonDisplayText,
  SkeletonBodyText
} from '@shopify/polaris';
import {useState} from 'react';
import NotificationPopup from '../NotificationPopup/NotificationPopup';
import useFetchApi from '../../hooks/api/useFetchApi';

function NotificationsList() {
  const [sortValue, setSortValue] = useState('DATE_MODIFIED_DESC');
  const [selectedItems, setSelectedItems] = useState([]);
  const {fetchApi: fetchPopUps, data: popUps, setData: setPopUps, loading} = useFetchApi({
    url: '/notifications'
  });

  useEffect(() => {
    fetchPopUps();
  }, []);

  useEffect(() => {
    const sortedPopUps = [...popUps];
    if (sortValue === 'DATE_MODIFIED_DESC') {
      sortedPopUps.sort((a, b) => {
        return new Date(b.timestamp) - new Date(a.timestamp);
      });
    } else {
      sortedPopUps.sort((a, b) => {
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
    }
    setPopUps(sortedPopUps);
  }, [sortValue]);

  const resourceName = {
    singular: 'notification',
    plural: 'notifications'
  };
  const sortOptions = [
    {label: 'Newest created', value: 'DATE_MODIFIED_DESC'},
    {label: 'Oldest created', value: 'DATE_MODIFIED_ASC'}
  ];
  if (loading) {
    return (
      <React.Fragment>
        {[...Array(20)].map((_, index) => (
          <LegacyCard key={index}>
            <LegacyCard.Section>
              <TextContainer>
                <SkeletonDisplayText size="small" />
                <SkeletonBodyText />
              </TextContainer>
            </LegacyCard.Section>
          </LegacyCard>
        ))}
      </React.Fragment>
    );
  }
  return (
    <LegacyCard>
      <ResourceList
        resourceName={resourceName}
        items={popUps}
        renderItem={renderItem}
        sortValue={sortValue}
        sortOptions={sortOptions}
        onSortChange={setSortValue}
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
