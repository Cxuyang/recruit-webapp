import React from 'react'
import logoImg from './job.png'
import './logo.styl'
class Logo extends React.Component{
  render(){
    return(
      <div className="logo-container">
        <img src={logoImg} alt="logo" />
      </div>
    )
  }
}
export default Logo