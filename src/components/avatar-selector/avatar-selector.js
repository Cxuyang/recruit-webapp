import React from 'react'
import {Grid, List} from 'antd-mobile'
import PropTypes from 'prop-types'
class AvatarSelector extends React.Component{
  static propsTypes = {  // static 定义的是类的方法只有类能调用，而普通方法是实例的方法只有类实例能调用
    selectAvatar: PropTypes.func.isRequired
  }
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    const avatarList = 'boy,girl,man,woman,bull,chick,crab,hedgehog,hippopotamus,koala,lemur,pig,tiger,whale,zebra'
                        .split(',')
                        .map(item => ({
                          icon: require(`../../avatarImgs/${item}.png`),
                          text: item
                        }))
    const gridHeader = this.state.icon ? (<div>
                                            <span>已选择头像</span>
                                            <img style={{width: 20}} src={this.state.icon} />
                                          </div>)
                                        : '请选择头像'
    return(
      <div>
        <List renderHeader={()=>gridHeader}>
          <Grid 
            data={avatarList}
            columnNum={5}
            onClick={elm => {
              this.setState(elm)
              this.props.selectAvatar(elm.text)
            }}
          />
        </List>
      </div>
    )
  }
}
export default AvatarSelector