import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { PaperAirplane } from '@styled-icons/heroicons-outline/PaperAirplane'

const Wrapper = styled.div`
  width: 100%;
  /* border: 2px solid peru; */
  font-family: 'Readex Pro';
  /* margin: 0 auto; */
  position: fixed;
  bottom: 0;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  display: flex;
  margin: 0 auto;

  /* border: 2px solid salmon; */
`


const SpanDiv = styled.div`
  padding: 10px;
  min-height: 30vh;
  /* border: 2px dashed green; */
  display: flex;
  align-items: flex-end;;
  
  `
const Span = styled.textarea`
  width: 100%;
  word-wrap: wrap;
  /* outline: none; */
  color: ${props => props.theme.mainOutlineColor};
  border: 2px solid ${props => props.theme.mainOutlineColor};
  border-radius: 4px;
  padding: 4px 8px;
  font-family: 'Readex Pro';
  caret-color: ${props => props.theme.mainOutlineColor};
  display: block;
  overflow: hidden;
  resize: none;
  height: 32px;
  /* height: ${props => props.inputHeight}px; */
  &[contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: lightgray;
    background-color: transparent;
}
&:focus{
  outline: 2px solid #fc03a5;
  /* border: 2px solid ${props => props.theme.primaryMessageTextColor}; */
}
`

const ButtonDiv = styled.div`
  /* border: 2px dashed purple; */
  padding: 10px;
`


const Button = styled.button`
  padding: 4px 12px;
  background-color: ${props => props.theme.primaryMessageTextColor};
  /* background-color: #fffff7; */
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
  const [stuff, setStuff] = useState("")
  // const [inputHeight, setInputHeight] = useState(36)
  const inputRef = useRef()

  useEffect(() => {
    if(inputRef.current){

      inputRef.current.style.height = inputRef.current.scrollHeight + "px"
      console.log(inputRef.current.style.height)
    }
  })

  const submitData = () => {
    console.log('stuff is:', stuff);
    createMessage(stuff, "61a9c64073f73821ad313bab")
    setStuff("hi")
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
      <Form onSubmit={handleFormSubmit} onKeyUp={handleFormKeyUp}>
        <SpanDiv>
          <Span 
          // inputHeight={inputHeight}
          ref={inputRef}
          onKeyDown={handleInputKeyDown}
          name="message" 
            type="text"
            value={stuff} 
            // contentEditable={true}
            placeholder='write your message here...'
            // onInput={event => setStuff(event.currentTarget.textContent)}
            onChange={event => setStuff(event.target.value)}
            // data-role="none"
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