import styled from "styled-components";
import { Pane, Text, Strong } from "evergreen-ui";

import Colors from "../constants/Colors";
import Link from "../components/Link";
import CartButton from "./cart/CartButton";

const Header = () => {
  return (
    <HeaderContainer>
      <NavBar>
        <Pane display="flex" alignItems="center">
          <Pane flexGrow={1}>
            <Link to="/" textDecoration="none">
              <Text size={600} color={Colors.tealBase} paddingRight={2}>
                Light
              </Text>
              <Strong size={600} color={Colors.tealDark}>
                Shop
              </Strong>
            </Link>
          </Pane>
          <Pane>
            <CartButton />
          </Pane>
        </Pane>
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
