import React from 'react'
import PropTypes from 'prop-types'
// context  相当于mixin
// React.withContext 会执行一个指定的上下文信息的回调函数,任何在这个回调函数里面渲染的组件都有这个context的访问权限。
// context 是全局的, 组件里申明, 所有子元素可以直接获取
// 如果你为一个组件指定了context，那么这个组件的子组件只要定义了contextTypes 属性，就可以访问到父组件指定的context了
// 和访问context 的属性是需要通过 contextTypes 指定可访问的 元素一样。getChildContext 指定的传递给子组件的属性需要先通过 childContextTypes 来指定，不然会产生错误
class Sidebar extends React.Component{
  render(){
    return (
      <div>
        <p>侧边栏</p>
        <Navbar></Navbar>
      </div>
    )
  }
}
// context进行传递数据时，必须在子级和父级都必须引入prop-types，
// 在第一级父级中必须要有 getChildContext 函数和 childContextTypes 属性，其他子级中必须要有contextTypes属性，context的数据才能传递成功
class Navbar extends React.Component{
  static contextType = {
    user: PropTypes.string
  }
  render() {
    return (
      <div>{this.context.user}的导航栏</div>
    )
  }
}
class Page extends React.Component{
  static childContextTypes = {
    user: PropTypes.string
  }
  constructor(props){
    super(props)
    this.state = {user: 'cxy'}
  }
  getChildContext() {
    return this.state
  }
  render() {
    return (
      <div>
        <p>我是{this.state.user}</p>
        <Sidebar></Sidebar>
      </div>
    )
  }
}
export default Page