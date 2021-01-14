import React from "react";
import "./Header.css";

const Header = ({ subtitle }) => (
  <header className="header">
    <h1 className="header__title">
      Game Of Life<span className="header__subtitle"> | {subtitle}</span>
    </h1>
  </header>
);

export default Header;
