/*
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-06-04 10:17:25
 */
import request from "@/utils/request";

export function addTask(data) {
  return request({
    url: `task/add_task`,
    method: "POST",
    data,
  });
}
export function queryTasks(data) {
    return request({
      url: `task/query_tasks`,
      method: "POST",
      data,
    });
  }
export function updateTask(data) {
    return request({
      url: `task/update_task`,
      method: "POST",
      data,
    });
  }
  export function deleteTask(data) {
    return request({
      url: `task/delete_task`,
      method: "POST",
      data,
    });
  }
  export function taskTypeQuery(data) {
    return request({
      url: `task/task_type_query`,
      method: "POST",
      data,
    });
  }
//   查询单个任务
  export function taskQuery(data) {
    return request({
      url: `task/query_one_task`,
      method: "POST",
      data,
    });
  }
  export function hlevelQueryTasks(data) {
    return request({
      url: `task/hlevel_query_tasks`,
      method: "POST",
      data,
    });
  }
  // 任务开始
  export function startTask(data) {
    return request({
      url: `task/start_task`,
      method: "POST",
      data,
    });
  }
  // 任务结束
  export function endTask(data) {
    return request({
      url: `task/end_task`,
      method: "POST",
      data,
    });
  }
  // 任务暂停
  export function pauseTask(data) {
    return request({
      url: `task/pause_task`,
      method: "POST",
      data,
    });
  }
  // 任务继续
  export function continueTask(data) {
    return request({
      url: `task/continue_task`,
      method: "POST",
      data,
    });
  }