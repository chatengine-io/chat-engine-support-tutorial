import React, { useState } from 'react'

import axios from 'axios'

import { NotificationOutlined, CloseOutlined } from '@ant-design/icons'

import { ChatEngineWrapper, ChatSocket, ChatFeed } from 'react-chat-engine'

import { Col } from 'react-grid-system'


const HomePage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isEmailCollected, setIsEmailCollected] = useState(false)
    const [chatID, setChatID] = useState(null)
    const [chatAccessKey, setChatAccessKey] = useState(null)
    const [senderUsername, setSenderUsername] = useState('')
    const projectID = process.env.REACT_APP_PROJECT_ID

    function onCollectEmail(e) {
        e.preventDefault();
        console.log(senderUsername);

        axios.put(
            'https://api.chatengine.io/chats/',
            {"title": senderUsername, "is_direct_chat": true},
            {headers: {"Project-ID": projectID, "User-Name": 'Adam La Morre', "User-Secret": 'pass1234'}}
        )

        .then(r => {
            setChatID(r.data.id)
            setChatAccessKey(r.data.access_key)
            setIsEmailCollected(true)
        })
    }

    function renderEmailCollector() {
        return (
            <div style={styles.emailCollectorContainer}>
                <div style={styles.emailCollectorText}>
                    What is your email?
                </div>

                <form onSubmit={e => onCollectEmail(e)}>
                    <input 
                        placeholder='me@example.com'
                        style={styles.emailCollector} 
                        onChange={e => setSenderUsername(e.target.value)}
                    />
                </form>
            </div>
        )
    }

    return (
        <div>
            {
                isOpen &&
                <Col xs={11} ms={8} md={6} lg={4} style={styles.supportContainer}>
                    { 
                        isEmailCollected ? 
                        <ChatEngineWrapper>
                            <ChatSocket 
                                projectID={projectID}
                                chatID={chatID}
                                chatAccessKey={chatAccessKey}
                                senderUsername={senderUsername}
                            />

                            <ChatFeed 
                                activeChat={chatID} 
                                renderChatHeader={() => <div style={styles.supportHeader}>Support Chat</div>}
                            />
                        </ChatEngineWrapper>:
                        renderEmailCollector()
                    }
                </Col>
            }

            <div 
                onClick={() => setIsOpen(!isOpen)}
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
        height: 'calc(330px + 15vw)',
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
    },
    supportHeader: {
        position: 'absolute',
        width: '100%',
        height: '54px',
        textAlign: 'center',
        backgroundColor: 'white',
        fontSize: '24px',
        fontWeight: '600',
        paddingTop: '28px',
        color: '#1890ff'
    },
    emailCollectorContainer: {
        width: '100%',
        height: '100%',
        paddingTop: 'calc(50% - 30px)',
        textAlign: 'center'
    },
    emailCollectorText: {
        fontSize: '18px',
        paddingBottom: '12px',
    },
    emailCollector: {
        minWidth: '40%',
        textAlign: 'center',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid grey',
        outline: 'none'
    }
}