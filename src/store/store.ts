import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Order } from '../types/types';

const initialState: Order[] = [];

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addMeal(state, action: PayloadAction<Order>) {
      const { meal, quantity } = action.payload;
      if (quantity < 1) return state
      const order = state.find((e) => e.meal.id === meal.id);
      if (order) {
        const newQuantity = order.quantity + quantity;
        if (newQuantity < 101) order.quantity = newQuantity;
      } else state.push(action.payload)
    },
    removeMeal(state, action: PayloadAction<Order>) {
      const { meal, quantity } = action.payload;
      if (quantity < 1) return state
      const order = state.find((e) => e.meal.id === meal.id);
      if (order) {
        const newQuantity = order.quantity - quantity;
        if (newQuantity < 1) {
          return state.filter((e) => e !== order)
        } else order.quantity = newQuantity;
      }
    },
    clearCart() {
      return initialState
    }
  }
})

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer
  }
})

export const { addMeal, removeMeal, clearCart } = cartSlice.actions;
export { store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;