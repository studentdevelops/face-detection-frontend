import React from "react";
import "./navigation.css";

const Navigation = ({ ChangePath, logged,name }) => {
  return (
    <div>
      <nav>
        {logged ? (
          <>
            <ul className="nav">
              <li onClick={() => ChangePath("home")}>
                Logo
              </li>
              <li  className="push" onClick={() => ChangePath("signout")}>SignOut</li>
            </ul>
          </>
        ) : (
          <ul className="nav">
            <li className="push" onClick={() => ChangePath("SignIn")}>Signin</li>
            <li onClick={() => ChangePath("register")}>Register</li>
          </ul>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
