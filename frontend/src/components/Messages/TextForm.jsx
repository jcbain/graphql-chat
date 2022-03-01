import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PaperAirplane } from '@styled-icons/heroicons-outline/PaperAirplane'

const Wrapper = styled.div`
  width: 100%;
  font-family: 'Readex Pro';
  position: fixed;
  bottom: 0;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  display: flex;
  margin: 0 auto;
`;


const SpanDiv = styled.div`
  padding: 10px;
  min-height: 30vh;
  display: flex;
  align-items: flex-end;;
`;

const Span = styled.textarea`
  width: 100%;
  word-wrap: wrap;
  color: ${props => props.theme.mainOutlineColor};
  border: 2px solid ${props => props.theme.mainOutlineColor};
  border-radius: 4px;
  padding: 4px 8px;
  font-family: 'Readex Pro';
  caret-color: ${props => props.theme.mainOutlineColor};
  display: block;
  overflow: hidden;
  resize: none;
  min-height: 38px;
  height: 38px;
  &[placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: lightgray;
    background-color: transparent;
}
&:focus{
  outline: 2px solid #fc03a5;
}
`

const ButtonDiv = styled.div`
  padding: 10px;
`


const Button = styled.button`
  padding: 4px 12px;
  background-color: ${props => props.theme.primaryMessageTextColor};
  border: 2px solid ${props => props.theme.mainOutlineColor}; 
  border-radius: 4px;
  &:focus {
    outline: 2px solid #fc03a5
  }
`

const Airplane = styled(PaperAirplane)`
  color: #fffff7;
  width: 2rem;
`
const TextForm = (props) => {
  const { createMessage } = props;
  const [input, setInput] = useState("")
  const inputRef = useRef()

  useEffect(() => {
    if(inputRef.current){
      if(input === ""){
        return inputRef.current.style.height = "38px"; 
      }
      inputRef.current.style.height = inputRef.current.scrollHeight + "px"
    }
  })

  const submitData = () => {
    if(input === "") return;
    createMessage(input, "61a9c64073f73821ad313bab")
    setInput("")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    submitData()
  };

  const handleFormKeyUp = (event) => {
    event.preventDefault();
    if (event.key === "Enter" && !event.shiftKey) {
      submitData()
    }
  };

  const handleInputKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
    }
  }

  return (
    <Wrapper>
      <Form onSubmit={handleFormSubmit} 
        onKeyUp={handleFormKeyUp}
        >
        <SpanDiv>
          <Span 
            ref={inputRef}
            onKeyDown={handleInputKeyDown}
            name="message" 
            type="text"
            value={input} 
            placeholder='write your message here...'
            onChange={event => setInput(event.target.value)}
          >
          </Span>
        </SpanDiv>
        <ButtonDiv>
          <Button type="submit">
            <Airplane />
          </Button>
        </ButtonDiv>
      </Form>
    </Wrapper>
  )
}

export default TextForm;