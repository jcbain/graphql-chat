import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  border: 2px solid peru;
  font-family: 'Readex Pro';

`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  /* flex-direction: column-reverse; */
  /* display: relative; */
  border: 2px solid salmon;
`



const SpanDiv = styled.div`
  padding: 10px;
  min-height: 30vh;
  border: 2px dashed green;
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
  /* max-width: 400px; */
  /* vertical-align: bottom; */
  /* position: absolute; */
  /* bottom: 10px; */
  padding: 4px 8px;
  font-family: 'Readex Pro';
  caret-color: ${props => props.theme.mainOutlineColor};
  display: block;
`

const ButtonDiv = styled.div`
  border: 2px dashed purple;
`

const Button = styled.button`
  padding: 4px 8px;
  background-color: ${props => props.theme.primaryMessageTextColor};
  border: 2px solid ${props => props.theme.mainOutlineColor}; 
  border-radius: 4px;
  color: white;
`

const TextForm = (props) => {
  const [stuff, setStuff] = useState("")
  const handleChange = (event) => {
    event.preventDefault();
    console.log(stuff)
  }
  return (
    <Wrapper>
      <Form onSubmit={handleChange}>
        <SpanDiv>
          <Span name="something" 
            type="text"
            value={stuff} 
            contentEditable={true}
            onChange={event => setStuff(event.target.value)}
            />
        </SpanDiv>
        <ButtonDiv>
          <Button>Send</Button>
        </ButtonDiv>
      </Form>
    </Wrapper>
  )
}

export default TextForm;