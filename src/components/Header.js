import React from "react"
import {Row,Col,Menu} from "antd"



const Header = () => {
  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={15} xl={12}>
          <span className="header-logo">Fghk</span>
          <span className="header-txt">宅男而已</span>
        </Col>

        <Col className="menu-div" xs={0} sm={0} md={14} lg={8} xl={6}>
          <Menu mode="horizontal">
            <Menu.Item key="home">
              首页
            </Menu.Item>
            <Menu.Item key="article">
              文章
            </Menu.Item>
            <Menu.Item key="about">
              关于
            </Menu.Item>
            <Menu.Item key="d1">
              待定
            </Menu.Item>
            <Menu.Item key="d2">
              待定
            </Menu.Item>
          </Menu>
        </Col>
      </Row>
    </div>
  )
}

export default Header