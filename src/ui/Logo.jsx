import styled from 'styled-components';
import TestLogo from '../data/img/logo-light.png';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  return (
    <StyledLogo>
      <Img src={TestLogo} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
