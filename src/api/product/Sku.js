import request from "@/utils/request";
//GET /admin/product/{page}/{limit}
export const getProduct = (page, limit, category3Id) => {
  return request({
    url: `list-api/admin/product/${page}/${limit}`,
    method: "get",
    params: { category3Id },
  });
};

//获取Spu信息
export const reqSpu = (spuId) => {
  return request({
    url: `list-api/admin/product/getSpuById/${spuId}`,
    method: "get",
  });
};

//获取品牌信息
export const getTrademarkList = () => {
  return request({
    url: `list-api/admin/product/baseTrademark/getTrademarkList`,
    method: "get",
  });
};

//获取Spu图标接口
export const getSpuImageList = (spuId) => {
  return request({
    url: `list-api/admin/product/spuImageList/${spuId}`,
    method: "get",
  });
};

//获取平台销售属性----一共三个
export const getBaseSaleAttrList = () => {
  return request({
    url: `list-api/admin/product/baseSaleAttrList`,
    method: "get",
  });
};

//保存或者新增接口
export const reqSaveOrUpdate = (spu) => {
  if (spu.id) {
    return request({
      url: "list-api/admin/product/updateSpuInfo",
      method: "post",
      data: spu,
    });
  } else {
    return request({
      url: "list-api/admin/product/saveSpuInfo",
      method: "post",
      data: spu,
    });
  }
};

export const delSpu = (spuId) => {
  return request({
    url: `list-api/admin/product/deleteSpu/${spuId}`,
    method: "delete",
  });
};

