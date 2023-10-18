import React from "react";
import { SideNav } from "../../components/Navigation/SideNav";
import { TopNav } from "../../components/Navigation/TopNav";
import { AdmissionRequirementComp } from "../../components/FrontOffice/AdmissionRequirementComp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const AdmissionRequirements = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [localStorage.getItem("token")]);
  return (
    <>
      <TopNav />

      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-2 p-0 m-0">
            <SideNav />
          </div>
          <div className="col-lg-10 pt-3">
            <AdmissionRequirementComp />
          </div>
        </div>
      </div>
    </>
  );
};
