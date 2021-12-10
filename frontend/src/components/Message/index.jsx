import styled, { css } from 'styled-components';
import MessageBubble from './MessageBubble';
import Avatar from './Avatar';

const mineStyles = css`
   align-items: flex-end;
`
export const Wrapper = styled.article`
   /* position: relative; */
   display: flex;
   flex-direction: column;
   row-gap: 4px;
   ${props => props.mine && mineStyles};
`;


const Message = (props) => {
   const { text, mine, initials, showAvatar } = props;

   return (
      <Wrapper mine={mine}>
         <MessageBubble text={text} mine={mine}/>
         {showAvatar && <Avatar initials={initials} mine={mine}/>}
      </Wrapper>
   );
}

export default Message;