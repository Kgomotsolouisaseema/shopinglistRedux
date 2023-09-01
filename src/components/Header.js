import React from "react";
import { Link } from "react-router-dom";


function Header() {
  return (
    <header>
      {/* <div className="logo">Shoping list App</div> */}
      <nav>
        <ul>
          <li><Link to="/">Home</Link>{" "}</li>
          <li> <Link to="/add">Add Item</Link></li>
          <li> <Link to="/list">Shopping List</Link></li>
        </ul>
      </nav>
     
    </header>
  );
}

export default Header;
