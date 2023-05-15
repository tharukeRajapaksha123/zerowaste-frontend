// src/components/Home.js

import React from 'react';
import { Layout, Card, Col, Row } from 'antd';
import { EnvironmentOutlined, UserOutlined, CarryOutOutlined, TeamOutlined } from '@ant-design/icons';
import {useNavigate} from "react-router-dom"
import './Home.css'; // Import the CSS file

const { Header, Content, Footer } = Layout;

const Home = () => {
    const navigate  = useNavigate()
  return (
    <Layout className="layout">
      <Header>
        <div className="logo" />
        // Add your navbar here
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <div className="site-layout-content">
          <Row gutter={16}>
            <Col span={12}>
              <Card 
                className='home-button'
                title="Collector Response" 
                bordered={false} 
                hoverable
                onClick={() => {
                    navigate("/collector-response")
                }}
                >
                <UserOutlined style={{ fontSize: '72px', color: '#52c41a' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                title="Assign Work" 
                className='home-button'
                bordered={false} 
                hoverable
                onClick={() => {/*navigate to the Assign Work page*/}}
                >
                <CarryOutOutlined style={{ fontSize: '72px', color: '#52c41a' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                title="Manage Collectors" 
                className='home-button'
                bordered={false} 
                hoverable
                onClick={() => {/*navigate to the Manage Collectors page*/}}
                >
                <TeamOutlined style={{ fontSize: '72px', color: '#52c41a' }} />
              </Card>
            </Col>
            <Col span={12}>
              <Card 
                title="Manage Clients" 
                className='home-button'
                bordered={false} 
                hoverable
                onClick={() => {/*navigate to the Manage Clients page*/}}
                >
                <EnvironmentOutlined style={{ fontSize: '72px', color: '#52c41a' }} />
              </Card>
            </Col>
          </Row>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>Zero Waste ©2023 Created by OpenAI</Footer>
    </Layout>
  );
}

export default Home;
