import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import '../static/css/AdminIndex.css'
import React, { useState } from 'react'
import { Link, Route } from 'react-router-dom'
import AddArticle from './AddArticle'
import ArticleList from './ArticleList'
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

function AdiminIndex(props) {
  const [collapsed, setCollapsed] = useState(false)


  const onCollapse = collapsed => {
    setCollapsed(collapsed);
  };
  // const handleClickArticle = e => {
  //   if (e.key == 'addArticle') {
  //     props.history.push('/index/add')
  //   } else {
  //     props.history.push('/index/list')
  //   }
  // }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
          <Menu.Item key="1">
            <Icon type="pie-chart" />
            <span>工作台</span>
          </Menu.Item>
          <SubMenu
            key="sub1"
            // onClick={handleClickArticle}
            title={
              <span>
                <Icon type="user" />
                <span>文章管理</span>
              </span>
            }
          >
            <Menu.Item key="addArticle"><Link to="/index/add"></Link>添加文章</Menu.Item>
            <Menu.Item key="ArticleList"><Link to="/index"></Link>文章列表</Menu.Item>

          </SubMenu>


        </Menu>
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: 0 }} />
        <Content style={{ margin: '0 16px' }}>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>后台管理系统</Breadcrumb.Item>
            <Breadcrumb.Item>工作台</Breadcrumb.Item>
          </Breadcrumb>
          <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
            <div>
              <Route path="/index/add" exact component={AddArticle} />
              <Route path="/index" exact component={ArticleList} />
              <Route path="/index/list" exact component={ArticleList} />
              <Route path="/index/add/:id" exact component={AddArticle} />

            </div>
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>葡萄</Footer>
      </Layout>
    </Layout>
  );
}

export default AdiminIndex