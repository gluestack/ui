import { pick } from "lodash";
import { omit } from "lodash";
import { omitUndefined } from "./omitUndefined";

export function extractInObject(parent: any, values: Array<string>) {
  return [
    omitUndefined(pick(parent, values)),
    omitUndefined(omit(parent, values)),
  ];
}
