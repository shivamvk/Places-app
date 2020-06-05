import React, { useContext } from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = (props) => {
  const auth = useContext(AuthContext);
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/" exact>
          Users
        </NavLink>
      </li>
      {!auth.isLoggedIn ? (
        <>
          <li>
            <NavLink to="/auth/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/auth/signup">Signup</NavLink>
          </li>
        </>
      ) : null}
      {auth.isLoggedIn ? (
        <>
          <li>
            <NavLink to={`${auth.userId}/places`}>My places</NavLink>
          </li>
          <li>
            <NavLink to="/places/new">Add place</NavLink>
          </li>
          <li>
            <button onClick={auth.logout}>LOGOUT</button>
          </li>
        </>
      ) : null}
    </ul>
  );
};

export default NavLinks;
