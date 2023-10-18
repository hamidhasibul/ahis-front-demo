import React from "react";
import { TopNav } from "../../components/Navigation/TopNav";
import { SideNav } from "../../components/Navigation/SideNav";
import DotaskComp from "../../components/CalenderComp/DotaskComp";

export const DoTask = () => {
  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12 pt-3">
            <DotaskComp />
          </div>
        </div>
      </div>
    </>
  );
};
