import React, { useState } from 'react'

import axios from 'axios'

import { NotificationOutlined, CloseOutlined } from '@ant-design/icons'

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

import { Col } from 'react-grid-system'


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [chatID, setChatID] = useState(null)
    const [chatAccessKey, setChatAccessKey] = useState(null)
    const [senderUsername, setSenderUsername] = useState('')
    const projectID = process.env.REACT_APP_PROJECT_ID

    function onSupportClick() {
        if (!isOpen) {
            const sender = `User In Need: ${Math.floor(Math.random() * 10000)}`
            setSenderUsername(sender)

            axios.post(
                'https://api.chatengine.io/chats/',
                {"title": sender},
                {headers: {"Project-ID": projectID, "User-Name": 'Adam La Morre', "User-Secret": 'pass1234'}}
            )

            .then(r => {
                console.log(r.data.id)
                setChatID(r.data.id)
                setChatAccessKey(r.data.access_key)
                setIsOpen(true)
            })
        
        } else { setIsOpen(false) }
    }

    return (
        <div>
            {
                isOpen &&
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
            }

            <div 
                onClick={() => onSupportClick()}
                style={styles.supportButton}
            >
                {
                    isOpen ?
                    <CloseOutlined style={styles.supportIcon} /> :
                    <NotificationOutlined style={styles.supportIcon} />
                }
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
        cursor: 'pointer',
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
        top: '16px' 
    }
}