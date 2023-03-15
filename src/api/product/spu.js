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

export const reqList = (page, limit) => {
  return request({
    url: `list-api/admin/product/list/${page}/${limit}`,
    method: "get",
  });
};
//上架商品接口
export const reqSale = (skuId) => {
  return request({
    url: `list-api/admin/product/onSale/${skuId}`,
    method: "get",
  });
};
//下架商品接口
export const reqCancel = (skuId) => {
  return request({
    url: `list-api/admin/product/cancelSale/${skuId}`,
    method: "get",
  });
};

export const reqGetSku = (skuId) => {
  return request({
    url: `list-api/admin/product/getSkuById/${skuId}`,
    method: "get",
  });
};
