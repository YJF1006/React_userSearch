/**
 * 下部的用户列表模块
 */
import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

export default class UserList extends React.Component {

  static propTypes = {
    searchName: PropTypes.string.isRequired
  }

  state = {
    firstView: true,
    loading: false,
    users: null,
    error: null
  }
  
  //当组件接收到新的属性的时候回调
componentWillReceiveProps(nextProps)  {
    let searchName = nextProps.searchName;
    //console.log('发送ajax请求', searchName)
    const url = `https://api.github.com/search/users?q=${searchName}`;   //github的user接口
    //发送请求之前更新状态为请求中
    this.setState({ firstView: false, loading: true })   
    // 使用axios库
    axios.get(url)
      .then((response) => {
        //得到相应数据 console.log(response.data)
        //更新状态（成功)
        this.setState({ loading: false, users: response.data.items})
      })
      .catch((error)=>{
        // debugger
        console.log('error', error.response.data.message, error.message)
        //更新状态为失败
        this.setState({ loading: false, error: error.message })
      })

    // try {
    //   const result = await axios.get(url)
    //   this.setState({ loading: false, users: result.data.items })
    // } catch(err) {
    //   // debugger
    //   console.log('----', err.message)
    // }
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
