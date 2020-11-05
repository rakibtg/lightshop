import { useParams } from "react-router-dom";

const ProductView = () => {
  const { id } = useParams();

  return <div>From ProductView page. {id}</div>;
};

export default ProductView;
