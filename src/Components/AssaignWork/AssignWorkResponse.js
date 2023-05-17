// src/components/AssignWorkResponse.js

import React, { useState, useEffect } from 'react';
import { Layout, Table, Space, Button, Input } from 'antd';
import axios from 'axios';
import './AssignWorkResponse.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const AssignWorkResponse = () => {
  const [data, setData] = useState([]);
  const navigator = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get('http://localhost:5000/api/workAssignments');
      setData(result.data);
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: 'Work Description',
      dataIndex: 'workDescription',
      key: 'workDescription',
    },
    {
      title: 'Assignee',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: 'Priority',
      dataIndex: 'priority',
      key: 'priority',
    },
    {
      title: 'Deadline',
      dataIndex: 'deadline',
      key: 'deadline',
    },
    {
      title: 'Contact Information',
      dataIndex: 'contactInformation',
      key: 'contactInformation',
      render: (text, record) => `${record.contactInformation.name}, ${record.contactInformation.email}, ${record.contactInformation.phone}`,
    },
    {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="primary" onClick={() => { navigator(`/update-work/${record._id}`) }}>Update</Button>
          <Button type="danger" onClick={async () => {
            await axios.delete(`http://localhost:5000/api/workAssignments/${record._id}`).then(async (res) => {
              const result = await axios.get('http://localhost:5000/api/workAssignments');
              setData(result.data);
            })
          }}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        // Add your navbar here
      </Header>
      <div className="actions">
        <Button type="primary" onClick={() => {
          navigator("/add-work")
        }}>Add New Assign Work</Button>
        <Search placeholder="Search Assign Work" onSearch={value => {/*search handler*/ }} enterButton />
      </div>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">

          <Table columns={columns} dataSource={data} />
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by Gayashan</Footer>
    </Layout>
  );
}

export default AssignWorkResponse;
