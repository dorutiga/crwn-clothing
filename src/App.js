import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./page/homepage/homepage.jsx";
import ShopPage from "./page/shop/shop-page.component";

const Hats = (props) => {
  console.log(props);
  return <div>hats page</div>;
};

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/shop/hats" component={Hats} />
        <Route path="/shop" component={ShopPage} />
      </Switch>
    </div>
  );
}

export default App;
