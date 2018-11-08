import React from 'react';
import ReactDOM from 'react-dom';
import Header from '../../../components/Header/Header.jsx';
import './forum-index.less';


class ForumIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="forum-index">
        <Header/>
      </div>
    )
  }
}

ReactDOM.render(<ForumIndex/>, document.getElementById('root'));
if (module.hot) module.hot.accept();
