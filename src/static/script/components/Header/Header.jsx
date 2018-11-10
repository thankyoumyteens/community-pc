import React from 'react';
import {Row, Col, Menu, Icon} from 'antd';
import './Header.less';
import defaultAvatar from '../../../img/avatar.jpg';


const SubMenu = Menu.SubMenu;

export default class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      url: {
        userCenter: '/user/index',
        userAccount: '/user/account',
        userFavorite: '/user/favorite',
        userHistory: '/user/history',
        userLogout: '/user/logout',
      },
      avatar: defaultAvatar
    };
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
            <Menu mode="horizontal" theme="dark">
              <Menu.Item key="0" className="user-avatar">
                <a href={this.state.url.userCenter}>
                  <img src={this.state.avatar} alt=""/>
                </a>
              </Menu.Item>
              <SubMenu title={<Icon type="down"/>}>
                <Menu.Item key="1"><a href={this.state.url.userAccount}>账户设置</a></Menu.Item>
                <Menu.Item key="2"><a href={this.state.url.userFavorite}>我的收藏</a></Menu.Item>
                <Menu.Item key="3"><a href={this.state.url.userHistory}>浏览历史</a></Menu.Item>
                <Menu.Item key="4"><a href={this.state.url.userLogout}>退出登录</a></Menu.Item>
              </SubMenu>
            </Menu>
          </Col>
        </Row>
      </div>
    )
  }
}
