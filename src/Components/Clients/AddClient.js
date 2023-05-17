// src/components/AddClient.js

import React from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './AddClient.css'; // Import the CSS file
import { useNavigate } from "react-router-dom"

const { Header, Content, Footer } = Layout;

const AddClient = () => {
    const navigate = useNavigate()

    const onFinish = async (values) => {
        await axios.post('http://localhost:5000/api/clients', values).then((val) => {
            message.success("Client added successfully").then((val) => {
                navigate("/client-response")
            })
        }).catch(err => {
            message.error("Add Client Failed")
        });
    };

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                // Add your navbar here
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Form
                        name="add-client"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="name"
                            rules={[{ required: true, message: 'Please input the client name!' }]}
                        >
                            <Input placeholder="Client Name" />
                        </Form.Item>

                        <Form.Item
                            name={['contactInformation', 'phone']}
                            rules={[{ required: true, message: 'Please input the phone number!' }]}
                        >
                            <Input placeholder="Phone Number" />
                        </Form.Item>

                        <Form.Item
                            name={['contactInformation', 'email']}
                            rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'The input is not a valid email!' }]}
                        >
                            <Input placeholder="Email" />
                        </Form.Item>

                        <Form.Item
                            name={['contactInformation', 'address']}
                            rules={[{ required: true, message: 'Please input the address!' }]}
                        >
                            <Input placeholder="Address" />
                        </Form.Item>

                        <Form.Item
                            name="serviceAddress"
                            rules={[{ required: true, message: 'Please input the service address!' }]}
                        >
                            <Input placeholder="Service Address" />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Add Client
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by OpenAI</Footer>
        </Layout>
    );
}

export default AddClient;
