import { Pane, Text } from "evergreen-ui";
import Link from "../Link";
import Colors from "../../constants/Colors";

const ProductListItem = ({ product }) => {
  const { id, name, brand, price } = product;

  return (
    <Link to={`/view/${id}`} textDecoration="none">
      <Pane
        clearfix
        padding={10}
        elevation={0}
        marginBottom={10}
        hoverElevation={1}
        background="tint1"
      >
        <Pane>
          <Text size={500} color={Colors.blueBase} fontWeight={500}>
            {name}
          </Text>
        </Pane>
        <Pane>
          <Text size={400} color={Colors.redBase} fontWeight={700}>
            ${price}
          </Text>
          <Text size={400} marginLeft={10}>
            {brand}
          </Text>
        </Pane>
      </Pane>
    </Link>
  );
};

export default ProductListItem;
