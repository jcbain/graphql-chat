import { useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';

import { useAuth } from '../../contexts/AuthProvider';
import { GET_MESSAGES } from '../../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../../graphql/subscriptions';
import { CREATE_MESSAGE } from '../../graphql/mutations';
import Messages from '../Messages';

const MessageController = (props) => {
   const { username } = useAuth();
   const { subscribeToMore, data, loading, error } = useQuery(
      GET_MESSAGES,
      { variables: {conversationId: "61aa52764dd2f2fa797d5f3b"}}
   );

   const [addMessage] = useMutation(CREATE_MESSAGE);

   const createMessage = (body, receiverId ) => {
      addMessage({ variables: { body, receiverId, conversationId: "61aa52764dd2f2fa797d5f3b" }})
   } 

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
         
   }, [subscribeToMore]);

   return (
      <>
         {error && <p>error</p>}
         {loading && <p>loading</p>}
         {(!loading && data) && <Messages data={data.messages} username={username} createMessage={createMessage}/>}
      </>
   );
}

export default MessageController;