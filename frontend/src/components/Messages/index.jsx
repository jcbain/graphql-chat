import styled from 'styled-components';

import Message from '../Message';

const Wrapper = styled.div`
   width: 100%;
   overflow-y: scroll;
   height: 500px;
   overflow:auto; 
   display:flex; 
   flex-direction:column-reverse;
   align-items: stretch;
   position: relative;
`;

const MessagesContainer = styled.div`
   margin: 0 auto;
   display: flex;
   flex-direction: column;
   max-width: 800px;
   width: 100%;
   padding: 15px 4px;
`


const Messages = (props) => {
   const { data, userId } = props;

   const messages = data.map((message, i, arr) => {
      const text = message.body;
      const showAvatar = (i < arr.length - 1 && message.sender._id !== arr[i + 1].sender._id) || i === arr.length - 1;
      i > 0 && console.log(message.sender._id, arr[i - 1].sender._id,showAvatar)
      const mine = message.sender._id === userId;
      const initials = message.sender.username.substring(0, 2).toUpperCase();
      return (
         <Message key={message._id} text={text} showAvatar={showAvatar} mine={mine} initials={initials}/>
      )
   });

   return (
      <Wrapper>
         <MessagesContainer>
            { messages }
         </MessagesContainer>
      </Wrapper>
   );
}

export default Messages;