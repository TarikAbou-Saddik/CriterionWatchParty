import styled from 'styled-components';

const Slider = ({ onClick }) => {
  const onToggle = ({ target }) => {
    if (target.parentElement) {
      target.parentElement.classList.toggle('active');
      onClick();
    }
  };
  return (
    <SliderWrapper>
      <SliderBall onClick={onToggle} />
    </SliderWrapper>
  );
};

const SliderBall = styled.div`
  background: #fff;
  height: 3.5vh;
  width: 3.5vh;
  border-radius: 15px;
  cursor: pointer;
  transition: all 0.3s ease-out;
`;

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 10px;
  background: ${({ theme }) => theme.fgLight};
  width: 100px;
  height: 5vh;
  border-radius: 20px;

  &.active {
    background: ${({ theme }) => theme.fgDark};
    ${SliderBall} {
      transform: translateX(calc(100px - 15px - 3.5vh - 10px));
      background: ${({ theme }) => theme.fgLight};
    }
  }
`;

export default Slider;
