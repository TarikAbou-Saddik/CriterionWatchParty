import styled from 'styled-components';

interface BaseSliderProps {
  active: Boolean;
}

interface SliderProps extends BaseSliderProps {
  onClick?: () => void;
}

const Slider = ({ onClick, active }: SliderProps) => {
  return (
    <SliderWrapper active={active}>
      <SliderBall onClick={onClick} />
    </SliderWrapper>
  );
};

const slideBallSize = '25px';

const SliderBall = styled.div`
  background: #fff;
  height: ${slideBallSize};
  width: ${slideBallSize};
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.5s ease-out;
`;

const SliderWrapper = styled.div<BaseSliderProps>`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${({ theme, active }) => (active ? theme.fgDark : theme.fgLight)};
  width: 90px;
  height: 35px;
  border-radius: 20px;
  transition: all 0.5s ease-out;

  ${SliderBall} {
    transform: ${({ active }) =>
      active && 'translateX(calc(90px - 15px - 25px - 10px))'};
    background: ${({ theme, active }) => (active ? theme.fgLight : '#fff')};
  }
`;

export default Slider;
