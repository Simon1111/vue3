import Cookies from 'js-cookie';

export const COOK_JWT = 'loc_mok_jwt';
export const COOK_USER = 'user_jwt';
export const APP_LOGO = process.env.APP_LOGO;
export const APP_COMPANY_NAME = process.env.APP_COMPANY_NAME;
export const JWT_TOKEN = Cookies.get(COOK_JWT);
