import React from 'react';
import {Alert, Spin, Icon} from 'antd';
import './forum-list.less';
import ListView from '../../../components/ListView/ListView.jsx';
import {Status} from '../../../common/Constants.js';


export default class ForumList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      listData: null,
      listDataStatus: Status.SUCCESS,
    };
  }

  componentDidMount() {
    this.getListData();
  }

  /**
   * 获取文章列表
   */
  getListData() {
    this.setState({
      isLoading: true
    });
    // todo ajax
    const listData = [];
    for (let i = 0; i < 20; i++) {
      listData.push("item" + i);
    }
    setTimeout(() => {
      this.setState({
        isLoading: false,
        listDataStatus: Status.SUCCESS,
        listData: listData
      });
    }, 3000);
  }

  render() {
    const antIcon = <Icon type="loading" style={{fontSize: 24}} spin/>;

    return (
      <div className="forum-list">
        {(() => {
          if (this.state.isLoading) {
            return <Spin size="large" indicator={antIcon}/>
          } else {
            if (this.state.listDataStatus === Status.SUCCESS) {
              return <ListView list={this.state.listData}/>
            } else if (this.state.listDataStatus === Status.ERROR) {
              return <Alert
                message="出错啦"
                description="加载失败, 请重试"
                type="error"
                showIcon
              />
            }
          }
        })()}
      </div>
    )
  }
}
