import React from "react";
import { TopNav } from "../../components/Navigation/TopNav";
import { SideNav } from "../../components/Navigation/SideNav";
import { UserSettingsComp } from "../../components/SettingsComps/UserSettingsComp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const UserSettings = () => {
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
            <UserSettingsComp />
          </div>
        </div>
      </div>
    </>
  );
};
