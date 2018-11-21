import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from 'redux-thunk'
import {BrowserRouter, Link, Switch, Route, Redirect} from 'react-router-dom'
import reducers from './reducer'
import './config'
import './index.styl'

import AuthRoute from './components/authroute/authroute'
import Login from './container/login/login'
import Register from './container/register/register'
import GeniusInfo from './container/geniusinfo/geniusinfo'
import BossInfo from './container/bossinfo/bossinfo'
import Dashboard from './components/dashboard/dashboard'
import Chat from './components/chat/chat'

const store = createStore(reducers, compose(
  applyMiddleware(thunk)
))
// switch 标签下 命中一个就返回 不用switch标签则会命中标签和默认没有路径的组件 如组件Dashboard
ReactDOM.render(
  // 将store作为公共数据放入context中
  (<Provider store = {store}>
    <BrowserRouter>
      <div>
        <AuthRoute></AuthRoute>
        <Switch>
          {/* <Route path="/" component={AuthRoute}></Route> */}
          <Route path="/geniusinfo" component={GeniusInfo}></Route>
          <Route path="/bossinfo" component={BossInfo}></Route>
          <Route path="/login" component={Login}></Route>
          <Route path="/register" component={Register}></Route>
          <Route path="/chat/:user" component={Chat}></Route>
          <Route component={Dashboard}></Route>
        </Switch>
      </div>
    </BrowserRouter>
</Provider>),
document.getElementById('root'));
