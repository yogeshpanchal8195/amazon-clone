export const initialState = {
  cartItems: [],
  userData: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return {
        ...state,
        userData: action.payload
      }
    case "ADD_TO_CART":
      return {
        ...state,
        cartItems: [...state.cartItems, action.payload]
      }
    case "EMPTY_CART":
      return {
        ...state,
        cartItems: []
      }
    case "REMOVE_FROM_CART":
      let idx = state.cartItems.findIndex((ele) => ele.newId == action.payload);
      if (idx >= 0) {
        state.cartItems.splice(idx, 1)
      }
      return {
        ...state,
        cartItems: state.cartItems
      }
    default:
      return state;
  }
}

export default reducer