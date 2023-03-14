import request from "@/utils/request";

export const spuImageList = (spuId) => {
  return request({
    url: `list-api/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
};

export const spuSaleAttrList = (spuId) => {
  return request({
    url: `list-api/admin/product/spuSaleAttrList/${spuId}`,
    method: "get",
  });
};
export const attrInfoList = (category1Id, category2Id, category3Id) => {
  return request({
    url: `list-api/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`,
    method: "get",
  });
};

export const saveData = (data) => {
  return request({
    url: `list-api/admin/product/saveSkuInfo`,
    method: "post",
    data,
  });
};

export const Skulist = (spuId) => {
  return request({
    url: `list-api/admin/product/findBySpuId/${spuId}`,
    method: "get",
  });
};
