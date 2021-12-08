import { useQuery, useSubscription } from '@apollo/client';

import { GET_MESSAGES } from '../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions'

const Messages = (props) => {

   const { loading, error, data } = useQuery(GET_MESSAGES, { variables: {conversationId: "61aa52764dd2f2fa797d5f3b"}});
   console.log(data)
   console.log(error)

   const sub = useSubscription(MESSAGE_SUBSCRIPTION, { 
      variables: {conversationId: "61aa52764dd2f2fa797d5f3b"},
      // onSubscriptionData: ({ client: { cache }}) => {
      //    const {messages} = cache.readQuery({
      //       query: GET_MESSAGES,
      //       variables: {conversationId: "61aa52764dd2f2fa797d5f3b"}
      //     });

      //     cache.writeQuery({
      //       query: GET_MESSAGES,
      //       variables: {conversationId: "61aa52764dd2f2fa797d5f3b"},
      //       data: {
      //         messages: [
      //            ...messages,
      //           {...sub.data.newMessage}
      //         ]
      //         }
      //       }
      //     );
      // },
   });
   console.log('sub', sub)

    const bubbles = data?.messages.map((message) => {
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
