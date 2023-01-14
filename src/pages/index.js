import React from "react";
import Head from 'next/head'
import Link from 'next/link'
import {Row,Col} from 'antd'

import Header from '../components/Header'
import Author from "../components/Author";
import Footer from "../components/Footer";
import List from "../components/List";


const Home = () => (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-box" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <List />
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>
      </Row>
      <Footer />
    </div>
)
export default Home
