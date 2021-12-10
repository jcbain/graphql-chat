import styled from 'styled-components';

import Message from '../Message';

const Wrapper = styled.div`
   display: flex;
   flex-direction: column;
`


const Messages = (props) => {
   const { data, userId } = props;

   const messages = data.map((message, i, arr) => {
      const text = message.body;
      const showAvatar = i > 0 && message.sender._id === arr[i - 1].sender._id;
      const mine = message.sender._id === userId;
      return (
         <Message key={data._id} text={text} showAvatar={showAvatar} mine={mine}/>
      )
   });

   return (
      <Wrapper>
         { messages }
      </Wrapper>
   )
}

export default Messages;