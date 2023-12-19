import {Pageable} from "src/app/shared/models/pagination.service";
import {ItemOrderBy} from "./item.enum";

type GetItemsParams = {
  name?: string;
  category?: string;
  subcategory?: string;
  orderBy?: ItemOrderBy;
  pageable: Pageable;
}


type CreateItemRequest = {
  name: string;
  category: string;
  subcategory: string;
  description: string;
  images: File[];
  initialPrice: string;
  startTime: string;
  endTime: string;
};

export {
  Pageable,
  GetItemsParams,
  CreateItemRequest
};
