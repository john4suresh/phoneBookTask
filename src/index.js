import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import PhoneBook from "./PhoneBook";


function App() {
  return (
    <div>
      <PhoneBook />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


