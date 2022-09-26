import { VALIDATION_USER, REGISTER_NEW_USER } from '../actions';

const initialState = {
  user: {
    name: '',
    role: '',
    email: '',
  },
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
  case VALIDATION_USER:
    return {
      ...state,
      user: action.value,
    };
  case REGISTER_NEW_USER:
    return {
      ...state,
      user: {
        name: action.value.name,
        role: 'customer',
        email: action.value.email,
      },
    };
  default:
    return state;
  }
};

export default userReducer;
