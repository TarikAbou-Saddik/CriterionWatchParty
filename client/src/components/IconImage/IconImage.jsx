import styled from 'styled-components';

const iconImageSizeMap = {
  sm: '30px',
  md: '65px',
  lg: '95px',
};

const IconImage = ({ src, size, alt, className, disabled }) => {
  return (
    <StyledIconImage
      disabled={disabled}
      className={className}
      src={src}
      alt={alt || ''}
      size={size}
    />
  );
};

const StyledIconImage = styled.img`
  width: ${({ size }) => iconImageSizeMap[size]};
  height: ${({ size }) => iconImageSizeMap[size]};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
`;

export default IconImage;
