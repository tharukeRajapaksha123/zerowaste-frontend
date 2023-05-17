// src/components/AddAssignWork.js

import React, { useEffect, useState } from 'react';
import { Layout, Form, Input, Button, Select, message } from 'antd';
import axios from 'axios';
import './AddAssignWork.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';
const { Header, Content, Footer } = Layout;
const { TextArea } = Input;
const { Option } = Select;

const AddAssignWork = () => {
    const [collectors, setCollectors] = useState([])
    const navigate = useNavigate()
    const onFinish = async (values) => {
        await axios.post('http://localhost:5000/api/workAssignments', values).then(() => {
            message.success("Added succesfully")
            navigate("/work-response")
        }).catch(err => {
            message.error("Adding failed")
        });

    };

    const fetchCollectors = async () => {
        const result = await axios.get('http://localhost:5000/api/collectors');
        setCollectors(result.data);
    };

    useEffect(() => {
        fetchCollectors()
    }, [])
    return (
        <Layout className="layout">
            <Header>
                <div className="logo" />
        // Add your navbar here
            </Header>
            <Content style={{ padding: '0 50px' }}>
                <div className="site-layout-content">
                    <Form
                        name="add-assign-work"
                        onFinish={onFinish}
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
                            <Select placeholder="Assaignee">
                                {
                                    collectors.map((collector, index) => {
                                        return <Option key={index} value={collector.name}>{collector.name}</Option>
                                    })
                                }
                            </Select>
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
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by OpenAI</Footer>
        </Layout>
    );
}

export default AddAssignWork;
