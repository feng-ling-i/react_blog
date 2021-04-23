import React, { useState } from 'react'
import Head from 'next/head'
import styles from '../public/style/pages/index.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import servicePath from '../config/apiUrl'

import { Row, Col, List, Icon, Pagination } from 'antd'
import Link from 'next/link'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'


export default function Home(list) {
  const renderer = new marked.Renderer()
  const [mylist, setMylist] = useState(list.data)
  const [page, setPage] = useState(1)
  marked.setOptions({
    renderer: renderer,
    gfm: true,
    pedantic: false,
    sanitize: false,
    tables: true,
    breaks: false,
    smartLists: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value
    }
  })
  function onPageChange(page) {
    setPage(page)
    window.location.hash = `#${page}`;
  }
  return (
    <div>
      <Head>

        <title>葡萄</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Row className="commmain" type="flex" justify="center">
        <Col className="commleft" xs={24} sm={24} md={16} lg={18} xl={14}>

          <List
            header={<div>日志目录</div>}
            itemLayout="vertical"
            dataSource={mylist.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))}
            renderItem={item => {
              return <List.Item>
                <div className={styles.listtitle}>
                  <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                    <a>{item.title}</a>
                  </Link></div>

                <div className={styles.listicon}>
                  <span><Icon type="calendar" /> {item.addTime} </span>
                  <span><Icon type="folder" />{item.typeName} </span>
                  {/* <span><Icon type="fire" /> {item.view_count} </span> */}

                </div>
                <div className={styles.listcontext} dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}></div>
              </List.Item>
            }}
          />
        </Col>
        <Col className="commright" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
        </Col>

      </Row>

      <Row className="commmain" type="flex" justify="center">
        <Pagination defaultCurrent={page} current={page} onChange={onPageChange} total={mylist.length} pageSize={10}
        />

      </Row>

      <Footer />
    </div>
  )
}

// Home.getInitialProps = async () => {
//   const promise = new Promise((resolve) => {
//     axios('http://127.0.0.1:7001/default/getArticleList').then(
//       (res) => {
//         console.log('远程获取数据结果:', res.data.data)
//         resolve(res.data)
//       }
//     )
//   })

//   return await promise
// }
Home.getInitialProps = async () => {
  const promise = new Promise((resolve) => {
    axios(servicePath.getArticleList).then(
      (res) => {
        resolve(res.data)
      }
    )
  })

  return await promise
}