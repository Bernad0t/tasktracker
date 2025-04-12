import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./featuries/userSlice";

export const store = configureStore({
    reducer: {
      userData: userSliceReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch