import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Client',
    dataIndex: 'client',
    key: 'client',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Options',
    key: 'options',
    render: (_, record) => (
      <Space size="middle">
        <a>Edit roaster</a>
      </Space>
    ),
  },
  {
    title: '',
    key: 'recomment',
    dataIndex: 'recoment',
    render: (_, { options }) => (
      <>
        {options.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  
];
const data = [
  {
    key: '1',
    client: 'John Brown',
    date: 32,
    time: '17:00 - 20:00',
    options: [ 'Recommend'],
  },
  {
    key: '2',
    client: 'Jim Green',
    date: 42,
    time: '18:00 - 21:00',
    options: ['Recommend'],
  },

  {
    key: '3',
    client: 'Joe Black',
    date: 32,
    time: '15:00 - 20:00',
    options: ['Recommend'],
  },
  {
    key: '4',
    client: 'Jim Peter',
    date: 42,
    time: '18:00 - 21:00',
    options: ['Recommend'],
  },
  {
    key: '5',
    client: 'Tindo Fram',
    date: 49,
    time: '16:00 - 21:00',
    options: ['Recommend'],
  },
  {
    key: '5',
    client: 'John Doe ',
    date: 40,
    time: '13:00 - 21:00',
    options: ['Recommend'],
  },
  {
    key: '5',
    client: 'Holy Fram',
    date: 50,
    time: '18:00 - 21:00',
    options: ['Recommend'],
  },
  {
    key: '5',
    client: 'Six Fram',
    date: 50,
    time: '18:00 - 21:00',
    options: ['Recommend'],
  },
];
const HomeTable = () => <Table columns={columns} dataSource={data} />;
export default HomeTable;