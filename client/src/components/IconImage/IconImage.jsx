import styled from 'styled-components';

const iconImageSizeMap = {
  sm: '30px',
  md: '65px',
  lg: '95px',
};

const IconImage = ({ src, size, alt, className, disabled, visible = true }) => {
  return (
    <StyledIconImage
      disabled={disabled}
      className={className}
      src={src}
      alt={alt || ''}
      size={size}
      visible={visible}
    />
  );
};

const StyledIconImage = styled.img`
  width: ${({ size }) => iconImageSizeMap[size]};
  height: ${({ size }) => iconImageSizeMap[size]};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export default IconImage;
