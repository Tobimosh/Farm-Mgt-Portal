import { ofType } from "redux-observable";
import { of } from "rxjs";
import { delay, map, catchError } from "rxjs/operators";
import {
  submitDailyReportRequest,
  submitDailyReportSuccess,
  submitDailyReportFailure,
} from "../slices/dailyReportSlice";

export const dailyReportEpic = (action$: any) =>
  action$.pipe(
    ofType(submitDailyReportRequest.type),
    delay(1500),
    map((action: ReturnType<typeof submitDailyReportRequest>) => {
      return submitDailyReportSuccess(action.payload);
    }),
    catchError(() =>
      of(
        submitDailyReportFailure(
          "An error occurred while submitting the report."
        )
      )
    )
  );
