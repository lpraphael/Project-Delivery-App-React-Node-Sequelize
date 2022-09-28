export const VALIDATION_USER = 'VALIDATION_USER';
export const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
export const SAVE_DRINKS = 'SAVE_DRINKS';
export const QTY_DRINKS = 'QTY_DRINKS';
export const ADMIN_REGISTER_NEW_USER = 'ADMIN_REGISTER_NEW_USER';

export const actionUser = (value) => ({ type: VALIDATION_USER, value });

export const registerNewUserAction = (value) => ({ type: REGISTER_NEW_USER, value });

export const actionSaveDrinks = (value) => ({ type: SAVE_DRINKS, value });

export const actionQtyDrinks = (value) => ({ type: QTY_DRINKS, value });

export const registerAdmin = (value) => ({ type: ADMIN_REGISTER_NEW_USER, value });
