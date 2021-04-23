import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import styles from '../public/style/pages/index.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
import { Row, Col, List, Icon, Breadcrumb, Pagination } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import Link from 'next/link'

export default function MyList(list) {
    const [mylist, setMylist] = useState(list.data);
    const [page, setPage] = useState(1)
    useEffect(() => {
        setMylist(list.data)
    })
    function onPageChange(page) {
        setPage(page)
        window.location.hash = `#${page}`;
    }
    return (
        <div>
            <Head>

                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Row className="commmain" type="flex" justify="center">
                <Col className="commleft" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div className="breaddiv">
                        <Breadcrumb>
                            <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                            <Breadcrumb.Item>学习</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                    <List
                        itemLayout="vertical"
                        dataSource={mylist.filter((u, index) => index < 10 * page && index >= 10 * (page - 1))}
                        renderItem={item => (
                            <List.Item>
                                <div className={styles.listtitle}>
                                    <Link href={{ pathname: '/detailed', query: { id: item.id } }}>
                                        <a>{item.title}</a>
                                    </Link>
                                </div>
                                <div className={styles.listicon}>
                                    <span><Icon type="calendar" />{item.addTime}</span>
                                    <span><Icon type="folder" /> {item.typeName}</span>
                                    {/* <span><Icon type="fire" />  {item.view_count}人</span> */}
                                </div>
                                <div className={styles.listcontext}>{item.introduce}</div>
                            </List.Item>
                        )}
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

MyList.getInitialProps = async (context) => {

    let id = context.query.id
    const promise = new Promise((resolve) => {
        axios(servicePath.getListById + id).then(
            (res) => resolve(res.data)
        )
    })
    return await promise
}