import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
`

const Span = styled.span`

  width: 100%;
  text-wrap: wrap;
  border: 2px solid green;
  max-width: 400px;
  vertical-align: bottom;

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
      <Span name="something" 
        value={stuff} 
        contentEditable={true}
        onChange={event => setStuff(event.target.value)}
      />
      </Form>
    </Wrapper>
  )
}

export default TextForm;