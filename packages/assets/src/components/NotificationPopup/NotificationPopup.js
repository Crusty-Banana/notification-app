import React from 'react';
import './NoticationPopup.scss';
import {InlineStack, Text} from '@shopify/polaris';

const NotificationPopup = ({
  firstName = 'John Doe',
  city = 'New York',
  country = 'United States',
  productName = 'Sport Sneaker',
  timestamp = 'a day ago',
  productImage = 'https://img.freepik.com/premium-photo/new-hallowen-pictuer_995828-5383.jpg?w=1480'
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
