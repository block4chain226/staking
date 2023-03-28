import React from "react";
import "../styles/main.scss";

const Main = (props) => {
  return (
    <div className="main">
      <div className="main__container">{props.children}</div>
    </div>
  );
};

export default Main;
