import { configureStore } from "@reduxjs/toolkit";
import ratesReducer from "./slicers/ratesSlicer";

export const store = configureStore({
  reducer: {
    rates: ratesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
