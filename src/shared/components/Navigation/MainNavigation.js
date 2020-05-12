import React, { useState } from "react";
import { Link } from "react-router-dom";

import MainHeader from "./MainHeader";
import NavLinks from "./NavLinks";
import SideDrawer from "./SideDrawer";
import Backdrop from "../UIElements/Backdrop";

import "./MainNavigation.css";

const MainNavigation = (props) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const openDrawer = () => {
    setIsDrawerOpen(true);
  };

  const closeDrawer = () => {
    setIsDrawerOpen(false);
  };

  return (
    <React.Fragment>
      {isDrawerOpen ? <Backdrop onClick={closeDrawer} /> : null}
      {isDrawerOpen ? (
        <SideDrawer>
          <span className="main-navigation__close-nav" onClick={closeDrawer}>
            Close
          </span>
          <nav className="main-navigation__drawer-nav">
            <NavLinks />
          </nav>
        </SideDrawer>
      ) : null}
      <MainHeader>
        <button className="main-navigation__menu-btn" onClick={openDrawer}>
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
    </React.Fragment>
  );
};

export default MainNavigation;
