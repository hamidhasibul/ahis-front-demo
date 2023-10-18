import React from "react";
import { TopNav } from "../../../components/Navigation/TopNav";
import { SideNav } from "../../../components/Navigation/SideNav";
import { SiblingInfoViewComp } from "../../../components/StudentInformation/SiblingInfoComps/SiblingInfoViewComp";

export const SiblingInfoView = () => {
  return (
    <>
      <TopNav />

      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-lg-10 pt-3">
            <SiblingInfoViewComp />
          </div>
        </div>
      </div>
    </>
  );
};
