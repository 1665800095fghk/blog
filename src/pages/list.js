import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {Row,Col,Breadcrumb} from 'antd'

import Header from '../components/Header'
import Author from "../components/Author";
import Footer from "../components/Footer";
import List from "../components/List";


const list = () => (
    <div>
      <Head>
        <title>List</title>
      </Head>
      <Header />
      <Row className="comm-box" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>

          <div className="bread-div">
            <Breadcrumb>
              <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
              <Breadcrumb.Item>文章列表</Breadcrumb.Item>
            </Breadcrumb>
          </div>

          <List />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </div>
)
export default list