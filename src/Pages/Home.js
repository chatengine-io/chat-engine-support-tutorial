import React from 'react'

import { NotificationOutlined } from '@ant-design/icons'

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

import { Col } from 'react-grid-system'


const HomePage = () => {
    const projectID = process.env.REACT_APP_PROJECT_ID
    const chatID = 57357
    const chatAccessKey = 'ca-b017568a-0c66-44ab-beb5-a4668add3c13'
    const senderUsername = 'User In Need'

    return (
        <div>
            <Col xs={11} ms={8} md={6} lg={4} style={styles.supportContainer}>
                <ChatEngineWrapper>
                    <ChatSocket 
                        projectID={projectID}
                        chatID={chatID}
                        chatAccessKey={chatAccessKey}
                        senderUsername={senderUsername}
                    />

                    <ChatFeed activeChat={chatID} />
                </ChatEngineWrapper>
            </Col>

            <div style={styles.supportButton}>
                <NotificationOutlined style={styles.supportIcon} />
            </div>
        </div>
    )
}

export default HomePage

const styles = {
    supportContainer: {
        position: 'absolute',
        overflow: 'hidden',
        bottom: '112px',
        right: '24px',
        height: '500px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    supportButton: { 
        position: 'absolute', 
        bottom: '24px', 
        right: '24px',
        backgroundColor: '#1890ff',
        height: '80px',
        width: '80px',
        textAlign: 'center',
        fontSize: '36px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
    },
    supportIcon: { 
        color: 'white', 
        position: 'relative', 
        top: '14px' 
    }
}