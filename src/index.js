import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App/App";
// import Parent from "./Parent/Parent";
import reportWebVitals from "./reportWebVitals";
// import InfiniteScroll from "./InfiniteScroll/InfiniteScroll";
import Stepper from "./Stepper/Stepper";
import { data, stepperData } from "./Stepper/data";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    {/* <Parent /> */}
    {/* <InfiniteScroll /> */}
    <Stepper data={data} stepperData={stepperData} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
