import { Pane, Text } from "evergreen-ui";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import {
  setProductViewData,
  resetProductViewData,
} from "../store/actions/ProductView";
import { updateTitle } from "../store/actions/App";

import DataCell from "../components/DataCell";
import ProductOptions from "../components/product/ProductOptions";
import AddToCart from "../components/cart/AddToCart";
import Availability from "../components/product/Availability";

const ProductView = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const product = useSelector(
    (state) => state.productView.product,
    shallowEqual
  );

  useEffect(() => {
    dispatch(setProductViewData(id));
    dispatch(updateTitle("Product View"));
    return () => {
      dispatch(resetProductViewData());
    };
  }, [id, dispatch]);

  if (product) {
    return (
      <>
        <Pane display="flex">
          <Pane flexGrow={1}>
            <DataCell label="Name">{product.name}</DataCell>
            <DataCell label="Brand">{product.brand}</DataCell>
            <DataCell label="Price">{`$${product.price}`}</DataCell>
            <DataCell label="Weight">{product.weight}</DataCell>
            <DataCell label="Product Id">#{product.id}</DataCell>
          </Pane>
          <Pane flexGrow={1}>
            <ProductOptions options={product.options} />
            <Availability status={product.available} />
            <AddToCart />
          </Pane>
        </Pane>
      </>
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
