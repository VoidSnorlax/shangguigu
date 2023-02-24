//品牌管理数据模块
// /admin/product/baseTrademark/{page}/{limit}
import request from "@/utils/request";
export const reqTreadeMark = (page, limit) => {
  return request({
    url: `list-api/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
};
