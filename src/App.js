import React from "react";

import { Route, Switch } from "react-router-dom";
import "./App.css";
import HomePage from "./page/homepage/homepage.jsx";
import Header from "./components/header/header.component";
import ShopPage from "./page/shop/shop-page.component";
import SignInSignUp from "./page/signin/sign-in-sign-out.component";
import { auth, createUserProfileDocumet } from "./firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null,
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const userRef = await createUserProfileDocumet(userAuth);
        userRef.onSnapshot((snaopShot) => {
          this.setState(
            {
              currentUser: {
                id: snaopShot.id,
                ...snaopShot.data(),
              },
            },
            () => {
              console.log(this.state);
            }
          );
          console.log(this.state);
        });
      }
      this.setState({ currentUser: userAuth });
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }
  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/signIn" component={SignInSignUp} />
          <Route path="/shop" component={ShopPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
