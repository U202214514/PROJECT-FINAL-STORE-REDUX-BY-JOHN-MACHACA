import { configureStore, createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], totalItems: 0, totalCost: 0 },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(i => i.id === item.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...item, quantity: 1 });
      }
      state.totalItems++;
      state.totalCost += item.price;
    },
    incrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        item.quantity++;
        state.totalItems++;
        state.totalCost += item.price;
      }
    },
    decrementItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        if (item.quantity > 1) {
          item.quantity--;
          state.totalItems--;
          state.totalCost -= item.price;
        } else {
          state.items = state.items.filter(i => i.id !== action.payload);
        }
      }
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload);
      if (item) {
        state.totalItems -= item.quantity;
        state.totalCost -= item.price * item.quantity;
        state.items = state.items.filter(i => i.id !== action.payload);
      }
    }
  }
});
