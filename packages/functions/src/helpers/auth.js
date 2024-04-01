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
 * @param {order, shopifyDomain}
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
