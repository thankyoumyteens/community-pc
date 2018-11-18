import React from 'react';
import './ListItem.less';

export default class ListItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.item}
      </div>
    )
  }
}
