type BaseCategory = {
  id: number;
  name: string;
}

type Category = BaseCategory & {
  subcategories: Subcategory[];
}

type Subcategory = BaseCategory & {
  numberOfItems: number;
}

export type {Category, Subcategory};
