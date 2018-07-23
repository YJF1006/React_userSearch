/**
 * 上部的搜索模块
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Pubsub from 'pubsub-js'

class Search extends Component {


  search = () => {
    let searchName = this.nameInput.value
    if(searchName){
      //发布搜索消息
      Pubsub.publish('search',searchName)
    }
  }

  render() {
    return (
      <div>
        <input type="text" placeholder="enter the name you search"
               ref={(input => this.nameInput = input)}/>
        <button onClick={this.search}>Search</button>
      </div>
    )
  }
}

export default Search