import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>hello {this.props.text}</div>
    )
  }
}

ReactDOM.render(<Index text={'啦啦啦'}/>, document.getElementById('root'));
