import React, { useContext, useEffect, useState, useRef } from "react";
import DataTable from "react-data-table-component";
import { Loader } from "../Common/Loader";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { Toast } from "primereact/toast";
import { PaymentHistoryModal } from "../modal/PaymentHistoryModal";
import { UserRoleContext } from "../../context/UserRoleContext";

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

export const FeesForwardComp = () => {
  const toastTL = useRef(null);

  // States

  const [loader, setLoader] = useState(false);
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo, update, setUpdate } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);

  const [feeType, setFeeType] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [feeInfo, setFeeInfo] = useState("");

  const [studentData, setStudentData] = useState([]);
  const [feeInfoData, setFeeInfoData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [feeTypeData, setFeeTypeData] = useState([]);

  const [feesCollectionData, setFeesCollectionData] = useState([]);

  const [modalID, setModalID] = useState("");

  const [selectedRows, setSelectedRows] = useState(false);

  // Table Format

  const columns = [
    {
      name: "Student Name",
      cell: (row) => (
        <>
          <div className={row.advancePayment === "1" ? "text-danger" : ""}>
            {row.student_first_name + " " + row.student_last_name}
          </div>
        </>
      ),
    },
    {
      name: "Student ID",
      cell: (row) => (
        <>
          <div className={row.advancePayment === "1" ? "text-danger" : ""}>
            {row.student_id}
          </div>
        </>
      ),
    },
    {
      name: "Class",
      selector: (row) => row.Class,
    },
    {
      name: "Section",
      selector: (row) => row.section,
    },
    {
      name: "House",
      selector: (row) => row.house,
    },
    {
      name: "Fees",
      button: true,
      cell: (row) => (
        <>
          <i
            className="fa-solid fa-eye fa-icon me-2"
            data-bs-toggle="modal"
            data-bs-target="#paymentHistory"
            onClick={() => {
              setModalID(row.student_id);
            }}
          ></i>
        </>
      ),
    },
  ];

  // Conditions
  // const conditions = [clubname === ""];

  // Functions

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const getAllStudent = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`,
        {
          method: "POST",
        }
      );
      const data = await res.json();
      setStudentData(data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const getFeeInfoData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfo`, {
        method: "POST",
      });
      const data = await res.json();
      setFeeInfoData(data.message);
    } catch (err) {
      console.log(err);
    }
  };
  const addFeesForward = (selectedRows) => {
    if (selectedRows.length === 0) {
      setLoader(false);
      toastTL.current.show({
        severity: "error",
        summary: "Error",
        detail: "Select Students!",
        life: 2000,
      });
      return false;
    }

    selectedRows.map((item) => {
      const data = new FormData();
      data.append("student_id", item.student_id);
      data.append("fees_info", feeInfo);
      data.append("feesType", feeType);
      data.append("due_date", dueDate);
      data.append("amount", amount);
      data.append("payment_mode", "");
      data.append("advancePayment", 0);
      data.append("payment_id", "");
      data.append(
        "payment_date",
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      data.append("discount", "");
      data.append("paymentStatus", "");
      data.append("fine", "");
      data.append("paid", "");
      data.append("balance", amount);
      data.append("session", session);
      data.append("compile", username + "," + designation + "," + user);

      fetch(`${import.meta.env.VITE_SERVER}/addFeesCollectionForward`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          setLoader(false);
          setUpdate(update + 1);
          setFilteredData([]);
        })
        .catch((err) => console.log(err));
    });
  };

  const filteredStudents = (section) => {
    // if (selectedClass === "" || selectedSection === "") {
    //   toastTL.current.show({
    //     severity: "error",
    //     summary: "Error",
    //     detail: "Select Class or Section!",
    //     life: 2000,
    //   });
    //   return false;
    // }
    setFilteredData([]);
    [...updatedStudentData].filter((item) => {
      if (
        item.Class.toLowerCase().replace(" ", "") ===
          selectedClass.toLowerCase().replace(" ", "") &&
        item.section.toLowerCase().replace(" ", "") ===
          section.toLowerCase().replace(" ", "") &&
        item.principal_approve === "Approved"
      ) {
        setFilteredData((prev) => [...prev, item]);
      }
    });
  };
  const getAllFeeTypes = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeTypes`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeeTypeData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getSelectedFeeInfoData = async (id) => {
    try {
      const data = new FormData();
      data.append("id", id);
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchFeeInfoByID`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setFeeInfo(res.message[0].feeDesc);
      setAmount(res.message[0].amount);
    } catch (error) {
      console.error(error);
    }
  };

  const getAllFeesCollectionData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getAllfeesCollectioninfo`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setFeesCollectionData(res.message);
      })
      .catch((err) => console.log(err));
  };

  /* const getamount = (e) => {
    const data = new FormData();
    data.append("feeType", e);
    fetch(`${import.meta.env.VITE_SERVER}/fetchFeeInfoByName`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setAmount(res.message[0].amount);
        
      })
      .catch((err) => console.log(err));
  };
 */

  const advancePaymentMap = {};

  feesCollectionData.forEach((fee) => {
    const { student_id, advancePayment } = fee;
    advancePaymentMap[student_id] = advancePayment;
  });

  const updatedStudentData = studentData.map((student) => ({
    ...student,
    advancePayment: advancePaymentMap[student.student_id] || "0",
  }));

  useEffect(() => {
    getAllFeeTypes();
    getAllStudent();
    getFeeInfoData();
    getAllFeesCollectionData();

    /* getamount(); */
  }, [update]);

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getFeeInfoData();
  }, [selectedClass]);

  return (
    <>
      <div className="content-body">
        {loader && <Loader />}

        <Toast ref={toastTL} position="top-right" />
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Fees Forward</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1 py-1">
              {/* Filters */}
              <div className="col-lg-4">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Class</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedClass(e.target.value);
                      }}
                    >
                      <option selected>Select Class</option>
                      {classInfo
                        ?.filter((item) => {
                          return (
                            item.session === session && +item.pstatus === 1
                          );
                        })
                        .map((item) => (
                          <option key={item.id} value={item.class_name}>
                            {item.class_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Section</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedSection(e.target.value);
                        filteredStudents(e.target.value);
                      }}
                    >
                      <option selected value={""}>
                        Select Section
                      </option>
                      {sectionInfo
                        ?.filter((item) => {
                          return item.class_name === selectedClass;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.section_name}>
                            {item.section_name}
                          </option>
                        ))}
                    </select>
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Fees Type</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setFeeType(e.target.value);
                      }}
                    >
                      <option value={""} hidden>
                        Select
                      </option>
                      {feeTypeData
                        .filter((item) => {
                          return +item.pstatus === 1;
                        })
                        .map((item) => (
                          <option key={item.id} value={item.feeType}>
                            {item.feeType}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Fees Info</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        getSelectedFeeInfoData(e.target.value);
                      }}
                    >
                      <option value={""} hidden>
                        Select
                      </option>
                      {feeInfoData
                        ?.filter((item) => {
                          return (
                            item.feeClass === selectedClass &&
                            item.feeType === feeType &&
                            +item.pstatus === 1
                          );
                        })
                        ?.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.feeDesc}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Amount</label>
                    <input
                      className="form-control input1"
                      type="number"
                      placeholder=""
                      value={amount}
                      aria-label="form-control example"
                      onChange={(e) => setAmount(e.target.value)}
                      required
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Due Date</label>
                    <input
                      className="form-control input1"
                      type="date"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => setDueDate(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="col-lg-8">
                <p className="font-14 fw-500 mb-2">Forward Fees</p>
                <DataTable
                  columns={columns}
                  data={filteredData}
                  customStyles={customStyle}
                  onSelectedRowsChange={handleSelectedChange}
                  selectableRows
                  dense
                  pagination
                />

                <div className="row align-items-center">
                  <div className="col-lg-9">
                    <div class="form-check mb-1">
                      <input
                        class="form-check-input "
                        type="checkbox"
                        value="1"
                        id="flexCheckDefault"
                        onChange={handlerChange}
                      />
                      <label
                        class="form-check-label font-11"
                        for="flexCheckDefault"
                      >
                        Are You Sure to Submit?
                      </label>
                    </div>
                  </div>
                  <div className="col-lg-3 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={() => {
                        addFeesForward(selectedRows);
                      }}
                      disabled={yn !== true}
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}

      <PaymentHistoryModal modalID={modalID} />
    </>
  );
};
