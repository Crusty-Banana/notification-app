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
import defaultSettings from '../../../assets/src/pages/Settings/defaultSetting';

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
        const orders = await shopify.order.list({limit: 30});
        const db = firebase.firestore();
        const notifications = await db.collection('notifications').get();
        notifications.forEach(async doc => {
          doc.ref.delete();
        });
        orders.forEach(async order => {
          const firstProduct = await shopify.product.get(order.line_items[0].product_id);
          await db.collection('notifications').add({
            city: order.billing_address.city,
            country: order.billing_address.country,
            firstName: order.billing_address.first_name,
            productId: order.line_items[0].product_id,
            productImage: firstProduct.images[0].src,
            productName: firstProduct.title,
            timestamp: order.created_at,
            shopDomain: shopifyDomain,
            shopId: shop.id
          });

          await db
            .collection('settings')
            .doc('default')
            .set(defaultSettings);
        });
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
