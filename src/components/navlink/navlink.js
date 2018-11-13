import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
@withRouter // 因为不是路由组件 所以使用withRouter
@connect(
  state => state.chat
)
class NavLink extends React.Component{
  static propTypes = {
    data: PropTypes.array.isRequired
  }
  render(){
    const navList = this.props.data.filter(item=>!item.hide)
    const {pathname} = this.props.location
    return(
      <TabBar>
        {navList.map(item => (
          <TabBar.Item
            badge={item.path=='/msg' ? this.props.unread : 0}
            key={item.path}
            title={item.text}
            icon={{uri: require(`./img/${item.icon}.png`)}}
            selectedIcon={{uri: require(`./img/${item.icon}-active.png`)}}
            selected={pathname===item.pathname}
            onPress={()=>{
              this.props.history.push(item.path)
            }}
          >
          </TabBar.Item>
        ))}  
      </TabBar>
    )
  }
}
export default NavLink