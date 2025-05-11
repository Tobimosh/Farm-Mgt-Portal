import { combineEpics } from "redux-observable";
import { registerFarmEpic } from "./registerFarmEpic";
import { dailyReportEpic } from "../epics/dailyReportEpic";

export const rootEpic = combineEpics(registerFarmEpic, dailyReportEpic);
