import styled, { css } from 'styled-components';

const mineCss = css`
   padding: 5px 10px 5px 15px;
   border-bottom-left-radius: 5px;
   border-bottom-right-radius: 0px;
   color: ${props => props.theme.primaryMessageTextColor};
   box-shadow: -8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.15);
`

const Wrapper = styled.article`
   border: 2px solid black;
   background-color: white;
   color: ${props => props.theme.secondaryMessageTextColor};
   padding: 5px 15px 5px 10px;
   border-radius: 5px;
   border-bottom-left-radius: 0px;
   width: fit-content;
   font-family: 'Readex Pro';
   box-shadow: 8.0px 16.0px 16.0px hsl(0deg 0% 0% / 0.15);
   ${props => props.mine && mineCss};
`;

const Text = styled.p`
   font-size: .9em;
`

const MessageBubble = (props) => {
   const { text, mine } = props;

   return (
      <Wrapper mine={mine}>
         <Text>{ text }</Text>
      </Wrapper>
   );
}

export default MessageBubble;