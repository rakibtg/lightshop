import { Pane, Text } from "evergreen-ui";
import DataCell from "../DataCell";
import Colors from "../../constants/Colors";

const Availability = ({ status }) => {
  return (
    <DataCell label="Availability">
      <Pane display="flex" alignItems="center">
        <Pane
          width={10}
          height={10}
          backgroundColor={status ? Colors.greenBase : Colors.redBase}
          borderRadius={10}
          marginRight={5}
        ></Pane>
        <Text>{!status && "Not "}Available</Text>
      </Pane>
    </DataCell>
  );
};

export default Availability;
