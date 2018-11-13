import React from 'react'
import PropTypes from 'prop-types'
import {Card, WhiteSpace, WingBlank} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
@withRouter
class UserCard extends React.Component{
  static propTypes = {
    userlist: PropTypes.array.isRequired
  }
  handleClick(item) {
    this.props.history.push(`chat/${item._id}`)
  }
  render(){
    const Header = Card.Header
    const Body = Card.Body
    return (
      <WingBlank>
      <WhiteSpace></WhiteSpace>
        {this.props.userlist.map(item=>(
          item.avatar ? (<Card onClick={()=>this.handleClick(item)} key={item._id}>
            <Header
                title={item.user}
                thumb={require(`../../avatarImgs/${item.avatar}.png`)}
                extra={<span>{item.title}</span>}
            ></Header>
            <Body>
                {item.type == 'boss' ? <div>公司:{item.company}</div> : null}
                {item.desc.split('\n').map(v => (
                    <div key={v}>{v}</div>
                ))}
                {item.type == 'boss' ? <div>薪资：{item.money}</div> : null}
            </Body>
        </Card>) : null
        ))}
      </WingBlank>
    )
  }
}
export default UserCard