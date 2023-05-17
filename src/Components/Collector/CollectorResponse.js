// src/components/CollectorsResponse.js

import React, { useState, useEffect } from 'react';
import { Layout, Button, Input, Table } from 'antd';
import axios from 'axios';
import './CollectorsResponse.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"
const { Header, Content, Footer } = Layout;
const { Search } = Input;

const CollectorsResponse = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const navigator = useNavigate()
    const fetchCollectors = async () => {
        const result = await axios.get('http://localhost:5000/api/collectors');
        setData(result.data);
    };

    useEffect(() => {
        fetchCollectors();
    }, []);

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Contact',
            dataIndex: 'contactInformation',
            render: (contact) => <div>
                <p>{contact.phone}</p>
                <p>{contact.email}</p>
                <p>{contact.address}</p>
            </div>,
        },
        {
            title: 'ID Number',
            dataIndex: 'idNumber',
        },
        {
            title: 'Work Schedule',
            dataIndex: 'workSchedule',
        },
        {
            title: 'Assigned Areas',
            dataIndex: 'assignedAreas',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <Button type="primary" onClick={() => {
                        navigator(`/update-collector/${record._id}`)
                    }}>Update</Button>
                    <Button type="danger" onClick={async () => {
                        await axios.delete(`http://localhost:5000/api/collectors/${record._id}`).then(async (res) => {
                            const result = await axios.get('http://localhost:5000/api/collectors');
                            setData(result.data);
                        })
                    }}>Delete</Button>
                </span>
            ),
        },
    ];

    const filteredData = data.filter((collector) =>
        collector.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
        // Add your navbar here
            </Header>
            <div className="actions">
                <Button type="primary"
                    onClick={(e) => {
                        navigator("/add-collector")
                    }}
                    style={{ marginRight: '20px' }}>Add New Collector</Button>
                <Search
                    placeholder="Search by Name"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">

                    <Table columns={columns} dataSource={filteredData} />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by Gayashan</Footer>
        </Layout>
    );
}

export default CollectorsResponse;
