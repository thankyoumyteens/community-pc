import React from 'react';
import './ListView.less';
import ListItem from './ListItem/ListItem.jsx';

export default class ListView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {(() => {
          if (this.props.list) {
            return this.props.list.map((val, index) => {
              return <ListItem item={val} index={index}/>
            });
          } else {
            // todo list empty
          }
        })()}
      </div>
    )
  }
}
