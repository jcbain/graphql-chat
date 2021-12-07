import { useState, useEffect } from "react";

import { makeHttpRequest } from "../adapters/requests";

const Messages = (props) => {

    useEffect(() => {
        const requestBody = {
            query: `
                query {
                    messages(conversationId: "61aa52764dd2f2fa797d5f3b") {
                        _id
                        body
            
                    }
                }
            `
          }
          makeHttpRequest(requestBody)
          .then(res => {
            if(!res.data) {
              return console.log(res.errors)
            }
          })
          .catch(err => console.error(err))

    }, [])

    const [ messages, setMessages ] = useState([])

    const bubbles = messages.map((message) => {
        return (
            <p key={message._id}>{message.body}</p>
        )
    })

    return (
        <div>
            {bubbles}
        </div>
    )
};

export default Messages;
