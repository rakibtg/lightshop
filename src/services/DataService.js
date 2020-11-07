import { ProductSchema } from "../store/Schema";
import data from "../static/data.json";

const DataService = () => {
  const { items } = data;
  return items.map((item) => ProductSchema(item));
};

export default DataService;
