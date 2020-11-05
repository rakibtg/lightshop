import styled from "styled-components";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <LayoutWrapper>
      <Header />
      <ContentWrapper>{children}</ContentWrapper>
    </LayoutWrapper>
  );
};

const LayoutWrapper = styled.div`
  width: 90%;
  max-width: 800px;
  margin: auto auto;
  position: relative;
`

const ContentWrapper = styled.div`
  margin-top: 66px;
`

export default Layout;
