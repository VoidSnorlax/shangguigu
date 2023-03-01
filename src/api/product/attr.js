import request from "@/utils/request";

//获取一级分类
export const category1 = () => {
  return request({
    url: "list-api/admin/product/getCategory1",
    method: "get",
  });
};
//获取二级分类
export const category2 = (category1Id) => {
  return request({
    url: `list-api/admin/product/getCategory2/${category1Id}`,
    method: "get",
  });
};
//获取三级分类
export const category3 = (category2Id) => {
  return request({
    url: `list-api/admin/product/getCategory3/${category2Id}`,
    method: "get",
  });
};
//商品基础属性接口/admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const getCategory = (category1Id, category2Id, category3Id) => {
  return request({
    url: `list-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};
//商品属性新增接口
export const saveAttrInfo = (data) => {
  return request({
    url: "list-api/admin/product/saveAttrInfo",
    method: "post",
    data,
  });
};
