import React from 'react';
import ReactDOM from 'react-dom';

class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>首页{this.props.text}</div>
    )
  }
}

ReactDOM.render(<Index text={'哈哈哈'}/>, document.getElementById('root'));
if (module.hot) module.hot.accept();
