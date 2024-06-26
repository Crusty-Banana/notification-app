import {Firestore} from '@google-cloud/firestore';
import {presentDataAndFormatDate} from '@avada/firestore-utils';

const firestore = new Firestore();
/** @type CollectionReference */
const collection = firestore.collection('settings');

/**
 * @param id
 * @returns {Promise<{Settings}>}
 */
export async function getSettingById(id) {
  const doc = await collection.doc(id).get();
  return {success: true, data: presentDataAndFormatDate(doc)};
}

/**
 * @param id
 * @returns {Promise<{Settings}>}
 */
export async function putSettingById(id, data) {
  const doc = await collection.doc(id).set(data);
  return {success: true, data: presentDataAndFormatDate(doc)};
}
