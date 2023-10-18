import React from "react";
import { TopNav } from "../Navigation/TopNav";
import { SideNav } from "../Navigation/SideNav";

export const Layout = ({ children }) => {
  return (
    <>
      <TopNav />

      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-lg-10 pt-3">{children}</div>
        </div>
      </div>
    </>
  );
};
