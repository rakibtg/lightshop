import Link from "../components/Link";
import Colors from "../constants/Colors";
import styled from "styled-components";
import { Text, Strong } from "evergreen-ui";

const Header = () => {
  return (
    <HeaderContainer>
      <NavBar>
        <Link to="/" textDecoration="none">
          <Text size={600} color={Colors.tealBase} paddingRight={2}>
            Light
          </Text>
          <Strong size={600} color={Colors.tealDark}>
            Shop
          </Strong>
        </Link>
      </NavBar>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  position: fixed;
  background-color: ${Colors.white};
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
