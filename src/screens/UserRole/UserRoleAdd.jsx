import React from "react";
import { TopNav } from "../../components/Navigation/TopNav";
import { SideNav } from "../../components/Navigation/SideNav";
import { UserRoleAddComp } from "../../components/UserRoleComps/UserRoleAddComp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";

export const UserRoleAdd = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [localStorage.getItem("token")]);
  return (
    <Layout>
      <UserRoleAddComp />
    </Layout>
  );
};
