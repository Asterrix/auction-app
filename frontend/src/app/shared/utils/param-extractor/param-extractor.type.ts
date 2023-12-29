import {Params} from "@angular/router";
import {Option} from "../../types/Option.type";

export type ParamExtractor = (param: Params, key: string) => Option<string[]>;
