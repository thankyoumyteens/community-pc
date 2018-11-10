import React from 'react';
import {List, Icon} from 'antd';
import './forum-list.less';


export default class ForumList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: '#',
        title: `标题 ${i}`,
        description: 'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content: 'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
    }

    const IconText = ({type, text}) => (<span><Icon type={type} style={{marginRight: 8}}/>{text}</span>);

    return (
      <div className="forum-list">
        <List
          itemLayout="vertical"
          size="large"
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 3,
          }}
          dataSource={listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              actions={[<IconText type="star-o" text="156"/>, <IconText type="like-o" text="156"/>, <IconText type="message" text="2"/>]}
              extra={<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"/>}
            >
              <List.Item.Meta
                title={<a href={item.href}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    )
  }
}
