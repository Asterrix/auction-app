import {Router} from "@angular/router";

const clearQueryParams = async (router: Router): Promise<void> => {
  await router.navigate([], {
    queryParams: {},
    queryParamsHandling: "merge"
  });
};

const updateQueryParams = async (router: Router, queryParams: { key: string, value: string | number }[]): Promise<void> => {
  const params = queryParams.reduce((acc, {key, value}) => ({...acc, [key]: value}), {});
  await router.navigate([], {
    queryParams: params,
    queryParamsHandling: "merge"
  });
};

export {
  clearQueryParams,
  updateQueryParams
};
