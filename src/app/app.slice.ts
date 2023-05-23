import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const appInitialState = {
  error: null as string | null,
  isLoading: true,
  isAppInitialized: false,
};

type appInitialStateType = typeof appInitialState;

const slice = createSlice({
  name: "app",
  initialState: appInitialState,
  reducers: {
    setIsLoading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      // Логику в подредьюсерах пишем мутабельным образом,
      // т.к. иммутабельность достигается благодаря immer.js
      state.isLoading = action.payload.isLoading;
    },
  },
});

export const appReducer = slice.reducer;
export const appActions = slice.actions;
