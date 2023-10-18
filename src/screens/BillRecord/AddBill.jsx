import React from "react";
import { TopNav } from "../../components/Navigation/TopNav";
import { SideNav } from "../../components/Navigation/SideNav";
import { AddBillComp } from "../../components/BillRecordComps/AddBillComp";

export const AddBill = () => {
  return (
    <>
      <TopNav />
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-lg-10 pt-3">
            <AddBillComp />
          </div>
        </div>
      </div>
    </>
  );
};
