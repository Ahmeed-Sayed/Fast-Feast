import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalPrice: 0,
  count: 0,
};

const calculateNewTotalPrice = (totalPrice, itemPrice) => {
  return +(totalPrice + parseFloat(itemPrice)).toFixed(2);
};

const cartReducer = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, price } = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === id);
      state.totalPrice = calculateNewTotalPrice(state.totalPrice, price);
      state.count++;

      if (existingItemIndex !== -1) {
        state.items[existingItemIndex].quantity++;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart(state, action) {
      const { itemId } = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === itemId);
      if (itemIndex !== -1) {
        const itemToRemove = state.items[itemIndex];
        state.totalPrice = calculateNewTotalPrice(state.totalPrice, -itemToRemove.price);
        state.count--;

        if (itemToRemove.quantity === 1) {
          state.items.splice(itemIndex, 1);
        } else {
          state.items[itemIndex].quantity--;
        }
      }
    },
    resetCart(state) {
      state.items = [];
      state.totalPrice = 0;
      state.count = 0;
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartReducer.actions;

export default cartReducer.reducer;
