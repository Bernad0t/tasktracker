import { configureStore } from "@reduxjs/toolkit";
import { userSliceReducer } from "./featuries/userSlice";
import { projectSliceReducer } from "./featuries/projectSlice";

export const store = configureStore({
    reducer: {
      userData: userSliceReducer,
      projects: projectSliceReducer
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch