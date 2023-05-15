// src/components/UpdateCollector.js

import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, message } from 'antd';
import axios from 'axios';
import './CollectorsResponse.css'; // Import the CSS file
import { useParams,useNavigate } from "react-router-dom"
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;

const UpdateCollector = () => {
    const navigator = useNavigate()
    const params = useParams()
    const [collector, setCollector] = useState(null);
    const collectorId = params.id; // Assuming that you are using react-router and the id of the collector is in the url.

    useEffect(() => {
        const fetchCollector = async () => {
            const result = await axios.get(`http://localhost:5000/api/collectors/${collectorId}`);
            setCollector(result.data);
        };

        fetchCollector();
    }, [collectorId]);

    const onFinish = async (values) => {
        await axios.put(`http://localhost:5000/api/collectors/${collectorId}`, values).then((val) => {
            message.success("Collector added sucessfully").then((val) => {
                navigator("/collector-response")
            })
        }).catch(err => {
            message.error("Add Collector Failed")
        });;
    };

    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
        // Add your navbar here
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    {collector && (
                        <Form
                            name="update-collector"
                            onFinish={onFinish}
                            initialValues={collector}
                        >
                            <Form.Item
                                name="name"
                                rules={[{ required: true, message: 'Please input the collector name!' }]}
                            >
                                <Input placeholder="Collector Name" />
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
                                name="idNumber"
                                rules={[{ required: true, message: 'Please input the ID number!' }]}
                            >
                                <Input placeholder="ID Number" />
                            </Form.Item>

                            <Form.Item
                                name="workSchedule"
                                rules={[{ required: true, message: 'Please input the work schedule!' }]}
                            >
                                <TextArea placeholder="Work Schedule" />
                            </Form.Item>

                            <Form.Item
                                name="assignedAreas"
                                rules={[{ required: true, message: 'Please input the assigned areas!' }]}
                            >
                                <TextArea placeholder="Assigned Areas" />
                            </Form.Item>

                            <Form.Item>
                                <Button type="primary" htmlType="submit">
                                    Update
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

export default UpdateCollector;
