import React from "react";
import { TopNav } from "../../components/Navigation/TopNav";
import { SideNav } from "../../components/Navigation/SideNav";
import { UserPrevilegeComp } from "../../components/UserRoleComps/UserPrevilegeComp";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Layout } from "../../components/Layout/Layout";

export const UserPrevilege = () => {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/");
    }
  }, [localStorage.getItem("token")]);
  return (
    <Layout>
      <UserPrevilegeComp />
    </Layout>
  );
};
