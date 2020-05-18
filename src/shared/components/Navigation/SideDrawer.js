import React from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";

import "./SideDrawer.css";
import "../../../index.css";

const SideDrawer = (props) => {
  const drawer = (
    <CSSTransition
      timeout={200}
      in={props.show}
      classNames="slide-in-left"
      mountOnEnter
      unmountOnExit
    >
      <aside className="side-drawer" onClick={props.onClick}>
        {props.children}
      </aside>
    </CSSTransition>
  );

  return ReactDOM.createPortal(drawer, document.getElementById("drawer-hook"));
};

export default SideDrawer;
