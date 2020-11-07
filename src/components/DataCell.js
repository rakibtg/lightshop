import Colors from "../constants/Colors";
import Label from "../components/Label";
import { Pane, Text } from "evergreen-ui";

const DataCell = ({ label, children }) => {
  return (
    <Pane marginBottom={15}>
      <Pane>
        <Label>{label}</Label>
      </Pane>
      <Pane>
        <Text fontSize={16} color={Colors.dark}>
          {children}
        </Text>
      </Pane>
    </Pane>
  );
};

export default DataCell;
