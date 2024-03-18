import {getCurrentShop} from '../helpers/auth';
import {getSettingById, putSettingById} from '../repositories/settingRepository';

/**
 * @param ctx
 * @returns {Promise<settings>}
 */
export async function getShopSettings(ctx) {
  const shopId = getCurrentShop(ctx);
  console.log(shopId);
  const settings = await getSettingById(shopId);
  console.log('here', settings);
  ctx.body = settings;
}

export async function putShopSettings(ctx) {
  const data = ctx.req.body;
  console.log(data);
  const shopId = getCurrentShop(ctx);
  const settings = await putSettingById(shopId, data);
  ctx.body = settings;
}
