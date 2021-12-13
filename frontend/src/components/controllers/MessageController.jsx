import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../../graphql/subscriptions';
import Messages from '../Messages';

const MessageController = (props) => {
   const { subscribeToMore, data, loading, error } = useQuery(
      GET_MESSAGES,
      { variables: {conversationId: "61aa52764dd2f2fa797d5f3b"}}
   );

   useEffect(() => {
      const subscribeToNewMessages = () =>
         subscribeToMore({
            document: MESSAGE_SUBSCRIPTION,
            variables: { conversationId: "61aa52764dd2f2fa797d5f3b" },
            updateQuery: (prev, { subscriptionData }) => {
               if (!subscriptionData.data) return prev;
               const newFeedItem = subscriptionData.data.newMessage;
               
               const newMessages = Object.assign({}, prev, {
                  messages: [...prev.messages, newFeedItem]
               })

               return newMessages;
            }
         })

         const unsub = subscribeToNewMessages();

         return () => unsub();
         
   }, [subscribeToMore])

   

   console.log(data)

   return (
      <>
         {loading && <p>loading</p>}
         {!loading && <Messages data={data.messages} userId={"61a9c543e5d91654d245998c"}/>}
      </>
   )
}

export default MessageController;