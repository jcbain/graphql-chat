import { useState } from 'react';
import styled from 'styled-components';
import { PaperAirplane } from '@styled-icons/heroicons-outline/PaperAirplane'

const Wrapper = styled.div`
  width: 100%;
  /* border: 2px solid peru; */
  font-family: 'Readex Pro';

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
          <Button>
            <Airplane />
          </Button>
        </ButtonDiv>
      </Form>
    </Wrapper>
  )
}

export default TextForm;