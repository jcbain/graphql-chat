import { useEffect } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    height: 40vh;
    padding: 10px;
    overflow: overlay;
    background-color: #fffff7;
    border: 2px solid black;
`
const MessagesContainer = styled.div`
    display: flex;
    flex-direction: column-reverse;
    justify-content: space-around;
    padding: 20px;
    background-color: #fffff7;
    width: 50vw;
    overflow-y: scroll;

    scroll-padding-bottom: 10px;
`
const MessageContainer = styled.article`
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    font-family: sans-serif;
    padding: 5px 10px;
    border: 1px solid black;
    align-self: ${props => props.yours ? 'end' : 'start'};
    border-radius: 10px;
    border-bottom-left-radius: ${props => props.yours ? '10px' : '2px'};
    border-bottom-right-radius: ${props => props.yours ? '2px' : '10px'};
    background-color: #ffffff;
    /* background-color: ${props => props.yours ? '#481b0b' : '#f9bbb1'}; */
    color:${props => props.yours ? '#ffbb00': '#fc0398'};
    border: 2px solid ${props => props.yours ? '#ffbb00': '#fc0398'};

`

const Spacer = styled.div`
    width: 100%;
    height: 40px;
`

const Messages = (props) => {
   const { data, loading, error, subscribeToNewMessages } = props;


   useEffect(() => {
      const unsub = subscribeToNewMessages();
      return () => unsub()

   }, [subscribeToNewMessages])


    const bubbles = data?.messages.map((message, i) => {
        return (
            <MessageContainer key={message._id} yours={i%2===0}>

                <p>{message.body}</p>
            </MessageContainer>
        )
    })

    return (
        <Wrapper>
            <MessagesContainer>
                <Spacer />
                {!loading && bubbles}
            </MessagesContainer>
        </Wrapper>
    )
};

export default Messages;
