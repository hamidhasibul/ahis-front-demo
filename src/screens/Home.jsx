import React from "react";
import { Link, useNavigate } from "react-router-dom";
import ahis from "../assets/images/ahis-logo.png";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { UserRoleContext } from "../context/UserRoleContext";

export const Home = () => {
  const { setUser } = useContext(UserRoleContext);
  let navigate = useNavigate();
  const [update, setUpdate] = useState([]);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token") != null) {
      navigate("/dashboard");
    }
  }, [localStorage.getItem("token")]);

  function Login(e) {
    e.preventDefault();
    const data = new FormData();
    data.append("email", email);
    data.append("password", pass);
    fetch(`${import.meta.env.VITE_SERVER}/login`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message == true) {
          localStorage.setItem("token", res.token);
          localStorage.setItem("role", res.role);
          localStorage.setItem("username", res.username);
          navigate("/dashboard");
          setUpdate(update + 1);
          setUser(res.role);
        } else {
          alert(res.message);
        }
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      <div className="container">
        <div className="row mt-5">
          <div className="col-lg-5 mx-auto mt-5">
            <div className="login_card bg-white text-center shadow1 rounded">
              <img src={ahis} className="navbar-logo2 my-3 mt-4" />
              <form onSubmit={Login}>
                <div className="row pb-4">
                  <div className="col-lg-8 mx-auto mb-2">
                    <p className=" mt-3 font-16 fw-500 ">Login to continue</p>
                  </div>
                  <div className="col-lg-8 mx-auto mb-2 text-start">
                    <label className="form-label label1">E-mail</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder="Email or Mobile Number"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-8 mx-auto mb-3 text-start">
                    <label className="form-label label1">Password</label>
                    <input
                      className="form-control input1"
                      type="password"
                      placeholder="*****"
                      onChange={(e) => setPass(e.target.value)}
                    />
                  </div>

                  <div className="col-lg-8 mx-auto text-center">
                    <button className="btn submit-btn w-100" type="submit">
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
