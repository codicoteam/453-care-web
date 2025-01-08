import React from 'react';
import { Space, Table, Tag } from 'antd';
const columns = [
  {
    title: 'Care Type',
    dataIndex: 'caretype',
    key: 'caretype',
    render: (text) => <a>{text}</a>,
  },
  {
    title: 'Dsiplay in app',
    dataIndex: 'displayinapp',
    key: 'displayinapp',
  },
  
 
  {
    title: 'Action',
    key: 'action',
    dataIndex: 'action',
    render: (_, { action }) => (
      <>
        {action.map((tag) => {
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
    caretype: 'Personal care',
    displayinapp: 'No',
    action: [ 'Edit'],
  },
  {
    key: '2',
    caretype: 'Shopping',
    displayinapp: 'Yes',
    action: ['Edit'],
  },

  {
    key: '3',
    caretype: 'Meal Prep',
    displayinapp: 'Yes',
    action: ['Edit'],
  },
  {
    key: '4',
    caretype: 'Make a cup of tea',
    displayinapp: 'Yes',
    action: ['Edit'],
  },
  {
    key: '5',
    caretype: 'Make a cup of coffee',
    displayinapp: 'Yes',
    action: ['Edit'],
  },
  {
    key: '5',
    caretype: 'Feed the fish',
    displayinapp: 'Yes',
    action: ['Edit'],
  },
  {
    key: '5',
    caretype: 'Walk the dog',
    displayinapp: 'No',
    action: ['Edit'],
  },
  {
    key: '5',
    caretype: 'Dementia care',
    displayinapp: 'Yes',
    action: ['Edit'],
  },
];
const CareRequistTable = () => <Table columns={columns} dataSource={data} />;
export default CareRequistTable;