import styled from 'styled-components';

interface ContainerProps {
  children?: React.ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return <ContainerWrapper>{children}</ContainerWrapper>;
};

const ContainerWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  padding: 5vh;
`;

export default Container;
