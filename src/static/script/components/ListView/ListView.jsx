import React from 'react';
import './ListView.less';
import ListItem from './ListItem/ListItem.jsx';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="list-view">
        {(() => {
          if (this.props.list && this.props.list.length > 0) {
            return this.props.list.map((val, index) => {
              return <ListItem item={val} key={index}/>
            });
          } else {
            // list empty
            return <div className="list-view-empty">
              <span>暂无数据</span>
            </div>
          }
        })()}
      </div>
    )
  }
}
