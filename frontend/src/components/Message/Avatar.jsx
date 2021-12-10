import styled, { css } from 'styled-components';

const mineCss = css`
   background-color: ${props => props.theme.primaryMessageTextColor};
   box-shadow: -4.0px 8.0px 16.0px hsl(0deg 0% 0% / 0.15);
`

const Wrapper = styled.div`
   height: 40px;
   width: 40px;
   background-color: ${props => props.theme.secondaryMessageTextColor};
   color: white;
   border-radius: 50%;
   line-height: 40px;
   text-align: center;
   font-family: 'Readex Pro';
   box-shadow: 4.0px 8.0px 16.0px hsl(0deg 0% 0% / 0.15);
   ${props => props.mine && mineCss};
`

const Avatar = (props) => {
   const { initials, mine } = props;

   return (
      <Wrapper mine={mine}>
         <p>{ initials }</p>
      </Wrapper>
   )
}

export default Avatar;