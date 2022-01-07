import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Button = ({ className, children, to = '/', onClick }) => {
  return (
    <StyledButton className={className} to={to} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.buttonBg};
  color: ${({ theme }) => theme.buttonText};
  height: 5vh;
  width: 60%;
  text-transform: uppercase;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.2s ease-in;
  border-radius: 2px;
  text-decoration: none;

  &:hover {
    background: lightgray;
  }
`;

export default Button;
