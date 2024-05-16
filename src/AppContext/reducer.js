export const initial = {
  user: {},
  utype: null,
  rides: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };

    case "SET_TYPE":
      return {
        ...state,
        utype: action.acc_type,
      };

    case "SET_RIDES":
      return {
        ...state,
        rides: action.urides,
      };

    default:
      return state;
  }
};
