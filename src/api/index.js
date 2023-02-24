//将四个模块的请求接口统一暴露
//引入模块
import * as trademark from "./product/tradeMark";
import * as attr from "./product/attr";
import * as spu from "./product/spu";
import * as sku from "./product/Sku";

//对外暴露
export default {
  trademark,
  attr,
  spu,
  sku,
};
