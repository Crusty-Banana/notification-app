import React from 'react';
import './NoticationPopup.scss';
import {InlineStack, Text} from '@shopify/polaris';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Sport Sneaker',
  timestamp = 'a day ago',
  productImage = 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f98c48e5-bdfe-40e3-9cf1-c30da5d8dc56/structure-25-road-running-shoes-pxbP4c.png'
}) => {
  return (
    <div className="Avava-SP__Wrapper fadeInUp animated">
      <div className="Avava-SP__Inner">
        <div className="Avava-SP__Container">
          <a href="#" className={'Avava-SP__LinkWrapper'}>
            <div
              className="Avava-SP__Image"
              style={{
                backgroundImage: `url(${productImage})`
              }}
            ></div>
            <div className="Avada-SP__Content">
              <div className={'Avada-SP__Title'}>
                {firstName} in {city}, {country}
              </div>
              <div className={'Avada-SP__Subtitle'}>Purchased {productName}</div>
              <div className={'Avada-SP__Footer'}>
                <InlineStack>
                  <Text>{timestamp} </Text>
                  <span className="uni-blue">✔ by Avada</span>
                </InlineStack>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

NotificationPopup.propTypes = {};

export default NotificationPopup;
