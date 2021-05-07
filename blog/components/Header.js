import styles from '../public/style/components/header.module.css'
import { Row, Col, Icon, Menu } from 'antd'

import React, { useState, useEffect, memo } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'


const Header = () => {

    const [navArray, setNavArray] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then(
                (res) => {
                    return res.data.data
                }
            )
            setNavArray(result)

        }
        fetchData()


    }, [])
    //跳转到列表页
    const handleClick = (e) => {
        if (e.key == 0) {
            Router.push('/')
        } else {
            console.log(e)
            Router.push('/list?id=' + e.key[e.key.length - 1])
        }
    }
    return (
        <div className={styles.header}>
            <Row type="flex" justify="center">
                <Col xs={21} sm={20} md={10} lg={15} xl={12}>
                    <span className={styles.headerlogo}><Link href={{ pathname: '/' }}>
                        <a style={{ color: 'pink' }}> 葡萄</a>
                    </Link></span>
                    <span className={styles.headertxt} style={{ color: 'green' }}>有人见星辰，有人见尘埃</span>
                </Col>
                <Col xs={3} sm={3} md={14} lg={14} xl={6}>
                    <Menu mode="horizontal"
                        onClick={handleClick}>
                        <Menu.Item key="0">
                            <Icon type="home" />
                        首页
                        </Menu.Item>
                        {
                            navArray.map((item) => {
                                return (
                                    <Menu.Item key={item.Id}>
                                        <Icon type={item.icon} />
                                        {item.typeName}
                                    </Menu.Item>
                                )
                            })
                        }


                    </Menu>
                </Col>
            </Row>
        </div >)
}
export default memo(Header)