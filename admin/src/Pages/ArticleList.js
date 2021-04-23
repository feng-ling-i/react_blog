import React, { useState, useEffect } from 'react'
import { Link, Route } from 'react-router-dom'
import { List, Row, Col, Modal, message, Button } from 'antd'
import axios from 'axios'
import servicePath from '../config/apiUrl'
import '../static/css/ArticleList.css'
const { confirm } = Modal


function ArticleList(props) {
    const [list, setList] = useState([])
    useEffect(() => {
        getList()
    }, [])
    const getList = () => {
        axios({
            method: 'get',
            url: servicePath.getArticleList,
            withCredentials: true
        }).then(
            res => {
                setList(res.data.list)
            }
        )
    }
    const delArticle = (id) => {
        confirm(
            {
                title: '确定要删除这篇博客吗？',
                content: '点击ok，文章将永远被删除',
                onOk() {
                    axios(servicePath.delArticle + id, { withCredentials: true }).then(
                        res => {
                            message.success('文章删除成功')
                            getList()
                        }
                    )

                },
                onCancel() {
                    message.success('文章没变化')
                }

            }
        )
    }
    const updateArticle = (id) => {
        props.history.push('/index/add/' + id)
    }
    return (
        <div>
            <List
                header={
                    <Row className="list-div">
                        <Col span={8}>
                            <b>标题</b>
                        </Col>
                        <Col span={4}>
                            <b>类别</b>
                        </Col>
                        <Col span={4}>
                            <b>发布时间</b>
                        </Col>
                        <Col span={4}>
                            <b>浏览量</b>
                        </Col>
                        <Col span={4}>
                            <b>操作</b>
                        </Col>
                    </Row>
                }
                bordered
                dataSource={list}
                renderItem={item => (
                    <List.Item>
                        <Row className="list-div">
                            <Col span={8}>
                                {item.title}
                            </Col>
                            <Col span={4}>
                                {item.typeName}
                            </Col>
                            <Col span={4}>
                                {item.addTime}
                            </Col>
                            <Col span={4}>
                                {item.view_count}
                            </Col>
                            <Col span={4}>
                                <Button type="primary" onClick={() => { updateArticle(item.id) }}>修改</Button>
                                <Button onClick={() => { delArticle(item.id) }}>删除</Button>
                            </Col>
                        </Row>
                    </List.Item>
                )}
            />
        </div>
    )
}
export default ArticleList