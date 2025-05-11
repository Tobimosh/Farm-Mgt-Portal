// epics/index.ts
import { combineEpics } from "redux-observable";
import { registerFarmEpic } from "./registerFarmEpic";
import { dailyReportEpic } from "../epics/dailyReportEpic"; // <-- Add this

export const rootEpic = combineEpics(registerFarmEpic, dailyReportEpic);
