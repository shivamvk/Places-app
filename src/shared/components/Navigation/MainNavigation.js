import React from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import "./MainNavigation.css";

const MainNavigation = (props) => {
  return (
    <MainHeader>
      <button className="main-navigation__menu-btn">
        <span />
        <span />
        <span />
      </button>
      <h2 className="main-navigation__title">
        <Link to="/">Places App</Link>
      </h2>
      <nav className="main-navigation__header-nav">
        <NavLinks />
      </nav>
    </MainHeader>
  );
};

export default MainNavigation;
