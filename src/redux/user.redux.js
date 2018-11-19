import axios from 'axios'
import {getRedirectPath} from '../util'
const AUTH_SUCCESS = 'REGISTER_SUCCESS'
const LOGOUT = 'LOGOUT'
const ERROR_MSG = 'ERROR_MSG'
const LOAD_DATA = 'LOAD_DATA'
const initState = {
  redirectTo: '',
  isAuth : false,
  msg: '',
  user: '',
  type: ''
}
// reducer  相当于vuex的getter
export function user(state = initState, action) {
  switch(action.type) {
    case AUTH_SUCCESS:
      return {...state, msg: '', redirectTo:getRedirectPath(action.payload), isAuth: true, ...action.payload}
    case LOAD_DATA:
      return {...state, ...action.payload}
    case ERROR_MSG:
      return {...state, isAuth: false, msg: action.msg}
    case LOGOUT:
      return {...initState, redirectTo: '/login'}
    default:
      return state
    }
}
function authSuccess(data){
  return {type: AUTH_SUCCESS, payload: data}
}
function errorMsg(msg) {
  return {msg, type: ERROR_MSG}
}

// actions 

export function loadData(userinfo) {
  return {type: LOAD_DATA, payload: userinfo}
}
// async + await 配合使用, await必须在async内部
// export function update(data) {
//   return (dispatch)=>{
//   	const res = await axios.post('/user/update', data)
// 	if (res.status===200 && res.data.code === 0) {
// 	  dispatch(authSuccess(res.data.data))
// 	} else {
// 	  dispatch(errorMsg(res.data.msg))
// 	}
//   }
// }
export function update(data) {
  return dispatch=>{
    axios.post('/user/update', data).then(res => {
      if (res.status===200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
export function logoutSubmit(){
	return { type:LOGOUT }
}
export function login({user, pwd}) {
  if (!user || !pwd) {
    return errorMsg('用户名密码错误！')
  }
  return dispatch=>{
    axios.post('/user/login', {user, pwd}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess(res.data.data))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
export function register({user, pwd, repeatpwd, type}) {
  if (!user || !pwd || !type) {
    return errorMsg('用户名密码必须输入!')
  }
  if (pwd !== repeatpwd) {
    return errorMsg('密码和确认密码不同!')
  }
  return dispatch => {
    axios.post('/user/register', {user, pwd, type}).then(res => {
      if (res.status === 200 && res.data.code === 0) {
        dispatch(authSuccess({user, pwd, type}))
      } else {
        dispatch(errorMsg(res.data.msg))
      }
    })
  }
}
