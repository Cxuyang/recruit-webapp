
export function createStore(reducer, enhancer) {
  if (enhancer) {
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
export function applyMiddleware(...middlewares) {
  return createStore => (...args) => {
    const store = createStore(...args)
    let dispatch = store.dispatch
    const midApi = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    const middlewaresChain = middlewares.map(middleware => middleware(midApi))
    dispatch = compose(...middlewaresChain)(store.dispatch)
    return {
      ...store,
      dispatch
    }
  }
}
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