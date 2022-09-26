const SAVE_DRINKS = 'SAVE_DRINKS';
const QTY_DRINKS = 'QTY_DRINKS';

const initialState = {
  drinks: [],
  qtyOfDrinks: [],
};

const saveDrinks = (state = initialState, action) => {
  switch (action.type) {
  case SAVE_DRINKS:
    return { ...state, drinks: action.value };
  case QTY_DRINKS:
    return { ...state, qtyOfDrinks: action.value };
  default:
    return state;
  }
};
export default saveDrinks;
