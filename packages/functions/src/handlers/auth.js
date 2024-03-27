import App from 'koa';
import 'isomorphic-fetch';
import {contentSecurityPolicy, shopifyAuth} from '@avada/core';
import shopifyConfig from '@functions/config/shopify';
import render from 'koa-ejs';
import path from 'path';
import createErrorHandler from '@functions/middleware/errorHandler';
import firebase from 'firebase-admin';
import appConfig from '@functions/config/app';
import serviceAccount from '../../serviceAccount.development.json';
import Shopify from 'shopify-api-node';
import {getShopByShopifyDomain} from '@avada/core';
import {addNotifications, deleteAllNotifications} from '../repositories/notificationRepository';
import {putSettingById} from '../repositories/settingRepository';
import {orderToNotifications} from '../helpers/auth';
import defaultSettings from './defaultSetting';

if (firebase.apps.length === 0) {
  firebase.initializeApp({credential: firebase.credential.cert(serviceAccount)});
}
// Initialize all demand configuration for an application
const app = new App();
app.proxy = true;

render(app, {
  cache: true,
  debug: false,
  layout: false,
  root: path.resolve(__dirname, '../../views'),
  viewExt: 'html'
});
app.use(createErrorHandler());
app.use(contentSecurityPolicy(true));

// Register all routes for the application
app.use(
  shopifyAuth({
    apiKey: shopifyConfig.apiKey,
    firebaseApiKey: shopifyConfig.firebaseApiKey,
    scopes: shopifyConfig.scopes,
    secret: shopifyConfig.secret,
    successRedirect: '/embed',
    initialPlan: {
      id: 'free',
      name: 'Free',
      price: 0,
      trialDays: 0,
      features: {}
    },
    hostName: appConfig.baseUrl,
    isEmbeddedApp: true,
    afterThemePublish: ctx => {
      // Publish assets when theme is published or changed here
      return (ctx.body = {
        success: true
      });
    },
    afterLogin: async ctx => {
      try {
        const shopifyDomain = ctx.state.shopify.shop;
        const shop = await getShopByShopifyDomain(shopifyDomain);
        const shopify = new Shopify({
          shopName: 'newavadastore',
          accessToken: shop.accessToken
        });
        Promise.all([putSettingById('default', defaultSettings), deleteAllNotifications()]);
        // TODO: use skeleton for loading, use prefetch product.

        const orders = await shopify.order.list({limit: 30});
        const productIds = [...new Set(orders.map(order => order.line_items[0].product_id))];
        const products = {};
        await Promise.all(
          productIds.map(id => {
            const fetchProduct = async id => {
              const product = await shopify.product.get(id);
              products[id] = {
                title: product.title,
                image: product.images[0]
                  ? product.images[0].src
                  : 'https://static.nike.com/a/images/t_PDP_1280_v1/f_auto,q_auto:eco/f98c48e5-bdfe-40e3-9cf1-c30da5d8dc56/structure-25-road-running-shoes-pxbP4c.png'
              };
            };
            return fetchProduct(id);
          })
        );

        await Promise.all(
          orders.map(order => {
            const notification = orderToNotifications({shop, order, shopifyDomain, products});
            return addNotifications(notification);
          })
        );
      } catch (e) {
        console.error(e);
      }
    }
  }).routes()
);

// Handling all errors
app.on('error', err => {
  console.error(err);
});

export default app;
