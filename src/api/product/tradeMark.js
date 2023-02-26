//品牌管理数据模块
// /admin/product/baseTrademark/{page}/{limit}
import request from "@/utils/request";
//获取品牌列表接口
export const reqTreadeMark = (page, limit) => {
  return request({
    url: `list-api/admin/product/baseTrademark/${page}/${limit}`,
    method: "get",
  });
};
//新增品牌接口
//注意:新增品牌不需要传递ID,ID是服务器生成的
export const reqAdd = (tradeMark) => {
  //如果有ID就是更新方法
  if (tradeMark.id) {
    return request({
      url: `list-api/admin/product/baseTrademark/update`,
      method: "put",
      data: tradeMark,
    });
  } else {
    //没有ID就是新增方法
    return request({
      url: `list-api/admin/product/baseTrademark/save`,
      method: "post",
      data: tradeMark,
    });
  }
};

//修改品牌接口
//修改品牌需要提交ID属性
