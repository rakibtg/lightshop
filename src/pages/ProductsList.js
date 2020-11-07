import { useEffect } from "react";
import { updateTitle, getProducts } from "../store/Actions";
import AllProducts from "../components/AllProducts";
import { useSelector, shallowEqual, useDispatch } from "react-redux";

const ProductsList = () => {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products, shallowEqual);

  useEffect(() => {
    dispatch(updateTitle("All Products"));
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      <h2>All Products</h2>

      <AllProducts products={products} />
    </div>
  );
};

export default ProductsList;
