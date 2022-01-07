import styled from 'styled-components';

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

const ContainerWrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: ${({ theme }) => theme.width};
  height: 100vh;
  background-color: ${({ theme }) => theme.bg};
  padding: 5vh;
`;

export default Container;
