import React from "react";
import { SideNav } from "../../components/Navigation/SideNav";
import { TopNav } from "../../components/Navigation/TopNav";
import { BillListComp } from "../../components/BillRecordComps/BillListComp";

export const BillList = () => {
  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-lg-10 pt-3">
            <BillListComp />
          </div>
        </div>
      </div>
    </>
  );
};
