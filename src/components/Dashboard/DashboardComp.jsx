import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import student from "../../assets/images/graduate-avatar.png";
import income from "../../assets/images/money.png";
import expense from "../../assets/images/expenses.png";
import DataTable from "react-data-table-component";
import { useContext } from "react";
import { UserRoleContext } from "../../context/UserRoleContext";
import { useEffect } from "react";
import { SessionContext } from "../../context/SessionContext";
import CalendarSection from "../CalenderComp/CalenderSection/CalendarSection";
import UserInfoProvider from "../CalenderComp/Context/CalendarManagement/UserInfoProvider";
import CalendarProvider from "../CalenderComp/Context/CalendarManagement/CalendarProvider";
import MiniCalendarSection from "../CalenderComp/CalenderSection/MiniCalendarSection";

const customStyle = {
  headCells: {
    style: {
      fontSize: "11px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
    },
  },
};

export const DashboardComp = () => {
  let navigate = useNavigate();

  const [dashboardStats, setDashboardStats] = useState([]);
  const [classStats, setClassStats] = useState([]);
  const [staffStats, setStaffStats] = useState([]);
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [selectedStaff, setSelectedStaff] = useState([]);
  const { user } = useContext(UserRoleContext);
  const { session } = useContext(SessionContext);

  const totalMale = useMemo(() => {
    return classStats.reduce((total, item) => total + +item.male, 0);
  }, [classStats]);

  const totalFemale = useMemo(() => {
    return classStats.reduce((total, item) => total + +item.female, 0);
  }, [classStats]);

  const totalStudents = useMemo(() => {
    return classStats.reduce(
      (total, item) => total + (+item.male + +item.female),
      0
    );
  }, [classStats]);

  const totalSelectedMale = useMemo(() => {
    return selectedClasses.reduce((total, item) => total + +item.male, 0);
  }, [selectedClasses]);

  const totalSelectedFemale = useMemo(() => {
    return selectedClasses.reduce((total, item) => total + +item.female, 0);
  }, [selectedClasses]);

  const totalSelectedStudents = useMemo(() => {
    return selectedClasses.reduce(
      (total, item) => total + (+item.male + +item.female),
      0
    );
  }, [selectedClasses]);

  const totalStaffMale = useMemo(() => {
    return staffStats.reduce((total, item) => total + +item.male, 0);
  }, [staffStats]);

  const totalStaffFemale = useMemo(() => {
    return staffStats.reduce((total, item) => total + +item.female, 0);
  }, [staffStats]);

  const totalStaffStudents = useMemo(() => {
    return staffStats.reduce(
      (total, item) => total + (+item.male + +item.female),
      0
    );
  }, [staffStats]);

  const totalSelectedStaffMale = useMemo(() => {
    return selectedStaff.reduce((total, item) => total + +item.male, 0);
  }, [selectedStaff]);

  const totalSelectedStaffFemale = useMemo(() => {
    return selectedStaff.reduce((total, item) => total + +item.female, 0);
  }, [selectedStaff]);

  const totalSelectedStaff = useMemo(() => {
    return selectedStaff.reduce(
      (total, item) => total + (+item.male + +item.female),
      0
    );
  }, [selectedStaff]);

  const getDashboardStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/dashboardStat`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setDashboardStats(res.resMsg);
    } catch (error) {
      console.error(error);
    }
  };

  const getStudentStats = async () => {
    const data = new FormData();
    data.append("session", session);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/dashboardStatForStudents`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setClassStats(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const getStaffStats = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/dashboardStatForEmployee`,
        {
          method: "POST",
        }
      );

      const res = await response.json();

      setStaffStats(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedClasses(selectedRows);
  };

  const handleSelectedStaffChange = ({ selectedRows }) => {
    setSelectedStaff(selectedRows);
  };

  const columns = [
    {
      name: "Class",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Male",
      selector: (row) => row.male,
      sortable: true,
      width: "20%",
    },
    {
      name: "Female",
      selector: (row) => row.female,
      sortable: true,
      width: "20%",
    },
    {
      name: "Total",
      selector: (row) => row.total,
      sortable: true,
      width: "20%",
    },
  ];

  const classColumn = [
    {
      name: "Class",
      selector: (row) => row.Classname,
      sortable: true,
    },
    {
      name: "Male",
      selector: (row) => row.male,
      sortable: true,
      width: "20%",
    },
    {
      name: "Female",
      selector: (row) => row.female,
      sortable: true,
      width: "20%",
    },
    {
      name: "Total",
      selector: (row) => +row.male + +row.female,
      sortable: true,
      width: "20%",
    },
  ];

  const staffColumn = [
    {
      name: "Employee Type",
      selector: (row) => row.empType,
      sortable: true,
    },
    {
      name: "Male",
      selector: (row) => row.male,
      sortable: true,
      width: "20%",
    },
    {
      name: "Female",
      selector: (row) => row.female,
      sortable: true,
      width: "20%",
    },
    {
      name: "Total",
      selector: (row) => +row.male + +row.female,
      sortable: true,
      width: "20%",
    },
  ];

  const data = [
    {
      id: 1,
      title: "class",
      male: "19",
      female: "10",
      total: "29",
    },
    {
      id: 2,
      title: "class",
      male: "19",
      female: "10",
      total: "29",
    },
  ];

  useEffect(() => {
    var auth = localStorage.getItem("token");

    if (auth == "") {
      navigate("/");
    } else {
      navigate("/dashboard");
    }

    getDashboardStats();
    getStaffStats();
  }, []);

  useEffect(() => {
    getStudentStats();
  }, [session]);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 align-items-center">
          <p className="header-font">Dashboard</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row p-1 mb-3">
              <div className="col-lg-3">
                <div className="rounded border">
                  <div className="border-bottom px-2 bg-light rounded-top">
                    {" "}
                    <p className="mb-0 py-1 font-14">Total Student</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <div>
                      <p className="font-24 fw-500 mb-0 fcp">
                        {dashboardStats.AllStudent}
                      </p>
                      <p className="font-14 text-muted fw-400">Total Student</p>
                    </div>

                    <img src={student} className="state-icon" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="rounded border">
                  <div className="border-bottom px-2 bg-light rounded-top">
                    {" "}
                    <p className="mb-0 py-1 font-14">Fees Collection</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <div>
                      <p className="font-24 fw-500 mb-0 fcp">
                        {dashboardStats.monthlyPaid} ৳
                      </p>
                      <p className="font-14 text-muted fw-400">
                        Monthly Fees Collection
                      </p>
                    </div>

                    <img src={income} className="state-icon" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="rounded border">
                  <div className="border-bottom px-2 bg-light rounded-top">
                    {" "}
                    <p className="mb-0 py-1 font-14">Fees Due</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <div>
                      <p className="font-20 fw-500 mb-0 fcp">
                        {" "}
                        {dashboardStats.monthlyDue} ৳
                      </p>
                      <p className="font-14 text-muted fw-400">
                        Monthly Fees Due
                      </p>
                    </div>

                    <img src={expense} className="state-icon" />
                  </div>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="rounded border">
                  <div className="border-bottom px-2 bg-light rounded-top">
                    {" "}
                    <p className="mb-0 py-1 font-14">Expense</p>
                  </div>
                  <div className="d-flex align-items-center justify-content-between p-2">
                    <div>
                      <p className="font-20 fw-500 mb-0 fcp">
                        {" "}
                        {dashboardStats.monthlyExpense} ৳
                      </p>
                      <p className="font-14 text-muted fw-400">
                        Monthly Expense
                      </p>
                    </div>

                    <img src={expense} className="state-icon" />
                  </div>
                </div>
              </div>
              {/* <div className="col-lg-3 border-start px-0">
                <div className="" style={{ height: 500 }}>
                  <p className="mb-0 font-14 fw-500 bg1 p-2">
                    Waiting For Approval
                  </p>

                  <div className="d-flex m-1 req-item p-2">
                    <img src={student} className="approveicon px-1 " />
                    <div className=" px-1">
                      <p className="font-12">
                        <b>Irfath Chowdhury</b> Requested for Admission
                      </p>
                      <p className="font-10">12:00 PM, 3/4/2023</p>
                      <div className="d-flex mt-1">
                        <button className="btn view-btn py-0 w-100">
                          View
                        </button>
                        <button className="btn approve-btn py-0 text-center w-100 mx-1">
                          Approve
                        </button>
                        <button className="btn cancel-btn py-0 w-100">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="d-flex m-1 req-item p-2">
                    <img src={expense} className="approveicon px-1 " />
                    <div className=" px-1">
                      <p className="font-12">
                        <b>STAD</b> Requested for New Book Purchase of Class 3
                      </p>
                      <p className="font-10">12:00 PM, 3/4/2023</p>
                      <div className="d-flex mt-1">
                        <button className="btn view-btn py-0 w-100">
                          View
                        </button>
                        <button className="btn approve-btn py-0 text-center w-100 mx-1">
                          Approve
                        </button>
                        <button className="btn cancel-btn py-0 w-100">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>

            <div className="row px-1 border-top">
              <div className="col-lg-4 py-2 border-end">
                <div className="row">
                  <div className="col-lg-12">
                    <p className="m-0 py-1">Student Data</p>
                    <DataTable
                      columns={classColumn}
                      data={classStats}
                      customStyles={customStyle}
                      dense
                      selectableRows
                      onSelectedRowsChange={handleSelectedChange}
                      className="border"
                    />
                    {selectedClasses.length === 0 && (
                      <div className="border">
                        <div className="d-flex">
                          <p
                            className=" fw-bold fs-13 px-2 py-1"
                            style={{ width: "39%" }}
                          >
                            Total Count
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalMale}
                          </p>
                          <p
                            className="m-0 py-1  fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalFemale}
                          </p>
                          <p
                            className="m-0 py-1  fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalStudents}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedClasses.length !== 0 && (
                      <div className="border">
                        <div className="d-flex">
                          <p
                            className=" fw-bold fs-13 px-2 py-1"
                            style={{ width: "39%" }}
                          >
                            Total Count
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedMale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedFemale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedStudents}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="col-lg-12 pt-2">
                    <p className="m-0 py-1">Staff Data</p>
                    <DataTable
                      columns={staffColumn}
                      data={staffStats}
                      customStyles={customStyle}
                      dense
                      selectableRows
                      onSelectedRowsChange={handleSelectedStaffChange}
                      className="border"
                    />

                    {selectedStaff.length === 0 && (
                      <div className="border">
                        <div className="d-flex">
                          <p
                            className=" fw-bold fs-13 px-2 py-1"
                            style={{ width: "39%" }}
                          >
                            Total Count
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalStaffMale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalStaffFemale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalStaffStudents}
                          </p>
                        </div>
                      </div>
                    )}

                    {selectedStaff.length !== 0 && (
                      <div className="border">
                        <div className="d-flex">
                          <p
                            className=" fw-bold fs-13 px-2 py-1"
                            style={{ width: "39%" }}
                          >
                            Total Count
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedStaffMale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedStaffFemale}
                          </p>
                          <p
                            className="text-start m-0 py-1 fw-bold fs-13 px-2"
                            style={{ width: "20%" }}
                          >
                            {totalSelectedStaff}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="col-lg-8 text-center ">
                <UserInfoProvider>
                  <CalendarProvider>
                    <MiniCalendarSection />
                  </CalendarProvider>
                </UserInfoProvider>
              </div>
            </div>
            <div className="row px-1 border-top">
              <div className="col-lg-4 py-2">
                <p className="m-0 py-1">Income Vs Expense</p>
                <DataTable
                  columns={columns}
                  data={data}
                  customStyles={customStyle}
                  dense
                  selectableRows
                  className="border rounded"
                />
              </div>
              <div className="col-lg-8"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
