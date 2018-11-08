import React from 'react';
import {Row, Col} from 'antd';
import './Header.less';


export default class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <Row>
          <Col span="20">
            header
          </Col>
          <Col span="4">
            user
          </Col>
        </Row>
      </div>
    )
  }
}
