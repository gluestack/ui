import { isNil } from "lodash";
import { omitBy } from "lodash";
export function omitUndefined(obj: any) {
  return omitBy(obj, isNil);
}
