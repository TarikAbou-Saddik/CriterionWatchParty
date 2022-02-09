import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface InputProps {
  className?: string;
  label?: string;
  value?: string | number;
  icon?: IconProp;
  id?: string;
  onIconClick?: () => void;
}

const Input = ({
  className = '',
  label,
  value,
  icon,
  id,
  onIconClick,
  ...inputProps
}: InputProps & React.InputHTMLAttributes<HTMLInputElement>) => (
  <InputWrapper>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <StyledInput>
      <input className={className} id={id} value={value} {...inputProps} />
      {icon && <StyledFontAwesoneIcon onClick={onIconClick} icon={icon} />}
    </StyledInput>
  </InputWrapper>
);

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1vh;
`;

const StyledLabel = styled.label`
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
`;

const StyledInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: ${({ theme }) => theme.fgDark};
  height: 40px;
  padding: 0 10px;
  color: ${({ theme }) => theme.textPrimary};
  border-radius: 2px;
  cursor: pointer;

  & input {
    cursor: pointer;
    border: none;
    background: inherit;
    color: inherit;
    font-size: 1rem;
    height: 100%;
    width: 85%;

    &:focus {
      outline: none;
    }
  }
`;

const StyledFontAwesoneIcon = styled(FontAwesomeIcon)`
  font-size: 1.3rem;
`;

export default Input;
