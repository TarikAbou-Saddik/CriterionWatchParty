import styled from 'styled-components';

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

const ContainerWrapper = styled.div`
  height: ${({ theme }) => theme.height};
  width: ${({ theme }) => theme.width};
  background-color: ${({ theme }) => theme.bg};
  padding: 5vh;
`;

export default Container;
