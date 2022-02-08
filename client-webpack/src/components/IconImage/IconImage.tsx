import styled from 'styled-components';

const iconImageSizeMap: { [key: string]: string } = {
  icon: '25px',
  sm: '40px',
  md: '65px',
  lg: '95px',
};

interface IconImageBaseProps {
  disabled?: boolean;
  size: string;
  visible?: boolean;
}

interface IconImageProps extends IconImageBaseProps {
  src: string;
  alt?: string;
  className?: string;
}

const IconImage = ({
  src,
  size,
  alt,
  className,
  disabled,
  visible = true,
}: IconImageProps) => {
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

const StyledIconImage = styled.img<IconImageBaseProps>`
  width: ${({ size }) => iconImageSizeMap[size]};
  height: ${({ size }) => iconImageSizeMap[size]};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
`;

export default IconImage;
