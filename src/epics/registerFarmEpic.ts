import { ofType } from "redux-observable";
import { of } from "rxjs";
import { delay, map, catchError } from "rxjs/operators";
import {
  registerFarmRequest,
  registerFarmSuccess,
  registerFarmFailure,
} from "../slices/farmSlices";
import { v4 as uuid } from "uuid";

export const registerFarmEpic = (action$: any) =>
  action$.pipe(
    ofType(registerFarmRequest.type),
    delay(1500),
    map((action: ReturnType<typeof registerFarmRequest>) => {
      const payload = action.payload;
      const newFarm = {
        ...payload,
        id: uuid(),
      };
      return registerFarmSuccess(newFarm);
    }),
    catchError(() =>
      of(registerFarmFailure("An error occurred while registering the farm."))
    )
  );
