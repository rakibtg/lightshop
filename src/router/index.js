import { BrowserRouter, Switch, Route } from "react-router-dom";

import Layout from "../layout";
import ProductsList from "../pages/ProductsList";
import ProductView from "../pages/ProductView";
import CheckoutView from "../pages/CheckoutView";
import Unknown from "../pages/Unknown";

const Router = () => {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/" exact>
            <ProductsList />
          </Route>
          <Route path="/view/:id">
            <ProductView />
          </Route>
          <Route path="/checkout">
            <CheckoutView />
          </Route>
          <Route path="*">
            <Unknown />
          </Route>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
};

export default Router;
