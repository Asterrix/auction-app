import {ItemOrderBy} from "./item.enum";

type Pageable = {
  page: number;
  size: number;
}

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
