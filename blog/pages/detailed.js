import Head from 'next/head'
import styles from '../public/style/pages/detailed.module.css'
import Header from '../components/Header'
import Author from '../components/Author'
import Footer from '../components/Footer'
//先进行引入
import servicePath from '../config/apiUrl'
import { Row, Col, Icon, Breadcrumb, Affix } from 'antd'
import axios from 'axios'
import marked from 'marked'
import hljs from 'highlight.js'

export default function Detailed(props) {
    const renderer = new marked.Renderer()
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
    let html = marked(props.article_content)
    return (
        <div>
            <Head>

                <title>Detailed</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <Row className="commmain" type="flex" justify="center">
                <Col className="commleft" xs={24} sm={24} md={16} lg={18} xl={14}>
                    <div>
                        <div className={styles.breaddiv}>
                            <Breadcrumb>
                                <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                                <Breadcrumb.Item><a href="/list">学习</a></Breadcrumb.Item>
                                <Breadcrumb.Item>文章</Breadcrumb.Item>
                            </Breadcrumb>
                        </div>
                        <div>
                            <div className={styles.ditailedtile}>
                                React相关学习
                          </div>
                            <div className="center">
                                <span><Icon type="calendar">2021-3-1</Icon></span>
                                <span><Icon type="folder">文章</Icon></span>
                                <span><Icon type="fire">817937人</Icon></span>
                            </div>
                            <div className={styles.detailedcontent}
                                dangerouslySetInnerHTML={{ __html: html }}>

                            </div>
                        </div>
                    </div>
                </Col>
                <Col className="commright" xs={0} sm={0} md={7} lg={5} xl={4}>
                    <Author />
                </Col>
            </Row>
            <Footer />
        </div>
    )
}
// Detailed.getInitialProps = async (context) => {

//     console.log(context.query.id)
//     let id = context.query.id
//     return await new Promise((resolve) => {

//         axios('http://127.0.0.1:7001/default/getArticleById/' + id).then(
//             (res) => {
//                 resolve(res.data.data[0])
//             }
//         )
//     })
// }
//引入后进行修改
Detailed.getInitialProps = async (context) => {

    console.log(context.query.id)
    let id = context.query.id
    const promise = new Promise((resolve) => {

        axios(servicePath.getArticleById + id).then(
            (res) => {
                // console.log(title)
                resolve(res.data.data[0])
            }
        )
    })

    return await promise
}