import makeRequest from '../helpers/api/makeRequest';
import runtimeConfig from '../../../functions/.runtimeconfig.json';

export default class ApiManager {
  getNotifications = async () => {
    return this.getApiData();
  };

  getApiData = async () => {
    const shopifyDomain = window.Shopify.shop;
    const {notifications, settings} = await makeRequest(
      runtimeConfig.app.base_url +
        '/clientApi/notifications?shopDomain=' +
        shopifyDomain +
        '&shopId=xngVy2znnTBBj2Vddo7J'
    );

    return {notifications, settings};
  };
}
