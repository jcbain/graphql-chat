import { useEffect } from 'react';

const Messages = (props) => {
   const { data, loading, error, subscribeToNewMessages } = props;


   useEffect(() => {
      const unsub = subscribeToNewMessages();
      return () => unsub()

   }, [subscribeToNewMessages])


    const bubbles = data?.messages.map((message) => {
        return (
            <p key={message._id}>{message.body}</p>
        )
    })

    return (
        <div>
            {!loading && bubbles}
        </div>
    )
};

export default Messages;
