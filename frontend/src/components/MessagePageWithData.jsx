import { useQuery } from '@apollo/client';
import { GET_MESSAGES } from '../graphql/queries';
import { MESSAGE_SUBSCRIPTION } from '../graphql/subscriptions'
import OldMessages from './Messages';

const MessagePageWithData = (props) => {
   const { subscribeToMore, data, loading, error } = useQuery(
      GET_MESSAGES,
      { variables: {conversationId: "61aa52764dd2f2fa797d5f3b"}}
    );

    return (

      <OldMessages data={data} 
         loading={loading} 
         error={error}
         subscribeToNewMessages={() =>
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
            }
      />
   );
}

export default MessagePageWithData;