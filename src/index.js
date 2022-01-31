// import React from "react";
// import ReactDOM from "react-dom";
// import "./index.css";
// // import App from "./App";
// import reportWebVitals from "./reportWebVitals";

// // import { UserContextProvider } from "./context/UserContextProvider";

// // import { Switch, Router, Route } from "react-router-dom";
// import { useLocation, Route, Switch, Link, Router } from "wouter";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// import Tabla2 from "./components/Tabla2";
// import Tabla from "./components/Tabla";
// import Ingresos from "./components/Ingresos";
// import Modal from "./components/Modal";
// import Calle from "./components/Calle";

// ReactDOM.render(
//   <React.StrictMode>
//     <Router>
//       <Switch>
//         <Route path="/">
//           <Tabla2 />
//         </Route>
//         <Route path="/ingresos2">
//           <Ingresos />
//         </Route>
//         <Route path="/newcalle">
//           <Calle />
//         </Route>

//         {/* <Route path="/ingresos2">
//           <formCalle />
//         </Route> */}
//         <Route path="/modal">
//           <Modal />
//         </Route>
//         {/* <Route path="/inicio">
//             <TableUser />
//           </Route>
//           <Route path="/listadoservicio">
//             <>
//               <MainListado></MainListado>
//             </>
//           </Route> */}
//       </Switch>
//     </Router>
//   </React.StrictMode>,
//   document.getElementById("root")
// );

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
