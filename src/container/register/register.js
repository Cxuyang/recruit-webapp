import React from 'react'
import Logo from '../../components/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {register} from '../../redux/user.redux'
import mixinForm from '../../components/mixin-form/mixin-form'
@connect(
  state => state.user,
  {register}
)
@mixinForm
class Register extends React.Component{
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
  }
  componentDidMount() {
    this.props.handleChange('type', 'genius')
  }
  register() {
    this.props.register(this.props.state)
  }
  render(){
    const RadioItem = Radio.RadioItem
    return(
      <div>
        {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <List>
          {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : false}
          <InputItem onChange={v => this.props.handleChange('user', v)}>用户名</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.props.handleChange('pwd', v)}>密码</InputItem>
          <WhiteSpace />
          <InputItem type="password" onChange={v => this.props.handleChange('repeatpwd', v)}>确认密码</InputItem>
          <WhiteSpace />
          <RadioItem checked={this.props.state.type === 'genius'} onChange={v => this.props.handleChange('type', 'genius')}>牛人</RadioItem>
          <RadioItem checked={this.props.state.type === 'boss'} onChange={v => this.props.handleChange('type', 'boss')}>BOSS</RadioItem>
          <WhiteSpace />
          <Button type="primary" onClick={this.register}>注册</Button>
        </List>
      </div>
    )
  }
}
export default Register