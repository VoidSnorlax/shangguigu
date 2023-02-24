//引入Axios(进行二次封装)
import request from "@/utils/request";

//对外暴露登录接口
export function login(data) {
  return request({
    url: "dev-api/admin/acl/index/login",
    method: "post",
    data,
  });
}

//对外暴露用户信息接口
export function getInfo(token) {
  return request({
    url: "dev-api/admin/acl/index/info",
    method: "get",
    params: { token },
  });
}

//对外暴露退出登录接口
export function logout() {
  return request({
    url: "dev-api/admin/acl/index/logout",
    method: "post",
  });
}
export function test1(data) {
  return request({
    url: "dev-api/test1",
    method: "post",
    data,
  });
}
export function test2(data) {
  return request({
    url: "list-api/test2",
    method: "post",
    data,
  });
}
