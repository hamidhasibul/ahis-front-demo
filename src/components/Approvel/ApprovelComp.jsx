import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const ApprovelComp = () => {
  const [update, setUpdate] = useState([]);
  const [approvelStudent, setApprovelStudent] = useState([]);
  const [catgory, setCatgory] = useState([]);
  const [house, setHouse] = useState([]);
  const [tmpPass, setTmpPass] = useState([]);
  const [section, setSection] = useState([]);
  const [cls, setCls] = useState([]);
  const [club, setClub] = useState([]);
  const [hifz, setHifz] = useState([]);
  const [feeType, setFeeType] = useState([]);
  const [feeinfo, setFeeinfo] = useState([]);
  const [discount, setDiscount] = useState([]);

  const [modalhead, setModalhead] = useState("");
  const [note, setNote] = useState("");
  const [activeid, setActiveid] = useState("");
  // student
  function approveStudent(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("principal_approve", "Approved");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/ApprovePrincipalApproveStudent`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disApproveStudent() {
    const data = new FormData();
    data.append("id", activeid);
    data.append("principal_approve", "reject");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/ApprovePrincipalApproveStudent`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelStudent = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getStudentForPrincipalAprrovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setApprovelStudent(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  //   catagory
  function approvecat(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/CategoryApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapprovecat(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/CategoryApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelCtagory = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getCategoryforprincipal`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setCatgory(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  //house
  function approvehouse(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/approveHouseById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapprovehouse(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/approveHouseById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelhouse = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getHouseforapprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setHouse(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  //Class
  function approveClass(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/UpdateClassApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveClass(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/UpdateClassApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelClass = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getClassApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setCls(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  //Section
  function approveSection(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/UpdateSectionApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveSection(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/UpdateSectionApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelSection = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getSectionApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSection(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  //   Temporary Exam Pass
  function approveTmpPass(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdatetmpPassdataApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveTmpPass(id) {
    const data = new FormData();
    data.append("id", activeid);
    data.append("status", "0");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdatetmpPassdataApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelTmpPass = () => {
    fetch(`${import.meta.env.VITE_SERVER}/gettmpPassdataforApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setTmpPass(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  //club
  function approveClub(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/approveClubById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveClub(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/approveClubById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelClub = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getClubApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setClub(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  //hifz
  function approveHifz(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/StudentHifzApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveHifz(id) {
    const data = new FormData();
    data.append("id", activeid);
    data.append("status", "0");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/StudentHifzApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelHifz = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getStudentHifzApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setHifz(res.message);
      })
      .catch((err) => console.log(err));
  };

  //Fees Type
  function approveFeesType(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    fetch(`${import.meta.env.VITE_SERVER}/ApprovedFeeTypeById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapproveFeesType(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "0");
    fetch(`${import.meta.env.VITE_SERVER}/ApprovedFeeTypeById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelFeesType = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeTypesforApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeType(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  //Fees Info
  function approvefeesinfo(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateFeeInfoApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapprovefeesinfo(id) {
    const data = new FormData();
    data.append("id", activeid);
    data.append("status", "0");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateFeeInfoApprovel`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApprovelfeesinfo = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfoApprovel`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeinfo(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };
  //Discount Assign
  function approvediscount(id) {
    const data = new FormData();
    data.append("id", id);
    data.append("status", "1");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateAssignDiscountApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  function disapprovediscount(id) {
    const data = new FormData();
    data.append("id", activeid);
    data.append("status", "0");
    data.append("note", note);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateAssignDiscountApprove`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        alert(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  }
  const PrincialApproveldiscount = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getassignDiscountApprove`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDiscount(res.message);
        console.log(res.message);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    PrincialApprovelStudent();
    PrincialApprovelCtagory();
    PrincialApprovelhouse();
    PrincialApprovelClass();
    PrincialApprovelSection();
    PrincialApprovelTmpPass();
    PrincialApprovelClub();
    PrincialApprovelHifz();
    PrincialApprovelFeesType();
    PrincialApprovelfeesinfo();
    PrincialApproveldiscount();
  }, [update]);
  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Approval Required List</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <ul
              class="nav nav-pills mb-3 font-12"
              id="pills-tab"
              role="tablist"
            >
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link active"
                  id="v-pills-home-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#stapp"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-home"
                  aria-selected="true"
                >
                  Student Approval
                  <span class="badge text-bg-danger mx-2">
                    {approvelStudent.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#cat"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Catagory Approval
                  <span class="badge text-bg-danger mx-2">
                    {catgory.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                {" "}
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#house"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  House Approval
                  <span class="badge text-bg-danger mx-2">{house.length}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Class"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Class Approval
                  <span class="badge text-bg-danger mx-2">{cls.length}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Section"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Section Approval
                  <span class="badge text-bg-danger mx-2">
                    {section.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Temporary"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Temporary Exam Pass Approval
                  <span class="badge text-bg-danger mx-2">
                    {tmpPass.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Fees"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Fees Type Approval
                  <span class="badge text-bg-danger mx-2">
                    {feeType.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Club"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Club Approval
                  <span class="badge text-bg-danger mx-2">{club.length}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Info"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Fees Info Approval
                  <span class="badge text-bg-danger mx-2">
                    {feeinfo.length}
                  </span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Hifz"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Hifz Approval
                  <span class="badge text-bg-danger mx-2">{hifz.length}</span>
                </button>
              </li>
              <li class="nav-item" role="presentation">
                <button
                  class="nav-link"
                  id="v-pills-messages-tab"
                  data-bs-toggle="pill"
                  data-bs-target="#Discount"
                  type="button"
                  role="tab"
                  aria-controls="v-pills-messages"
                  aria-selected="false"
                >
                  Discount Assign Approval
                  <span class="badge text-bg-danger mx-2">
                    {discount.length}
                  </span>
                </button>
              </li>
            </ul>
            <div class="tab-content" id="v-pills-tabContent">
              <div
                class="tab-pane fade show active row"
                id="stapp"
                role="tabpanel"
                aria-labelledby="v-pills-home-tab"
                tabindex="0"
              >
                {approvelStudent.length !== 0 && (
                  <>
                    <div className="col-lg-12 pt-2 ">
                      <p className="font-14 fw-bold">Student Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Section</th>
                            <th scope="col">Session</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {approvelStudent.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.student_id}</th>
                                  <td>
                                    {item.student_first_name}{" "}
                                    {item.student_last_name}
                                  </td>
                                  <td>{item.Class}</td>
                                  <td>{item.section}</td>
                                  <td>{item.session}</td>
                                  <td>
                                    <Link to={`/studentaidedit/${item.id}`}>
                                      <i className="fa-solid fa-eye"></i>
                                    </Link>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveStudent(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        setActiveid(item.id);
                                        setModalhead("Student Approvel");
                                        document
                                          .getElementById("modalclick")
                                          .click();
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="cat"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {catgory.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">Catagory Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {catgory.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.category_name}</th>
                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approvecat(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapprovecat(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="house"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {house.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">House Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {house.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.housename}</th>
                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approvehouse(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapprovehouse(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Class"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {cls.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">Class Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Name</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cls.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.class_name}</th>
                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveClass(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapproveClass(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Section"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {section.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">Section Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Section</th>
                            <th scope="col">Class</th>
                            <th scope="col">Session</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {section.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.section_name}</th>
                                  <th>{item.class_name}</th>
                                  <th>{item.session}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveSection(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapproveSection(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Temporary"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {tmpPass.length !== 0 && (
                  <>
                    <div className="col-lg-12 pt-2 ">
                      <p className="font-14 fw-bold">
                        Temporary Exam Pass Approval
                      </p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Student ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Class</th>
                            <th scope="col">Section</th>
                            <th scope="col">Session</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {tmpPass.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.student_id}</th>
                                  <td>{item.sname}</td>
                                  <td>{item.Class}</td>
                                  <td>{item.section}</td>
                                  <td>{item.session}</td>
                                  <td>
                                    <Link to={`/studentinfo/view/${item.id}`}>
                                      <i className="fa-solid fa-eye"></i>
                                    </Link>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveTmpPass(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        setActiveid(item.id);
                                        setModalhead(
                                          "Temporary Exam Pass Approvel"
                                        );
                                        document
                                          .getElementById("modalclick")
                                          .click();
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Fees"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {feeType.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">Fees Type Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Fees Type</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeType.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.feeType}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveFeesType(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapproveFeesType(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Club"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {club.length !== 0 && (
                  <>
                    <div className="col-lg-6 pt-2 ">
                      <p className="font-14 fw-bold">Club Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Club</th>
                            <th scope="col">Session</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {club.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.club_name}</th>
                                  <th>{item.session}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveClub(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        disapproveClub(item.id);
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Info"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {feeinfo.length !== 0 && (
                  <>
                    <div className="col-lg-12 pt-2 ">
                      <p className="font-14 fw-bold">Fees Info Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">Fees Type</th>
                            <th scope="col">Class</th>
                            <th scope="col">Description</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Session</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {feeinfo.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.feeType}</th>
                                  <th>{item.feeClass}</th>
                                  <th>{item.feeDesc}</th>
                                  <th>{item.amount}</th>
                                  <th>{item.session}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approvefeesinfo(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        setActiveid(item.id);
                                        setModalhead("Fees Info Approvel");
                                        document
                                          .getElementById("modalclick")
                                          .click();
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade row"
                id="Hifz"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {hifz.length !== 0 && (
                  <>
                    <div className="col-lg-12 pt-2 ">
                      <p className="font-14 fw-bold">Hifz Approval</p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">student_id</th>
                            <th scope="col">student_name</th>
                            <th scope="col">Class</th>
                            <th scope="col">session</th>
                            <th scope="col">section</th>
                            <th scope="col">date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {hifz.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.student_id}</th>
                                  <th>{item.student_name}</th>
                                  <th>{item.Class}</th>
                                  <th>{item.session}</th>
                                  <th>{item.section}</th>
                                  <th>{item.date}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approveHifz(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        setActiveid(item.id);
                                        setModalhead("Hifz Approvel");
                                        document
                                          .getElementById("modalclick")
                                          .click();
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
              <div
                class="tab-pane fade"
                id="Discount"
                role="tabpanel"
                aria-labelledby="v-pills-profile-tab"
                tabindex="0"
              >
                {discount.length !== 0 && (
                  <>
                    <div className="col-lg-12 pt-2 ">
                      <p className="font-14 fw-bold">
                        Discount Assign Approval
                      </p>
                      <table class="table font-12">
                        <thead>
                          <tr>
                            <th scope="col">Sl</th>
                            <th scope="col">student_id</th>
                            <th scope="col">Class</th>
                            <th scope="col">session</th>
                            <th scope="col">section</th>
                            <th scope="col">discount_type</th>
                            <th scope="col">applicableFor</th>
                            <th scope="col">amount</th>
                            <th scope="col">Date</th>
                            <th scope="col">Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {discount.map((item, index) => {
                            return (
                              <>
                                <tr key={item.id}>
                                  <th>{index + 1}</th>
                                  <th>{item.student_id}</th>
                                  <th>{item.Class}</th>
                                  <th>{item.session}</th>
                                  <th>{item.section}</th>
                                  <th>{item.discount_type}</th>
                                  <th>{item.applicableFor}</th>
                                  <th>
                                    {item.amount}
                                    {item.dType}
                                  </th>
                                  <th>{item.date}</th>

                                  <td>
                                    <i
                                      class="fa-solid fa-circle-check text-success mx-2"
                                      onClick={() => {
                                        approvediscount(item.id);
                                      }}
                                    ></i>
                                    <i
                                      class="fa-solid fa-circle-check text-danger"
                                      onClick={() => {
                                        setActiveid(item.id);
                                        setModalhead(
                                          "Discount Assign Approvel"
                                        );
                                        document
                                          .getElementById("modalclick")
                                          .click();
                                      }}
                                    ></i>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal */}

      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        id="modalclick"
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                {modalhead}
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {modalhead == "Student Approvel" && (
                <>
                  <p className="font-12">Reason</p>

                  <textarea
                    name=""
                    id=""
                    rows="2"
                    className="form-control font-12"
                    placeholder=""
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>

                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={disApproveStudent}
                  >
                    Submit
                  </button>
                </>
              )}
              {modalhead == "Temporary Exam Pass Approvel" && (
                <>
                  <p className="font-12">Reason</p>

                  <textarea
                    name=""
                    id=""
                    rows="2"
                    className="form-control font-12"
                    placeholder=""
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>

                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={disapproveTmpPass}
                  >
                    Submit
                  </button>
                </>
              )}
              {modalhead == "Hifz Approvel" && (
                <>
                  <p className="font-12">Reason</p>

                  <textarea
                    name=""
                    id=""
                    rows="2"
                    className="form-control font-12"
                    placeholder=""
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>

                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={disapproveHifz}
                  >
                    Submit
                  </button>
                </>
              )}
              {modalhead == "Discount Assign Approvel" && (
                <>
                  <p className="font-12">Reason</p>

                  <textarea
                    name=""
                    id=""
                    rows="2"
                    className="form-control font-12"
                    placeholder=""
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>

                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={disapprovediscount}
                  >
                    Submit
                  </button>
                </>
              )}
              {modalhead == "Fees Info Approvel" && (
                <>
                  <p className="font-12">Reason</p>

                  <textarea
                    name=""
                    id=""
                    rows="2"
                    className="form-control font-12"
                    placeholder=""
                    onChange={(e) => {
                      setNote(e.target.value);
                    }}
                  ></textarea>

                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={disapprovefeesinfo}
                  >
                    Submit
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* modal */}
    </>
  );
};
