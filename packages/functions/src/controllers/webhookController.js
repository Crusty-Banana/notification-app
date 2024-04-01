import {getShopByShopifyDomain} from '@avada/core';
import {orderToNotifications} from '../helpers/auth';
import {addNotifications} from '../repositories/notificationRepository';
import Shopify from 'shopify-api-node';

export async function listenNewOrder(ctx) {
  console.log('hello, im here');
  try {
    const shopifyDomain = ctx.get('X-Shopify-Shop-Domain');
    const order = ctx.req.body;
    const shop = await getShopByShopifyDomain(shopifyDomain);
    const shopify = new Shopify({
      shopName: shopifyDomain,
      accessToken: shop.accessToken
    });
    const product = await shopify.product.get(order.line_items[0].product_id);

    const notification = await orderToNotifications({
      shop,
      order,
      shopifyDomain,
      firstProduct: product
    });
    await addNotifications({shopId: shop.id, shopifyDomain, data: notification});

    return (ctx.body = {
      success: true
    });
  } catch (e) {
    console.error(e);
    return (ctx.body = {
      success: false
    });
  }
}
