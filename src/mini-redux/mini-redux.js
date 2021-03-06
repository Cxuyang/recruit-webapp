
export function createStore(reducer, enhancer) {
  // enhancer 增强器 或者叫中间件
  if (enhancer) {
    // 扩展createStore 然后传给reducer进行初始化
    return enhancer(createStore)(reducer)
  }
  let currentState = {}
  let currentListeners = []

  function getState() {
    return currentState
  }
  // 订阅, 每次state修改 都会执行listener
  function subscribe(listener) {
    currentListeners.push(listener)
  }
  // 提交状态变更的申请
  function dispatch(action) {
    currentState = reducer(currentState, action)
    currentListeners.forEach(v => v())
    return action
  }
  // 默认state
  dispatch({type: '@IMOOC/MINI-REDUX'})
  return { getState, subscribe, dispatch}
}
// 中间件
// Redux 目的是提供第三方插件的模式，改变action -> reducer 的过程。变为 action -> middlewares -> reducer 。自己在项目中使用它改变数据流，实现异步 action
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 将每个中间件(函数)都用dispatch包一层, 在其中执行完中间件后在执行dispatch
    const middlewaresChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewaresChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
// 多个中间件的话 就是 fn1(fn2(fn3()))  如此的以此调用中间件函数
export function compose(...funcs) {
  if (funcs.length == 0) {
    return arg => arg
  }
  if (funcs.length == 1) {
    return funcs[0]
  }
  return funcs.reduce((ret, item)=>(...args) => ret(item(...args)))
}
// 把传入的每个函数 dispatch 一下
// 就是返回了一个用dispatch包了一层的函数
function bindActionCreator(creator, dispatch) {
  return (...args) => dispatch(creator(...args))
}
export function bindActionCreators(creators, dispatch) {
  return Object.keys(creators).reduce((ret, item) => {
    ret[item] = bindActionCreator(creators[item], dispatch)
    return ret
  }, {})
}
