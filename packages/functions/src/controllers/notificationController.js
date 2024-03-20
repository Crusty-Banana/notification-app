import {addNotifications, getNotifications} from '../repositories/notificationRepository';

/**
 * @param ctx
 * @returns {Promise<settings>}
 */
export async function getNotificationList(ctx) {
  const notifications = await getNotifications();
  ctx.body = notifications;
}

export async function addNotificationByOrder(ctx) {
  const notification = ctx.req.body;
  ctx.body = await addNotifications(notification);
}
