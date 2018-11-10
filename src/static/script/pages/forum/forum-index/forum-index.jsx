import React from 'react';
import ReactDOM from 'react-dom';
import {Row, Col} from 'antd';
import Header from '../../../components/Header/Header.jsx';
import ForumList from '../forum-list/forum-list.jsx';
import './forum-index.less';


class ForumIndex extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="forum-index">
        <Header/>
        <Row>
          <Col span="2"/>
          <Col span="20">
            <ForumList/>
          </Col>
          <Col span="2"/>
        </Row>
      </div>
    )
  }
}

ReactDOM.render(<ForumIndex/>, document.getElementById('root'));
if (module.hot) module.hot.accept();
