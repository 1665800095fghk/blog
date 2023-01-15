import React, { useState } from "react";
import Head from "next/head";
import { Row, Col, Breadcrumb, Affix } from "antd";
import { FormOutlined } from "@ant-design/icons";
import ReactMarkdown from "react-markdown";
import MarkdownNavbar from "markdown-navbar";

import Header from "@/components/Header";
import Author from "@/components/Author";
import Footer from "@/components/Footer";

let markdown =
  "# P01:课程介绍和环境搭建\n" +
  "[ **M** ] arkdown + E [ **ditor** ] = **Mditor**  \n" +
  "> Mditor 是一个简洁、易于集成、方便扩展、期望舒服的编写 markdown 的编辑器，仅此而已... \n\n" +
  "**这是加粗的文字**\n\n" +
  "*这是倾斜的文字*`\n\n" +
  "***这是斜体加粗的文字***\n\n" +
  "~~这是加删除线的文字~~ \n\n" +
  "`console.log(111)` \n\n" +
  "```javascript \n" +
  "function s00(params) {}" +
  "console.log('Hello World');\n" +
  "``` \n" +
  "# p02:来个Hello World 初始Vue3.0\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n" +
  "***\n\n\n" +
  "# p03:Vue3.0基础知识讲解\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n\n" +
  "# p04:Vue3.0基础知识讲解\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n\n" +
  "#5 p05:Vue3.0基础知识讲解\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n\n" +
  "# p06:Vue3.0基础知识讲解\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n\n" +
  "# p07:Vue3.0基础知识讲解\n" +
  "> aaaaaaaaa\n" +
  ">> bbbbbbbbb\n" +
  ">>> cccccccccc\n\n" +
  "``` var a=11; ```";

const Detailed = () => {
  return (
    <div>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-box" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
          <div>
            <div className="bread-div">
              <Breadcrumb>
                <Breadcrumb.Item>
                  <a href="/">首页</a>
                </Breadcrumb.Item>
                <Breadcrumb.Item>视频列表</Breadcrumb.Item>
                <Breadcrumb.Item>xxxx</Breadcrumb.Item>
              </Breadcrumb>
            </div>

            <div>
              <div className="detailed-title">Vivo50</div>
              <div className="list-icon center">
                <span>
                  <FormOutlined />
                  {new Date().toLocaleDateString()}
                </span>
                <span>
                  <FormOutlined />
                  类别
                </span>
                <span>
                  <FormOutlined />
                  观看次数
                </span>
              </div>

              <div className="detailed-content">
                该项目由罗毅友情arkdown赞助
                <ReactMarkdown children={markdown} />
              </div>
            </div>
          </div>
        </Col>
        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkdownNavbar
                className="article-menu"
                source={markdown}
                ordered={false}
              />
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer />
    </div>
  );
};

export default Detailed;
