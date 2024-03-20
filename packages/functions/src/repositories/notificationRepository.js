import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('notifications');

/**
 * @param id
 * @returns {Promise<{Notifications}>}
 */
export async function getNotifications() {
  const docs = await collection.get();
  const docsWithId = docs.docs.map(doc => {
    return presentDataAndFormatDate(doc);
  });
  return docsWithId;
}

export async function addNotifications(notification) {
  await collection.add(notification);
  return {success: true};
}

export async function deleteAllNotifications() {
  const notifications = await collection.get();
  const deletePromises = [];
  notifications.forEach(doc => {
    deletePromises.push(doc.ref.delete());
  });
  await Promise.all(deletePromises);
  return {success: true};
}
