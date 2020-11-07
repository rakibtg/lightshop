import Colors from "../constants/Colors";
import { Text } from "evergreen-ui";

const Label = ({ children }) => {
  return (
    <Text
      textTransform="uppercase"
      fontSize={14}
      fontWeight={600}
      color={Colors.tealDark}
      lineHeight={1.5}
    >
      {children}
    </Text>
  );
};

export default Label;
