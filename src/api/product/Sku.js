import request from "@/utils/request";
//GET /admin/product/{page}/{limit}
export const getProduct = (page, limit, category3Id) => {
  return request({
    url: `list-api/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });
};
