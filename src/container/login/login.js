import React from 'react'
import Logo from '../../components/logo/logo'
import {List, InputItem, Radio, WingBlank, WhiteSpace, Button} from 'antd-mobile'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom'
import {login} from '../../redux/user.redux'
import mixinForm from '../../components/mixin-form/mixin-form'

@connect(
  state=>state.user,
  {login}
)
@mixinForm  // 以高阶组件mixinForm包一层 相当于高阶组件的属性代理
class Login extends React.Component{
  constructor(props) {
    super(props)
    this.register = this.register.bind(this)
    this.handleLogin = this.handleLogin.bind(this)
  }
  register() {
    this.props.history.push('/register')
  }
  handleLogin() {
    this.props.login(this.props.state)
  }
  render(){
    return(
      <div>
        {this.props.redirectTo && this.props.redirectTo !== '/login' ? <Redirect to={this.props.redirectTo} /> : null}
        <Logo></Logo>
        <WingBlank>
          <List>
            {this.props.msg ? <p className="error-msg">{this.props.msg}</p> : null}
            <InputItem onChange={v=>this.props.handleChange('user', v)}>用户</InputItem>
            <WhiteSpace />
            <InputItem onChange={v=>this.props.handleChange('pwd', v)}>密码</InputItem>
          </List>
          <WhiteSpace/>
          <Button onClick={this.handleLogin} type="primary">登录</Button>
          <WhiteSpace/>
          <Button onClick={this.register} type="primary">注册</Button>
        </WingBlank>
      </div>
    )
  }
}
export default Login