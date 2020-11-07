import colors from "../constants/Colors";
import styled from "styled-components";
import { Text, Strong } from "evergreen-ui";

const Header = () => {
  return (
    <HeaderContainer>
      <NavBar>
        <Text size={600} color={colors.tealBase} paddingRight={2}>
          Light
        </Text>
        <Strong size={600} color={colors.tealDark}>
          Shop
        </Strong>
      </NavBar>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  background-color: ${colors.white};
  left: 0;
  right: 0;
  top: 0;
`;

const NavBar = styled.div`
  width: 90%;
  max-width: 800px;
  margin: 20px auto;
`;

export default Header;
