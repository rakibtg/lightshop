import colors from "../constants/colors";
import { Text, Strong } from "evergreen-ui";

const Header = () => {
  return (
    <header>
      <Text size={600} color={colors.tealBase}>
        Light
      </Text>{" "}
      <Strong size={600} color={colors.tealDark}>
        Shop
      </Strong>
    </header>
  );
};

export default Header;
