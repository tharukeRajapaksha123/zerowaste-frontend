// src/components/UpdateAssignWork.js

import React, { useState, useEffect } from 'react';
import { Layout, Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import './UpdateAssignWork.css'; // Import the CSS file
import { useParams, useNavigate } from "react-router-dom"

const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const UpdateAssignWork = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [assignWork, setAssignWork] = useState(null);
    const assignWorkId = params.id; // Assuming that you are using react-router and the id of the assigned work is in the url.

    useEffect(() => {
        const fetchAssignWork = async () => {
            const result = await axios.get(`http://localhost:5000/api/workAssignments/${assignWorkId}`);
            setAssignWork(result.data);
        };

        fetchAssignWork();
    }, [assignWorkId]);

    const onFinish = async (values) => {
        await axios.put(`http://localhost:5000/api/workAssignments/${assignWorkId}`, values).then((val) => {
            message.success("Assigned Work updated successfully").then((val) => {
                navigate("/work-response")
            })
        }).catch(err => {
            message.error("Update Assigned Work Failed")
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
                    {assignWork && (
                        <Form
                            name="update-assign-work"
                            onFinish={onFinish}
                            initialValues={assignWork}
                        >
                            <Form.Item
                                name="workDescription"
                                rules={[{ required: true, message: 'Please input the work description!' }]}
                            >
                                <TextArea placeholder="Work Description" />
                            </Form.Item>

                            <Form.Item
                                name="assignee"
                                rules={[{ required: true, message: 'Please input the assignee!' }]}
                            >
                                <Input placeholder="Assignee" />
                            </Form.Item>

                            <Form.Item
                                name="priority"
                                rules={[{ required: true, message: 'Please select the priority!' }]}
                            >
                                <Select placeholder="Priority">
                                    <Option value="high">High</Option>
                                    <Option value="medium">Medium</Option>
                                    <Option value="low">Low</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="deadline"
                                rules={[{ required: true, message: 'Please input the deadline!' }]}
                            >
                                <Input placeholder="Deadline" />
                            </Form.Item>

                            <Form.Item
                                name={['contactInformation', 'name']}
                                rules={[{ required: true, message: 'Please input the contact name!' }]}
                            >
                                <Input placeholder="Contact Name" />
                            </Form.Item>

                            <Form.Item
                                name={['contactInformation', 'email']}
                                rules={[{ required: true, message: 'Please input the email!' }, { type: 'email', message: 'The input is not a valid email!' }]}
                            >
                                <Input placeholder="Email" />
                            </Form.Item>

                            <Form.Item
                                name={['contactInformation', 'phone']}
                                rules={[{ required: true, message: 'Please input the phone number!' }]}
                            >
                                <Input placeholder="Phone Number" />
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

export default UpdateAssignWork;
