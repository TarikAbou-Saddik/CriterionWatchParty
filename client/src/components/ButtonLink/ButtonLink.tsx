import styled from 'styled-components';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import {
  getBackground,
  getButtonTextColor,
  getBackgroundHoverColor,
  ButtonVariant,
} from './utils';

interface BaseButtonProps {
  variant?: ButtonVariant;
}

interface ButtonLinkProps extends BaseButtonProps {
  className?: string;
  children?: ReactNode;
  to?: string;
  onClick?: () => void;
}

const ButtonLink = ({
  className,
  children,
  to = '/',
  onClick,
  variant = 'light',
}: ButtonLinkProps) => (
  <StyledButton
    className={className}
    to={to}
    onClick={onClick}
    variant={variant}
  >
    {children}
  </StyledButton>
);

const StyledButton = styled(Link)<BaseButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, variant }) =>
    variant && getBackground(variant, theme.button)};
  color: ${({ theme, variant }) =>
    variant && getButtonTextColor(variant, theme.button)};
  height: 45px;
  text-transform: uppercase;
  font-weight: 400;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.2s ease-in;
  border-radius: 2px;
  text-decoration: none;
  padding: 0 5vw;

  &:hover {
    background: ${({ variant }) => variant && getBackgroundHoverColor(variant)};
  }
`;

export default ButtonLink;
