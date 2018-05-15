import React from "react";
import { Layout, Menu, Breadcrumb } from 'antd';
const { Header, Content, Footer } = Layout;

export default function({children}){
  return <Layout>
        <Header><span style={{    color: '#fff','fontSize': 20}}>DREAM</span></Header>
        <Content>{children}</Content>
      </Layout>
}