import React from "react";
import { BsJustify } from "react-icons/bs";

function Header() {
  return (
    <header className="header">
      <div className="header-left">
        <BsJustify size={24} />
        <h3>Student Dashboard</h3>
      </div>
      <div className="header-right">
        {/* You can add profile or notifications icons here */}
      </div>
    </header>
  );
}

export default Header;
