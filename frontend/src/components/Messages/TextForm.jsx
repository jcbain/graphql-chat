import { useState } from 'react';
import styled from 'styled-components';
import { PaperAirplane } from '@styled-icons/heroicons-outline/PaperAirplane'

const Wrapper = styled.div`
  width: 100%;
  /* border: 2px solid peru; */
  font-family: 'Readex Pro';
  max-width: 800px;
  margin: 0 auto;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  /* border: 2px solid salmon; */
`


const SpanDiv = styled.div`
  padding: 10px;
  min-height: 30vh;
  /* border: 2px dashed green; */
  display: flex;
  align-items: flex-end;;
  
  `
const Span = styled.span`
  width: 100%;
  word-wrap: wrap;
  outline: none;
  color: ${props => props.theme.primaryMessageTextColor};
  border: 2px solid ${props => props.theme.mainOutlineColor};
  border-radius: 4px;
  padding: 4px 8px;
  font-family: 'Readex Pro';
  caret-color: ${props => props.theme.mainOutlineColor};
  display: block;
  &[contenteditable][placeholder]:empty:before {
    content: attr(placeholder);
    position: absolute;
    color: lightgray;
    background-color: transparent;
}
`

const ButtonDiv = styled.div`
  /* border: 2px dashed purple; */
  padding: 10px;
`


const Button = styled.button`
  padding: 4px 12px;
  background-color: ${props => props.theme.primaryMessageTextColor};
  border: 2px solid ${props => props.theme.primaryMessageTextColor}; 
  border-radius: 4px;
`

const Airplane = styled(PaperAirplane)`
  color: #fffff7;
  width: 2rem;
`
const TextForm = (props) => {
  const [stuff, setStuff] = useState("")
  const handleChange = (event) => {
    event.preventDefault();
    console.log('this is stuff', stuff)
  }
  const handleKeyUp = (event) => {
    event.preventDefault();
 
    if (event.key === "Enter" && !event.shiftKey) {
      console.log("hi there")
    }

  }
  return (
    <Wrapper>
      <Form onSubmit={handleChange} onKeyUp={handleKeyUp}>
        <SpanDiv>
          <Span onKeyDown={event => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              console.log('did it')
            }
          }}
          name="message" 
            type="text"
            value={stuff} 
            role="textbox"
            contentEditable={true}
            placeholder='write your message here...'
            onInput={event => setStuff(event.currentTarget.textContent)}
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