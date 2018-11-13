import React from 'react'
import PropTypes from 'prop-types'
import {bindActionCreators} from './mini-redux'
// connect 负责连接组件,给到redux里得数据放到组件得属性里
// 1.负责接受一个组件,把state里的一些数据放进去,返回一个组件
// 2. 数据变化时, 能够通知组件
// mapStateToprops = function(state){
//   return state
// }
// 调用
// @connect(
//   state=>state.user,
//   {getMsgList, recvMsg}
// )
// 另一种写法
// App = connect(
//   state => ({user: state.user}),
//   {getMsgList, recvMsg}
// )
export const connect = (mapStateToprops=state=>state, mapDispatchToprops={}) => (WrapComponent) => {
  return class ConnectComponent extends React.Component{
    // 子组件接受context的值
    static contextType = {
      store: PropTypes.object
    }
    constructor(props, context){
      super(props, context)
      this.state = {
        props: {} // 传入组件的值
      }
    }
    componentDidMount() {
      const {store} = this.context // 获取context里面的值
      store.subcribe(()=>this.update()) // 每一次的dispatch都会执行store.subscribe  然后就更新数据
      this.update()
    }
    update() {
      const {store} = this.context
      const stateProps = mapStateToProps(store.getState()) // 在state中获取 传入的 参数 user 的值
      const dispatchProps = bindActionCreators(mapDispatchToprops, store.dispatch) // dispatch传入的action
      // 把从state中获取的值,方法和本身的值融合起来
      this.setState({
        props: {
          ...this.state.props,
          ...stateProps,
          ...dispatchProps
        }
      })
    }
    render() {
      return <WrapComponent {...this.state.props}></WrapComponent>
    }
  }
}

// Provider把store放到context里, 所有的子元素可以直接取到store
export class Provider extends React.Component {
  static childContextTypes = {
    store: PropTypes.object
  }
  // getChildContext 把传进来的store 放到全局的context中
  getChildContext() {
    return {store: this.store} 
  }
  constructor(props, context) {
    super(props, context)
    this.store = props.store
  }
  render() {
    return this.props.children
  }
}