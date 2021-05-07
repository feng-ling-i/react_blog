
import React, { memo } from 'react'
import { Avatar, Divider, Tooltip } from 'antd'
import styles from '../public/style/components/author.module.css'
const Author = () => {
    return (
        <div className={styles.authordiv}>
            <div><Avatar size={100} src="/2.jpg" /></div>
            <div className={styles.authorinstroduction} style={{ color: 'green' }}>
                有人见星辰，有人见尘埃
                  <Divider>社交账号</Divider>
                <Tooltip trigger={['click']} title="WeChat：fenglinglinglinging" key={'wechat'}>
                    <Avatar size={28} icon="wechat" className="account" />
                </Tooltip>
                <Tooltip trigger={['click']} title="QQ/Tim：4037249" key={'qq'}>
                    <Avatar size={28} icon="qq" className="account" />
                </Tooltip>
                <Tooltip trigger={['click']} title="GitHub：https://github.com/feng-ling-i" key={'github'}>
                    <Avatar size={28} icon="github" className="account" />
                </Tooltip>
            </div>
        </div>
    )
}
export default memo(Author)
