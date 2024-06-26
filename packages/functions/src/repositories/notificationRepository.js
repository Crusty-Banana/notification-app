import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

/**
 * @param id
 * @returns {Promise<{Notifications}>}
 */
export async function getNotifications(query) {
  let docs = collection;
  for (const key in query) {
    if (query.hasOwnProperty(key)) {
      docs = docs.where(key, '==', query[key]);
    }
  }
  docs = await docs.get();
  const docsWithId = docs.docs.map(doc => presentDataAndFormatDate(doc));
  return {success: true, data: docsWithId};
}

export async function addNotifications(notification) {
  await collection.add(notification);
  return {success: true};
}

export async function deleteAllNotifications() {
  const notifications = await collection.get();
  await Promise.all(notifications.docs.map(doc => doc.ref.delete()));

  return {success: true};
}
