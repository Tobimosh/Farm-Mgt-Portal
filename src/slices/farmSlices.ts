import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Farm {
  id: string;
  farmName: string;
  ownerName: string;
  latitude: string;
  longitude: string;
  flockType: string;
  birdCount: string;
  startDate: Date;
}

export interface FarmsState {
  farms: Farm[];
  loading: boolean;
  error: string | null;
}

export const initialState: FarmsState = {
  farms: [],
  loading: false,
  error: null,
};

const farmsSlice = createSlice({
  name: "farms",
  initialState,
  reducers: {
    registerFarmRequest(state, _action: PayloadAction<Omit<Farm, "id">>) {
      state.loading = true;
      state.error = null;
    },
    registerFarmSuccess(state, action: PayloadAction<Farm>) {
      state.loading = false;
      state.farms.push(action.payload);
    },
    registerFarmFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { registerFarmRequest, registerFarmSuccess, registerFarmFailure } =
  farmsSlice.actions;

export const farmsReducer = farmsSlice.reducer;
