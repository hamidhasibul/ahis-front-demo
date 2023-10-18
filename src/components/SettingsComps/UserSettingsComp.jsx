import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { ChangePassword } from "../modal/ChangePasswordModal";

// Table Styling

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
    },
  },
  headCells: {
    style: {
      fontSize: "12px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const UserSettingsComp = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [roleData, setRoleData] = useState([]);
  const [userList, setUserList] = useState([]);
  const [update, setUpdate] = useState([]);

  const [activeID, setActiveID] = useState("");

  const [employeeName, setEmployeeName] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [employeeEmail, setEmployeeEmail] = useState("");
  const [employeeID, setEmployeeID] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  // Table Format

  const columns = [
    {
      name: "Employee ID",
      selector: (row) => row.emp_id,
    },
    {
      name: "Username",
      selector: (row) => row.username,
    },
    {
      name: "Role",
      selector: (row) => row.role,
    },

    {
      name: "Action",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-edit fa-icon me-2"
            data-bs-toggle="modal"
            data-bs-target="#changePassModal"
            onClick={() => {
              setActiveID(row.id);
            }}
          ></i>
          <i className="fa-solid fa-xmark fa-icon"></i>
        </>
      ),
    },
  ];

  // Functions

  const getEmployeeData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getEmployee`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setEmployeeData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getSingleEmployeeData = async (id) => {
    const data = new FormData();
    data.append("emp_id", id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getEmployeeByID`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();

      setEmployeeName(
        res.message[0].emp_fname + " " + res.message[0].emp_lname
      );
      setEmployeeMobile(res.message[0].phone);
      setEmployeeEmail(res.message[0].email);
      setEmployeeID(res.message[0].emp_id);
    } catch (error) {
      console.log(error);
    }
  };

  const getRoleData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/getRole`, {
        method: "POST",
      });
      const res = await response.json();

      setRoleData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const addUser = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("emp_id", employeeID);
    data.append("mobile", employeeMobile);
    data.append("email", employeeEmail);
    data.append("username", username);
    data.append("password", password);
    data.append("role", role);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/adduser`, {
        method: "POST",
        body: data,
      });

      const res = await response.json();

      console.log(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getUserList = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getAlluser`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setUserList(res.message);
    } catch (error) {
      console.error(error);
    }
  };
  console.log(employeeID);
  useEffect(() => {
    getEmployeeData();
    getRoleData();
    getUserList();
  }, [update]);

  return (
    <>
      <ChangePassword activeID={activeID} />
      <div className="content-body">
        {/* Heading */}
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">User Settings</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              {/* User Modification Section */}

              <div className="col-lg-4 pt-2">
                <form className="row" onSubmit={addUser}>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Employee</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        getSingleEmployeeData(e.target.value);
                        setUpdate(update + 1);
                      }}
                    >
                      <option selected value={""}>
                        Select Employee
                      </option>

                      {employeeData.map((item) => (
                        <option key={item.id} value={item.emp_id}>
                          {item.emp_fname} {item.emp_lname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Employee Mobile</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      value={employeeMobile}
                      onChange={(e) => {
                        setEmployeeMobile(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Employee Email</label>
                    <input
                      className="form-control input1"
                      type="email"
                      placeholder=""
                      aria-label="form-control example"
                      value={employeeEmail}
                      onChange={(e) => {
                        setEmployeeEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Set Username</label>
                    <input
                      className="form-control input1"
                      type="text"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Set Password</label>
                    <input
                      className="form-control input1"
                      type="password"
                      placeholder=""
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Employee</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setRole(e.target.value);
                      }}
                    >
                      <option selected value={""}>
                        Select Role
                      </option>

                      {roleData.map((item) => (
                        <option key={item.id} value={item.roleName}>
                          {item.roleName}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-4 offset-8 text-end">
                    <button className="btn submit-btn-sm w-100" type="submit">
                      Add
                    </button>
                  </div>
                </form>
              </div>

              {/* User List */}

              <div className="col-lg-8 pt-2">
                <p className="font-14 fw-500 mb-2">User List</p>
                <DataTable
                  columns={columns}
                  data={userList}
                  customStyles={customStyle}
                  dense
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
