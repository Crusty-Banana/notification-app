import {api} from '@assets/helpers';

const defaultSettings = (await api('/settings/default')).data;
export default defaultSettings;
