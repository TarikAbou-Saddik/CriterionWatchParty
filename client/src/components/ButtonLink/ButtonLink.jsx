import styled from 'styled-components';
import { Link } from 'react-router-dom';
import {
  buttonVariants,
  getBackground,
  getButtonTextColor,
  getBackgroundHoverColor,
} from './utils';

const Button = ({
  className,
  children,
  to = '/',
  onClick,
  variant = buttonVariants.light,
}) => {
  return (
    <StyledButton
      className={className}
      to={to}
      onClick={onClick}
      variant={variant}
    >
      {children}
    </StyledButton>
  );
};

const StyledButton = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, variant }) => getBackground(variant, theme)};
  color: ${({ theme, variant }) => getButtonTextColor(variant, theme)};
  height: 50px;
  width: 170px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease-in;
  border-radius: 2px;
  text-decoration: none;

  &:hover {
    background: ${({ variant }) => getBackgroundHoverColor(variant)};
  }
`;

export default Button;
