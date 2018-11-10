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
        if (resp.status === 0 && resp.data.isLogin) {
          // 已登陆
          localStorage.setItem('userInfo', JSON.stringify(resp.data.userInfo));
          this.setState({
            isLogin: resp.data.isLogin,
            userInfo: resp.data.userInfo
          });
        } else {
          // 未登录
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
            {/*todo logo*/}
            <div className="logo"><img src="" alt=""/></div>
            <Menu mode="horizontal" theme="dark" className="nav-container">
              <Menu.Item key="nav0"><a href={url.home}>首页</a></Menu.Item>
              <Menu.Item key="nav1"><a href={url.forum}>交流区</a></Menu.Item>
              <Menu.Item key="nav2"><a href={url.cloud}>资源区</a></Menu.Item>
              <Menu.Item key="nav3"><a href={url.news}>热门消息</a></Menu.Item>
              <Menu.Item key="nav4"><a href={url.wiki}>科普区</a></Menu.Item>
              <Menu.Item key="nav5"><a href={url.about}>关于我们</a></Menu.Item>
            </Menu>
          </Col>
          <Col span="4" className="user">
            {(() => {
              if (this.state.isLogin) {
                return (
                  <Menu mode="horizontal" theme="dark">
                    <Menu.Item key="0" className="user-avatar">
                      <a href={url.userCenter}>
                        <img src={this.state.avatar} alt={this.state.userInfo.username}/>
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
            })()}
          </Col>
        </Row>
      </div>
    )
  }
}
