
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface DailyReport {
  farmId: string;
  date: Date;
  eggsCollected: string;
  feedUsed: string;
  mortality: string;
}

export interface DailyReportState {
  reports: DailyReport[];
  loading: boolean;
  error: string | null;
}

export const initialState: DailyReportState = {
  reports: [],
  loading: false,
  error: null,
};

const dailyReportSlice = createSlice({
  name: "dailyReport",
  initialState,
  reducers: {
    submitDailyReportRequest(state, _action: PayloadAction<DailyReport>) {
      state.loading = true;
      state.error = null;
    },
    submitDailyReportSuccess(state, action: PayloadAction<DailyReport>) {
      state.loading = false;
      state.reports.push(action.payload);
    },
    submitDailyReportFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  submitDailyReportRequest,
  submitDailyReportSuccess,
  submitDailyReportFailure,
} = dailyReportSlice.actions;

export const dailyReportReducer = dailyReportSlice.reducer;
