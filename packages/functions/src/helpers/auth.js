import {deleteAllNotifications, addNotifications} from '../repositories/notificationRepository';
import runtimeConfig from '../../.runtimeconfig.json';
/**
 * Get current shop id from Koa context
 * Shop ID was set from authentication step in Shopify login
 *
 * @param {object} ctx
 * @return {string}
 */
export function getCurrentShop(ctx) {
  return getCurrentUser(ctx).shopID;
}

/**
 * Get current user from Koa context
 *
 * @param ctx
 * @returns {IUserContext}
 */
export function getCurrentUser(ctx) {
  return ctx.state.user;
}

/**
 * Order to Notification
 *
 * @param {shop, order, shopifyDomain, firstProduct}
 * @return notification
 */
export function orderToNotifications({shop, order, shopifyDomain, firstProduct}) {
  try {
    return {
      city: order.billing_address.city,
      country: order.billing_address.country,
      firstName: order.billing_address.first_name,
      productId: order.line_items[0].product_id,
      productImage: firstProduct.image,
      productName: firstProduct.title,
      timestamp: order.created_at,
      shopDomain: shopifyDomain,
      shopId: shop.id
    };
  } catch (e) {
    console.log(e);
  }
}

/**
 * Pre-fetch Products
 *
 * @param {productIds, shopify}
 * @return products
 */

export async function prefetchProducts({productIds, shopify}) {
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
  return products;
}

/**
 * Sync Notifications
 *
 * @param {productIds, shopify}
 * @return
 */

export async function syncNotifications({orders, shop, shopifyDomain, products}) {
  await deleteAllNotifications();
  await Promise.all(
    orders.map(order => {
      const notification = orderToNotifications({
        shop,
        order,
        shopifyDomain,
        firstProduct: products[order.line_items[0].product_id]
      });
      return addNotifications(notification);
    })
  );
}

/**
 * Delete Webhooks
 *
 * @param {shopify}
 */

export async function deleteWebhook({shopify}) {
  const webhookList = await shopify.webhook.list();
  await Promise.all(
    webhookList
      .filter(hook => hook.topic === 'orders/create')
      .map(hook => shopify.webhook.delete(hook.id))
  );
}

/**
 * Register Webhook
 *
 * @param {shopify}
 */

export async function registerWebhook({shopify}) {
  try {
    await deleteWebhook({shopify});
    await shopify.webhook.create({
      address: 'https://' + runtimeConfig.app.base_url + '/webhook/order/new',
      topic: 'orders/create',
      format: 'json'
    });
    console.log('Done registering webhooks');
  } catch (e) {
    throw new Error('Error: ' + e + ' from registering webhooks');
  }
}

/**
 * Register Scripttag
 *
 * @param {shopify}
 */

export async function registerScripttag({shopify}) {
  try {
    await shopify.scriptTag.create({
      event: 'onload',
      src: 'https://localhost:3000/scripttag/avada-sale-pop.min.js'
    });
    console.log('Done registering scripttag');
  } catch (e) {
    throw new Error('Error: ' + e + ' from registering scripttag');
  }
}

/**
 * Sync Notifications
 *
 * @param {productIds, shopify}
 */

export async function fetchAndSyncNotifications({shopify, shopifyDomain, shop}) {
  try {
    const orders = await shopify.order.list({limit: 30});
    const productIds = [...new Set(orders.map(order => order.line_items[0].product_id))];
    const products = await prefetchProducts({productIds, shopify});
    await syncNotifications({orders, shop, shopifyDomain, products});
    console.log('Done fetch and sync notification');
  } catch (e) {
    throw new Error('Error: ' + e + ' from fetch and syncing notifications');
  }
}
