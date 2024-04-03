import {getNotifications} from '../repositories/notificationRepository';
import {getSettingById} from '../repositories/settingRepository';

/**
 * @param ctx
 * @returns {Promise<Data>}
 * @sample https://kit-intro-sie-fda.trycloudflare.com/clientApi/notifications?shopDomain=newavadastore.myshopify.com&shopId=xngVy2znnTBBj2Vddo7J
 */
export async function getData(ctx) {
  const query = ctx.req.query;
  const shopId = query.shopId;
  const settings = await getSettingById(shopId);

  const notifications = await getNotifications(query);

  ctx.body = {data: {settings, notifications}};
}
