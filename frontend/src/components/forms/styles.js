import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export const Form = styled.form`
  width: 100%;
  max-width: 400px;
  min-width: 250px;
  height: 400px;
  padding: 1rem 4rem;
  border-radius: 5px;
  background: white;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
`;

export const Input = styled.input`
  min-width: 125px;
  width: 100%;
  line-height: 1.5rem;
  padding: 0px 0.5rem;
  border: none;
  border-bottom: 2px solid gray;
  outline: none;
`;

export const Button = styled.button`
  background: purple;
  color: white;
  border: none;
  width: 100%;
  height: 2.5rem;
`;

export const Title = styled.h1`
  color: purple;
  font-size: 2rem;
`;