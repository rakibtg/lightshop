import { useEffect } from "react";
import { Pane, Text } from "evergreen-ui";
import { updateTitle } from "../store/actions/App";
import { useDispatch } from "react-redux";

const Unknown = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(updateTitle("Not found"));
  }, [dispatch]);

  return (
    <Pane paddingTop={10}>
      <Text>Sorry the page you are looking for does not exists.</Text>
    </Pane>
  );
};

export default Unknown;
