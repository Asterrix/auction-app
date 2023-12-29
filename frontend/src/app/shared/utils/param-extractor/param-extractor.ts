import {Params} from "@angular/router";
import {Option} from "../../types/Option.type";
import {ParamExtractor} from "./param-extractor.type";

const paramExtractor: ParamExtractor = (param: Params, key: string): Option<string[]> => {
  const value = param[key];

  return {
    present: value !== undefined,
    value: Array.isArray(value) ? value : [value]
  };
};

export {paramExtractor};
