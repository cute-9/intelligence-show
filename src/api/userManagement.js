/*
 * @desc:
 * @Author: Huang Qian
 * @Date: 2023-11-24 16:58:14
 */
import request from "@/utils/request";

export function getInfoUser(data) {
  return request({
    url: `user/query_users`,
    method: "POST",
    data,
  });
}
export function userQueryOne(data) {
  return request({
    url: `user/query_one_user`,
    method: "POST",
    data,
  });
}
export function updateUser(data) {
  return request({
    url: `user/update_user`,
    method: "POST",
    data,
  });
}
export function userAuth(data) {
  return request({
    url: `user/user_auth`,
    method: "post",
    data,
  });
}
export function addUser(data) {
  return request({
    url: `user/add_user`,
    method: "POST",
    data,
  });
}
// 获取信息
export function deleteUser(data) {
  return request({
    url: `user/delete_user`,
    method: "post",
    data,
  });
}
// 删除
export function deleteInfo(params) {
  return request({
    url: `/task/delete`,
    method: "delete",
    params,
  });
}
// 重启
export function rerunInfo(params) {
  return request({
    url: `task/rerun`,
    method: "post",
    params,
  });
}

export function checkUser(data) {
  return request({
    url: `user/check_user`,
    method: "post",
    data,
  });
}