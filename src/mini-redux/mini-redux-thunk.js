// 中间件
// 自己理解 本来redux是直接action然后传入reducer更新数据的, 中间件就是在这中间传入一个函数 执行完成后执行下一个中间件或者直接dispatch action来更新数据
// Redux 目的是提供第三方插件的模式，改变action -> reducer 的过程。变为 action -> middlewares -> reducer 。自己在项目中使用它改变数据流，实现异步 action
// action进来执行中间件 完成后next执行下一个中间件 或者直接执行默认的dispatch
// dispatch = compose(...middlewaresChain)(store.dispatch)
// 中间件调用
// export function add() {
//   thunk插件的作用,这里返回函数
//  return dispatch => {
//   setTimeout(()=>{
//     // 异步结束后,手动执行dispatch
//      dispatch(ADD()) // ADD() 为action
//    }, 200)
//   }
// }
const thunk = ({dispatch, getState}) => next => action => {
  // 如果是函数,则执行一下,参数是dispatch和getState
  if (typeof action == 'function') {
    return action(dispatch, getState)
  }
  return next(action)
}
export default thunk
