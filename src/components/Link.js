import { Link as ReactRouterLink } from "react-router-dom";
import { Link as RouterLink } from "evergreen-ui";

const Link = (props) => {
  return <RouterLink is={ReactRouterLink} {...props} />;
};

export default Link;
