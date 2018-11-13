// 高阶组件(分为 1.属性代理(以组件作为参数返回另外一个组件) 2.反向继承(也相当于minxi))
import React from 'react'

export default function mixinForm(Comp) {
  return class WrapperComp extends React.Component{
    constructor(props){
      super(props)
      this.state = {}
      this.handleChange = this.handleChange.bind(this)
    }
    handleChange(key, val) {
      this.setState({
        [key]: val
      })
    }
    render() {
      return <Comp handleChange={this.handleChange} state={this.state} {...this.props}></Comp>
    }
  }
}