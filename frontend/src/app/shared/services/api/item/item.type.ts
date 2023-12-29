import {Pageable} from "src/app/shared/models/pagination.service";
import {ItemOrderBy} from "./item.enum";

type CategoryRequest = {
  category: string;
  subcategories: string[];
}

type GetItemsParams = {
  name?: string;
  categories?: CategoryRequest[];
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
  CategoryRequest,
  CreateItemRequest,
  GetItemsParams,
};
