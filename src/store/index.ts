import { configureStore } from "@reduxjs/toolkit";
import {
  farmsReducer,
  initialState as farmsInitialState,
  type FarmsState,
} from "../slices/farmSlices";
import {
  dailyReportReducer,
  initialState as dailyReportInitialState,
  type DailyReportState,
} from "@/slices/dailyReportSlice";
import { createEpicMiddleware } from "redux-observable";
import { rootEpic } from "../epics";
import { loadState, saveState } from "@/lib/localStorage";

const persistedFarms = loadState<FarmsState>("farms");
const persistedDailyReport = loadState<DailyReportState>("dailyReport");

const preloadedState = {
  farms: persistedFarms ?? farmsInitialState,
  dailyReport: persistedDailyReport ?? dailyReportInitialState,
};

const epicMiddleware = createEpicMiddleware();

export const store = configureStore({
  reducer: {
    farms: farmsReducer,
    dailyReport: dailyReportReducer,
  },
  preloadedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(epicMiddleware),
});

epicMiddleware.run(rootEpic);

store.subscribe(() => {
  saveState("farms", store.getState().farms);
  saveState("dailyReport", store.getState().dailyReport);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
