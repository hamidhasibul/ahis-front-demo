import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import ahis from "../../assets/images/ahis-logo.png";
import userIMG from "../../assets/images/user.png";
import { SessionContext } from "../../context/SessionContext";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useEffect } from "react";
import { useState } from "react";

export const TopNav = () => {
  const { sessionData, setSessionData, session, setSession } =
    useContext(SessionContext);
  let navigate = useNavigate();
  const [update, setUpdate] = useState([]);
  const [img, setImg] = useState("");

  const { user, username, userid, designation } = useContext(UserRoleContext);
  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
    navigate("/");
  }

  const getuserimg = () => {
    const data = new FormData();
    data.append("emp_id", userid);
    fetch(`${import.meta.env.VITE_SERVER}/getEmployeeByID`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.message) {
          setImg(res.message[0].img);
        }
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    getuserimg();
  }, [userid, user]);

  return (
    <>
      <nav className={"navbar bg-white navbar-expand shadow1"}>
        <div className="container-fluid py-0 align-items-center">
          <Link className="navbar-brand" to={"/dashboard"}>
            <img src={ahis} className="navbar-logo" />
          </Link>

          {/* <div className="d-flex align-items-center bg1 rounded-pill ps-3 me-3">
            <p className="mb-0 font-12">User:</p>
            <select
              className="form-select session-filter-nav me-5"
              onChange={(e) => {
                setUser(e.target.value);
              }}
            >
              {users?.map((item) => (
                <option key={item.id} value={item.role}>
                  {item.role}
                </option>
              ))}
            </select>
          </div> */}

          <li className="d-flex justify-content-evenly ">
            <div className="d-flex align-items-center bg1 rounded-pill ps-3 me-3">
              <p className="mb-0 font-12">Session:</p>

              <select
                className="form-select session-filter-nav"
                onChange={(e) => {
                  setSession(e.target.value);
                }}
              >
                {sessionData?.map((item) => (
                  <option
                    key={item.id}
                    value={item.session}
                    selected={item.status === 1}
                  >
                    {item.session}
                  </option>
                ))}
              </select>
            </div>

            <Link className="nav-link my-auto me-3" to={"/"}>
              <i className="fa-regular fa-rectangle-list fc2 font-18"></i>
            </Link>
            <Link className="nav-link my-auto me-3" to={"/dotask"}>
              <i className="fa-regular fa-calendar fc2 font-18"></i>
            </Link>

            <div className="dropdown">
              <div
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {img ? (
                  <>
                    <img
                      src={`${import.meta.env.VITE_IMG_SERVER}` + img}
                      className="userImgNav"
                    />
                  </>
                ) : (
                  <img src={userIMG} className="userImgNav" />
                )}
              </div>
              <div
                className="dropdown-menu navdrop"
                aria-labelledby="dropdownMenuButton1"
              >
                <div className="row p-2">
                  <div className="col-lg-4 mb-3">
                    {img ? (
                      <>
                        <img
                          src={`${import.meta.env.VITE_IMG_SERVER}` + img}
                          className="img w-100"
                        />
                      </>
                    ) : (
                      <>
                        <img src={userIMG} className="img w-100" />
                      </>
                    )}
                  </div>
                  <div className="col-lg-8 mb-3">
                    <p className="font-12">{username}</p>
                    <p className="font-12">{user}</p>
                    <p className="font-12">{designation}</p>
                  </div>
                  <hr />
                  <div className="col-lg-6 border-end text-center p-0">
                    <Link to={`/staff/view/${userid}`} className="font-12 p-0">
                      Profile
                    </Link>
                  </div>

                  <div
                    className="col-lg-6 text-center p-0"
                    style={{ cursor: "pointer" }}
                  >
                    <p className="font-12 p-0" onClick={logout}>
                      Logout
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </div>
      </nav>
    </>
  );
};
