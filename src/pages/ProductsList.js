import { useEffect } from "react";
import { updateTitle, getProducts } from "../store/Actions";
import AllProducts from "../components/AllProducts";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import { Pane, Text } from "evergreen-ui";

const ProductsList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products, shallowEqual);

  useEffect(() => {
    dispatch(updateTitle("All Products"));
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Pane>
      <Pane paddingTop={10} paddingBottom={10}>
        <Text fontWeight="bold" fontSize={18}>
          All Products
        </Text>
      </Pane>

      <AllProducts products={products} />
    </Pane>
  );
};

export default ProductsList;
