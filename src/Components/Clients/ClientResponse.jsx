// src/components/ClientsResponse.js

import React, { useState, useEffect } from 'react';
import { Layout, Button, Table, Space, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './ClientsResponse.css'; // Import the CSS file
const { Header, Content, Footer } = Layout;

const ClientsResponse = () => {
    const [clients, setClients] = useState([]);

    useEffect(() => {
        const fetchClients = async () => {
            const result = await axios.get('http://localhost:5000/api/clients');
            setClients(result.data);
        };

        fetchClients();
    }, []);

    const deleteClient = async (id) => {
        await axios.delete(`http://localhost:5000/api/clients/${id}`).then((val) => {
            message.success("Client deleted successfully").then((val) => {
                setClients(clients.filter(client => client._id !== id))
            })
        }).catch(err => {
            message.error("Delete Client Failed")
        });
    };

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Contact Information',
            dataIndex: 'contactInformation',
            key: 'contactInformation',
            render: (contactInformation) => `${contactInformation.phone}, ${contactInformation.email}, ${contactInformation.address}`,
        },
        {
            title: 'Service Address',
            dataIndex: 'serviceAddress',
            key: 'serviceAddress',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <Link to={`/update-client/${record._id}`}>Update</Link>
                    <Button type="link" onClick={() => deleteClient(record._id)}>Delete</Button>
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
            <Button type="primary" style={{ marginBottom: '16px' }}><Link to="/add-client">Add New Client</Link></Button>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">

                    <Table dataSource={clients} columns={columns} rowKey="_id" />
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by OpenAI</Footer>
        </Layout>
    );
}

export default ClientsResponse;
