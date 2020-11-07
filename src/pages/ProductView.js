import { Pane, Text } from "evergreen-ui";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { setProductViewData } from "../store/Actions";
import DataCell from "../components/DataCell";
import ProductOptions from "../components/ProductOptions";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, selections } = useSelector(
    (state) => state.productView,
    shallowEqual
  );

  useEffect(() => {
    dispatch(setProductViewData(id));
  }, [id, dispatch]);

  if (product) {
    return (
      <Pane display="flex">
        <Pane flexGrow={1}>
          <DataCell label="Name">{product.name}</DataCell>
          <DataCell label="Brand">{product.brand}</DataCell>
          <DataCell label="Price">{`$${product.price}`}</DataCell>
          <DataCell label="Weight">{product.weight}</DataCell>
          <DataCell label="Product Id">{product.id}</DataCell>
        </Pane>
        <Pane flexGrow={1}>
          <ProductOptions options={product.options} />
        </Pane>
        <pre>{JSON.stringify(selections, null, 4)}</pre>
      </Pane>
    );
  } else {
    return (
      <Pane>
        <Text>Please wait</Text>
      </Pane>
    );
  }
};

export default ProductView;
