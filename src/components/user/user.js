import React from 'react'
import {connect} from 'react-redux'
import {Result, List, Button, WhiteSpace, Modal} from 'antd-mobile'
import browserCookie from 'browser-cookies'
import {logoutSubmit} from '../../redux/user.redux'
import {Redirect} from 'react-router-dom'
@connect(
  state=>state.user,
  {logoutSubmit}
)
class User extends React.Component{
  constructor(props) {
    super(props)
    this.logout = this.logout.bind(this)
  }
  logout() {
    const alert = Modal.alert
    alert('注销', '确认退出登录吗?',[
      {text: '取消', onPress: () => console.log('cancel')},
      {text: '确认', onPress: () => {
        browserCookie.erase('userid')
        this.props.logoutSubmit()
      }}
    ])
  }
  render() {
    const props = this.props
    const Item = List.Item
    const Brief = Item.Brief
    return props.user ? (
      <div>
        <Result 
          img={<img src={require(`../../avatarImgs/${props.avatar}.png`)} style={{width: 50}} alt='头像' />}
        />
        <List>
          <Item multipleLine>
            {props.title}
            {props.desc.split('\n').map( item => <Brief key={item}>{item}</Brief>)}
            {props.money ? <Brief>薪资: {props.money}</Brief> : null}
          </Item>
        </List>
        <WhiteSpace></WhiteSpace>
        <List>
          <Button onClick={this.logout}  type="primary">退出登录</Button>
        </List>
      </div>
    ) : <Redirect to={props.redirectTo} />
  }
}
export default User