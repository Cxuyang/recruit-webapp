const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const userRouter = require('./user')
const model = require('./model')

const Chat = model.getModel('chat')
// 新建APP
const app = express()
// work with express
const server = require('http').Server(app)
const io = require('socket.io')(server) // 监听全局的websocket
io.on('connection', function(socket) { // socket参数只单次的socket连接  io是全局的socket对象
  console.log('user login')  // 监听全局连接 触发事件
  socket.on('sendmsg', function(data) {
    console.log(data.text)
    const {from, to, msg} = data
    const chatid = [from, to].sort().join('_')
    Chat.create({chatid, from, to, content:msg}, function(err, doc) {
      io.emit('recvmsg', Object.assign({}, doc._doc)) // socket 派发一个recvmsg事件
    })
  })
})
app.use(cookieParser())
app.use(bodyParser.json())
app.use('/user', userRouter)

server.listen(9093, function(){
  console.log('node app start at port 9093')
})