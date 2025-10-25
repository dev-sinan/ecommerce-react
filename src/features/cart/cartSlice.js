import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
  totalQuantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload.id);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      cartSlice.caseReducers.updateTotals(state);
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter(i => i.id !== action.payload);
      cartSlice.caseReducers.updateTotals(state);
    },
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item) item.quantity += 1;
      cartSlice.caseReducers.updateTotals(state);
    },
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(i => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      cartSlice.caseReducers.updateTotals(state);
    },
    updateTotals: (state) => {
      state.totalQuantity = state.cartItems.reduce((sum, i) => sum + i.quantity, 0);
      state.totalPrice = state.cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
