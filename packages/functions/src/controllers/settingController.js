import {getCurrentShop} from '../helpers/auth';
import {getSettingById, putSettingById} from '../repositories/settingRepository';

/**
 * @param ctx
 * @returns {Promise<settings>}
 */
export async function getShopSettings(ctx) {
  const shopId = getCurrentShop(ctx);
  const settings = await getSettingById(shopId);
  ctx.body = settings;
}

export async function getDefaultShopSettings(ctx) {
  const settings = await getSettingById('default');
  ctx.body = settings;
}

export async function putShopSettings(ctx) {
  const data = ctx.req.body.data;
  const shopId = getCurrentShop(ctx);
  const settings = await putSettingById(shopId, data);
  ctx.body = settings;
}
