import { useState, useEffect } from "react";
import { useSubscription, gql, useQuery } from '@apollo/client';

import { makeHttpRequest } from "../adapters/requests";

const Messages = (props) => {

   // const GET_MESSAGES = gql`
   // query {
   //    messages(conversationId: "61aa52764dd2f2fa797d5f3b") {
   //       _id
   //       body  
   //    }
   // }
   // `;

   // const { loading, error, data } = useQuery(GET_MESSAGES);

   // console.log('data', data)
   // console.log('errr', error)

   //  useEffect(() => {
   //      const requestBody = {
   //          query: `
   //              query {
   //                  messages(conversationId: "61aa52764dd2f2fa797d5f3b") {
   //                      _id
   //                      body
            
   //                  }
   //              }
   //          `
   //        }
   //        makeHttpRequest(requestBody)
   //          .then(res => {
   //              if(res.errors) {
   //              return console.log(res.errors)
   //              }
   //              console.log('messages data', res)
   //              setMessages(res.data.messages);
   //          })
   //          .catch(err => console.error(err))

   //  }, [])



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
