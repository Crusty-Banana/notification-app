import {getNotifications} from '../repositories/notificationRepository';

/**
 * @param ctx
 * @returns {Promise<settings>}
 */
export async function getNotificationList(ctx) {
  const notifications = await getNotifications();
  ctx.body = notifications;
}
