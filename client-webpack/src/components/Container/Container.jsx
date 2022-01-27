import styled from 'styled-components';

const Container = ({ children }) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

const ContainerWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 5vh;
`;

export default Container;
