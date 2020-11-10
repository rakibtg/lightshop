import { Pane, Text } from "evergreen-ui";
import Colors from "../../constants/Colors";

const CartStatistics = ({ total = 0 }) => {
  return (
    <Pane
      marginTop={20}
      paddingTop={10}
      borderTop="default"
      borderTopColor={Colors.tealDark}
      borderTopWidth={2}
      textAlign="right"
    >
      <Text fontSize={18}>
        Total:{" "}
        <Text fontWeight="bold" fontSize={18}>
          ${total}
        </Text>
      </Text>
    </Pane>
  );
};

export default CartStatistics;
