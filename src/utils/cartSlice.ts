import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Load the initial state from local storage
const initialState: CartItem[] =
  typeof window !== "undefined"
    ? (JSON.parse(localStorage.getItem("cart") ?? "[]") as CartItem[])
    : ([] as CartItem[]);

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<CartItem[]>) => {
      return action.payload;
    },
    addToCart: (state, action: PayloadAction<CartItem>) => {
      // Check if the item already exists in the cart
      const existingItem = state.find(
        (item) =>
          item.product.Id === action.payload.product.Id &&
          item.colour.Id === action.payload.colour.Id &&
          item.size.Id === action.payload.size.Id,
      );
      if (existingItem) {
        // If the item exists, update the quantity
        existingItem.quantity += action.payload.quantity;
      } else {
        // If the item doesn't exist, add it to the cart
        state.push(action.payload);
      }
      // Update local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(state));
      }
    },

    removeFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter((item, index) => index !== action.payload);
      // Update local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ indexToUpdate: number; quantity: number }>,
    ) => {
      const newState = state.map((item, index) =>
        index === action.payload.indexToUpdate
          ? { ...item, quantity: action.payload.quantity }
          : item,
      );
      // Update local storage
      if (typeof window !== "undefined") {
        localStorage.setItem("cart", JSON.stringify(newState));
      }
      return newState;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, setCart } = cartSlice.actions;

export default cartSlice.reducer;
