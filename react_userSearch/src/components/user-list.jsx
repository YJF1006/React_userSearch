/**
 * 下部的用户列表模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'
import Pubsub from 'pubsub-js'

export default class UserList extends React.Component {
  state = {
    firstView: true,
    loading: false,
    users: null,
    error: null
  }
  componentDidMount(){
    //订阅消息
    Pubsub.subscribe('search',(msg,data)=>{
      console.log(msg,data)   //msg:对应消息名search   data:对应接收的数据
      //发送请求之前更新状态为请求中
      this.setState({ firstView: false, loading: true })  
      const url = `https://api.github.com/search/users?q=${searchName}`;   //github的user接口
     
      // 使用axios库
      axios.get(url)
        .then((response) => {
          this.setState({ loading: false, users: response.data.items})
        })
        .catch((error)=>{
          //更新状态为失败
          this.setState({ loading: false, error: error.message })
        })
    })
  }
render () {

    if (this.state.firstView) {
      return <h2>Enter name to search</h2>
    } else if (this.state.loading) {
      return <h2>Loading result...</h2>
    } else if (this.state.error) {
      return <h2>{this.state.error}</h2>
    } else {
      return (
        <div className="row">
          {
            this.state.users.map((user,index) => (
              <div className="card" key={index}>
                <a href={user.html_url} target="_blank">
                  <img src={user.avatar_url} style={{width: '100px'}} alt='user'/>
                </a>
                <p className="card-text">{user.login}</p>
              </div>
            ))
          }
        </div>
      )
    }
  }
}
