import React from "react";
import { Link } from "react-router-dom";
import "./header.scss";
import { auth } from "../../firebase/firebase.utils";
import { ReactComponent as Logo } from "../../assets/crown.svg";

const Header = ({ currentUser }) => (
  <div className="header">
    <Link to="/">
      <Logo className="logo"></Logo>
    </Link>
    {currentUser ? (
      <div className="greetings">Hello {currentUser.displayName}</div>
    ) : null}

    <div className="options">
      <Link className="option" to="shop">
        SHOP
      </Link>
      <Link className="option" to="shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          {" "}
          SIGN OUT
        </div>
      ) : (
        <Link to="/signIn">SIGN IN</Link>
      )}
    </div>
  </div>
);
export default Header;
