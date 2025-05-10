// epics/index.ts
import { combineEpics } from "redux-observable";
import { registerFarmEpic } from "./registerFarmEpic";

export const rootEpic = combineEpics(registerFarmEpic);
