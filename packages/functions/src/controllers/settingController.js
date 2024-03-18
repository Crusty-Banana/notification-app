import {getCurrentShop} from '../helpers/auth';
import {getSettingById, postSettingById} from '../repositories/settingRepository';

/**
 * @param ctx
 * @returns {Promise<settings>}
 */
export async function getShopSettings(ctx) {
  const shopId = getCurrentShop(ctx);
  console.log(shopId);
  const settings = await getSettingById(shopId);
  ctx.body = settings;
}

export async function postShopSettings(ctx) {
  const data = ctx.req.body;
  console.log(data);
  const shopId = getCurrentShop(ctx);
  const settings = await postSettingById(shopId, data);
  ctx.body = settings;
}
