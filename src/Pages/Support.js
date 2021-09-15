import React from 'react'

import { ChatEngine } from 'react-chat-engine'

const SupportPage = props => {
    return (
        <ChatEngine
            projectID={process.env.REACT_APP_PROJECT_ID}
            userName='Adam La Morre'
            userSecret='pass1234'
            height='calc(100vh - 20px)'
        />
    )
}

export default SupportPage