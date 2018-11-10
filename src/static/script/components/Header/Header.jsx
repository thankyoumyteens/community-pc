import React from 'react';
import {Row, Col, Menu, Icon} from 'antd';
import ajaxUtil from '../../../util/ajaxUtil.js';
import {url} from '../../properties.js';
import './Header.less';
import defaultAvatar from '../../../img/avatar.jpg';


const SubMenu = Menu.SubMenu;

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      avatar: defaultAvatar,
      isLogin: false,
      userInfo: null,
    };
  }

  componentWillMount() {
    this.getLoginStatus();
  }

  /**
   * 获取登陆状态
   */
  getLoginStatus() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo) {
      this.setState({
        isLogin: true,
        userInfo: JSON.parse(userInfo)
      });
    } else {
      ajaxUtil.post(url.userStatus).then(resp => {
        if (resp.status === 0) {
          localStorage.setItem('userInfo', JSON.stringify(resp.data.userInfo));
          this.setState({
            isLogin: resp.data.isLogin,
            userInfo: resp.data.userInfo
          });
        } else {
          this.setState({
            isLogin: false,
          });
        }
      }).catch(e => {
        console.error('查询登陆状态失败', e);
      });
    }
  }

  render() {
    return (
      <div className="header">
        <Row className="header-row">
          <Col span="20" className="nav">
            <div className="logo"><img src="" alt=""/></div>
            <ul className="nav-container">
              <li className="nav-item">首页</li>
              <li className="nav-item">交流区</li>
              <li className="nav-item">资源区</li>
              <li className="nav-item">热门消息</li>
              <li className="nav-item">科普区</li>
              <li className="nav-item">关于我们</li>
            </ul>
          </Col>
          <Col span="4" className="user">
            {
              (() => {
                if (this.state.isLogin) {
                  return (
                    <Menu mode="horizontal" theme="dark">
                      <Menu.Item key="0" className="user-avatar">
                        <a href={url.userCenter}>
                          <img src={this.state.avatar} alt=""/>
                        </a>
                      </Menu.Item>
                      <SubMenu title={<Icon type="down"/>}>
                        <Menu.Item key="1"><a href={url.userAccount}>账户设置</a></Menu.Item>
                        <Menu.Item key="2"><a href={url.userFavorite}>我的收藏</a></Menu.Item>
                        <Menu.Item key="3"><a href={url.userHistory}>浏览历史</a></Menu.Item>
                        <Menu.Item key="4"><a href={url.userLogout}>退出登录</a></Menu.Item>
                      </SubMenu>
                    </Menu>
                  )
                } else {
                  return (
                    <ul className="user-container">
                      <li className="user-item"><a href={url.userLogin}>登陆</a></li>
                      <li className="user-item"><a href={url.userRegister}>注册</a></li>
                    </ul>
                  )
                }
              })()
            }
          </Col>
        </Row>
      </div>
    )
  }
}
