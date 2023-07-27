import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showCart: false,
  cart: [],
  user: null,
};

export const foodSlice = createSlice({
  name: "foodSlice",
  initialState,
  reducers: {
    setShowCart: (state, { payload }) => {
      state.showCart = payload;
    },
    addToCart: (state, { payload }) => {
      let found = false;
      state.cart = state.cart.map((val) => {
        if (val.id === payload.id) {
          found = true;
          return { ...val, amount: val.amount + 1 };
        }
        return val;
      });
      if (!found) state.cart = [...state.cart, { ...payload, amount: 1 }];
    },
    changeAmount: (state, { payload }) => {
      state.cart = state.cart.map((val, ind) => {
        if (ind === payload.ind) {
          const tempAmount = val.amount + payload.amount;
          if (tempAmount > 0) return { ...val, amount: tempAmount };
        } else return val;
      });
      state.cart = state.cart.filter(
        (val) => val !== undefined && val !== null
      );
      console.log(state.cart);
    },
    emptyCart: (state, { payload }) => {
      state.cart = [];
    },
    setUser: (state, { payload }) => {
      state.user = payload;
    },
    setCart: (state, { payload }) => {
      state.cart = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setShowCart,
  addToCart,
  changeAmount,
  emptyCart,
  setUser,
  setCart,
} = foodSlice.actions;

export default foodSlice.reducer;
