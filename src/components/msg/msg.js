import React from 'react'
import {connect} from 'react-redux'
import {List, Badge} from 'antd-mobile'
@connect(
  state => state
)
class Msg extends React.Component{
  getLast(arr) {
    return arr[arr.length - 1]
  }
  render(){
    const Item = List.Item
    const Brief = Item.Brief
    const userid = this.props.user._id
    const userinfo = this.props.chat.users
    let msgGroup = {}
    this.props.chat.chatmsg.map(item => {
      msgGroup[item.chatid] = msgGroup[item.chatid] || []
      msgGroup[item.chatid].push(item)
    })
    // Object.values 返回一个数组
    let chatList = Object.values(msgGroup).sort((a, b)=>{
      const a_last = this.getLast(a).create_time
      const b_last = this.getLast(b).create_time
      return b_last - a_last
    })
    return(
      <div>
        {
          chatList.map(item => {
            const lastItem = this.getLast(item)
            const targetId = item[0].from == userid ? item[0].to : item[0].from
            const unreadNum = item.filter(item => !item.read && item.to == userid).length
            if (!userinfo[targetId]) {
              return null
            }
            return (
              <List key={lastItem._id}>
                <Item
                  extra={<Badge text={unreadNum}></Badge>}
                  thumb={require(`../../avatarImgs/${userinfo[targetId].avatar}.png`)}
                  arrow="horizontal"
                  onClick={()=>{
                    this.props.history.push(`/chat/${targetId}`)
                  }}
                >
                  {lastItem.content}
                  <Brief>{userinfo[targetId].name}</Brief>
                </Item>
              </List>
            )
          })
        }
      </div>
    )
  }
}
export default Msg