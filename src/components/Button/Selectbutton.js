import React from "react";

import "../Button/SelectButton.scss";

const Selectbutton = ({ children, selected, onClick }) => {
  return (
    <button
      style={{
        backgroundColor: selected ? "red" : "",
        color: selected ? "black" : "",
        fontWeight: selected ? 700 : 500,
      }}
      className="selectbutton-container"
      onClick={onClick}
    >
      {children.label}
    
    </button>
  );
};

export default Selectbutton;
