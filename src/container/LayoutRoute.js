// import React from "react";
// import { Outlet, Route } from "react-router-dom";
// import Header from "../components/header";
// import { createBrowserHistory } from 'history';

// const history = createBrowserHistory();

// export default function LayoutRoute({ children }) {
//   return (
//     <Layout>{children}</Layout>
//   );
// }

// function Layout() {
//   return (
//     <React.Fragment>
//       {/* <Sidebar></Sidebar>
//       {children} */}
//       <div className="header">
//         <Header ></Header>
//       </div>
//       <Outlet history={history} />
//     </React.Fragment>
//   );
// }

import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function LayoutRoute() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

function Layout({  children }) {
 
  return (
    <React.Fragment>
      <div className="header">
        <Header />
      </div>
      {children}
    </React.Fragment>
  );
}
