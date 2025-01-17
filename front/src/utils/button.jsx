import React from "react";
import styles from "./Button.module.css";

const Button = ({ onClick, label, bgcolor = "red" }) => {
  return (
    <button
      className={`px-4 py-2 font-semibold text-white hover:bg-black rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${bgcolor}-400 bg-${bgcolor}-500`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};


export default Button;
