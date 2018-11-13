import React from 'react'
import {List, InputItem, NavBar, Icon, Grid} from 'antd-mobile'
import {connect} from 'react-redux'
import {getMsgList, sendMsg, recvMsg, readMsg} from '../../redux/chat.redux'
import {getChatId} from '../../util'

import QueueAnim from 'rc-queue-anim'
// 装饰器写法
@connect(
  state => state,
  { getMsgList, sendMsg, recvMsg, readMsg}
)
// 原本写法   相当于一个高级组件
// Chat = connect(
//   state = >({state}),
//   { getMsgList, sendMsg, recvMsg, readMsg}
// )(Chat)
class Chat extends React.Component{
    constructor(props) {
      super(props)
      this.state = {text: '', msg: []}
    }
    componentWillMount() {
      if (!this.props.chat.chatmsg.length) {
        this.props.getMsgList()
        this.props.recvMsg()
      }
    }
    componentWillUnmount() {
      const to = this.props.match.params.user
      this.props.readMsg(to)
    }
    fixCarousel() {
      setTimeout(function() {
        window.dispatchEvent(new Event('resize'))
      }, 0)
    }
    handleSubmit() {
      // socket.emit('sendmsg',{text:this.state.text})
      const from = this.props.user._id
      const to = this.props.match.params.user
      const msg = this.state.text
      this.props.sendMsg({from, to, msg})
      this.setState({
        text: '',
        showEmoji: false
      })
    }

    render() {
      const emoji = '😀 😃 😄 😁 😆 😅 😂 😊 😇 🙂 🙃 😉 😌 😍 😘 😗 😙 😚 😋 😜 😝 😛 🤑 🤗 🤓 😎 😏 😒 😞 😔 😟 😕 🙁 😣 😖 😫 😩 😤 😠 😡 😶 😐 😑 😯 😦 😧 😮 😲 😵 😳 😱 😨 😰 😢 😥 😭 😓 😪 😴 🙄 🤔 😬 🤐 😷 🤒 🤕 😈 👿 👹 👺 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 👐 🙌 👏 🙏 👍 👎 👊 ✊ 🤘 👌 👈 👉 👆 👇 ✋  🖐 🖖 👋  💪 🖕 ✍️  💅 🖖 💄 💋 👄 👅 👂 👃 👁 👀 '
										.split(' ')
										.filter(v=>v)
                    .map(v=>({text:v}))
      const userid = this.props.match.params.user
      const Item = List.Item
      const users = this.props.chat.users
      if (!users[userid]) {
        return null
      }
      const chatid = getChatId(userid, this.props.user._id)
      const chatmsgs = this.props.chat.chatmsg.filter(item => item.chatid==chatid)
      return (
        <div id='chat-page'>
          <NavBar
            className="msg-bar"
            mode='dark'
            icon = {<Icon type="left" />}
            onLeftClick={()=>{
              this.props.history.goBack()
            }}
          >
            {users[userid].name}
          </NavBar>
          <div className="msg-content">
            <QueueAnim delay={50}>
            {
              chatmsgs.map(item => {
                const avatar = require(`../../avatarImgs/${users[item.from].avatar}.png`)
                return item.from == userid ? (
                  <List key={item._id}>
                    <Item thumb={avatar}>{item.content}</Item>
                  </List>
                ) : (
                  <List key={item._id}>
                    <Item 
                      extra={<img alt='头像' src={avatar} />}
                      className='chat-me'
                    >{item.content}</Item>
                  </List>
                )
              })
            }
            </QueueAnim>
          </div>
          
          <div className="stick-footer">
            <List>
              <InputItem 
                placeholder="请输入..." 
                value={this.state.text}
                onChange = {v=>{this.setState({text: v})}}
                extra={
                  <div>
                    <span
                      style={{marginRight:15}}
                      onClick={()=>{
                        this.setState({
                          showEmoji: !this.state.showEmoji
                        })
                        this.fixCarousel()
                      }}
                    >😃</span>
                    <span onClick={()=>this.handleSubmit()}>发送</span>
                  </div>
                }
              ></InputItem>
            </List>

            {
              this.state.showEmoji ? <Grid
                data = {emoji}
                columnNum={9}
                carouseMaxRow={4}
                isCarousel={true}
                onClick={el=>{
                  this.setState({
                    text: this.state.text + el.text
                  })
                }} /> : null
            }
          </div>
        </div>
      )
    }
}
export default Chat