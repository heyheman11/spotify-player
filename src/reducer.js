const initialState = {
  accessToken: ''
}

const loginReducer = (state = initialState, action) => {
  console.log("REDUCER")
  switch (action.type) {
    case 'ADD_TOKEN':
      return action.payload;
    default:
      state
  }
}

export default loginReducer;