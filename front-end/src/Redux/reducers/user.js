const VALIDATION_USER = 'VALIDATION_USER';

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
  default:
    return state;
  }
};

export default userReducer;
