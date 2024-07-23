/*
 * @desc: 
 * @Author: Huang Qian
 * @Date: 2024-02-29 14:00:22
 */
import { Message,Loading} from "element-ui";
let loading;
loading=Loading.service({
    lock:true,
    text:'加载中...',
    spinner:'el-icon-loading',
    background:'rgba(0,0,0,0.2)',
})
export default loading

// let tableLoading =Loading.service({
//     lock: true,//同v-loading的修饰符
//     text: '加载中...',//加载文案
//     backgroundColor: 'rgba(55,55,55,0.4)',//背景色
//     spinner: 'el-icon-loading',//加载图标
//     target: document.querySelector(".el-table__body")//loading需要覆盖的DOM节点，默认为body
//  })
//  export default tableLoading
