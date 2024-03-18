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
