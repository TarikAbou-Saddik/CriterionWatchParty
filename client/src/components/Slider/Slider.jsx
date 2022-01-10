import styled from 'styled-components';

const Slider = ({ onClick, active }) => {
  return (
    <SliderWrapper active={active}>
      <SliderBall onClick={onClick} />
    </SliderWrapper>
  );
};

const SliderBall = styled.div`
  background: #fff;
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.5s ease-out;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${({ theme, active }) => (active ? theme.fgDark : theme.fgLight)};
  width: 100px;
  height: 5vh;
  border-radius: 20px;
  transition: all 0.5s ease-out;

  ${SliderBall} {
    transform: ${({ active }) =>
      active && 'translateX(calc(100px - 15px - 3.5vh - 10px))'};
    background: ${({ theme, active }) => (active ? theme.fgLight : '#fff')};
  }
`;

export default Slider;
