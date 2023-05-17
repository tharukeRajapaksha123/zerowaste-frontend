// src/components/UpdateClient.js

import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useParams, useNavigate } from "react-router-dom"
const { Header, Content, Footer } = Layout;

const UpdateClient = () => {
    const navigate = useNavigate()
    const params = useParams()
    const [client, setClient] = useState(null);
    const clientId = params.id; // Assuming that you are using react-router and the id of the client is in the url.

    useEffect(() => {
        const fetchClient = async () => {
            await axios.get(`http://localhost:5000/api/clients/${clientId}`).then((value) => {
                setClient(value.data);
            }).catch(err => {
                message.error("failed to fetch client data")
            });

        };

        fetchClient();

    }, [clientId]);

    const onFinish = async (values) => {
        await axios.put(`http://localhost:5000/api/clients/${clientId}`, values).then((val) => {
            message.success("Client updated successfully").then((val) => {
                navigate("/client-response")
            })
                .catch(err => {
                    message.error("Update Client Failed")

                })
        });
    }

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
                    // Add your navbar here
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {client && (
                        <Form
                            name="update-client"
                            onFinish={onFinish}
                            initialValues={client}
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
                                    Update Client
                                </Button>
                            </Form.Item>
                        </Form>
                    )}
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by OpenAI</Footer>
        </Layout>
    );
}


export default UpdateClient;