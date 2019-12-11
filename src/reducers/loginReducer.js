const loginReducer = (state = { accessToken: "" }, action) => {
  switch (action.type) {
    case "ADD_TOKEN":
      return { accessToken: action.payload };
    default:
      return state;
  }
};

export default loginReducer;
