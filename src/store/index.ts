// store.ts
import { configureStore } from "@reduxjs/toolkit";
import { farmsReducer } from "../slices/farmSlices";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../epics";

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    farms: farmsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
