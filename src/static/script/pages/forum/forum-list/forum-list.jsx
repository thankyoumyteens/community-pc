import React from 'react';
import {Alert, Spin, Icon} from 'antd';
import './forum-list.less';
import ListView from '../../../components/ListView/ListView.jsx';
import {Status} from '../../../common/Constants.js';
import ajaxUtil from '../../../../util/ajaxUtil.js';
import {url} from '../../../properties.js';


export default class ForumList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      listData: null,
      listDataStatus: Status.SUCCESS,
      pageIndex: 1,
      pageSize: 10,
      pageCount: 1,
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
    ajaxUtil.get(url.forumList, {
      pageIndex: this.state.pageIndex,
      pageSize: this.state.pageSize
    }).then(resp => {
      if (resp.status === Status.SUCCESS) {
        let data = resp.data;
        this.setState({
          isLoading: false,
          listDataStatus: Status.SUCCESS,
          listData: data.list,
          pageIndex: data.pageIndex,
          pageCount: data.pageCount
        });
      } else {
        console.log("get forum list status error: ", resp.msg);
        this.setState({
          isLoading: false,
          listDataStatus: Status.ERROR
        });
      }
    }).catch(error => {
      console.error("get forum list error: ", error);
      this.setState({
        isLoading: false,
        listDataStatus: Status.ERROR
      });
    });
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
