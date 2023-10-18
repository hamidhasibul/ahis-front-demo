import React, { useContext, useState } from "react";
import { SessionContext } from "../../context/SessionContext";
import { ClassContext } from "../../context/ClassContext";
import { SectionContext } from "../../context/SectionContext";
import { useEffect } from "react";
import { UserRoleContext } from "../../context/UserRoleContext";

export const DiscountAssignComp = () => {
  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { sectionInfo } = useContext(SectionContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const [studentData, setStudentsData] = useState([]);
  const [discountTypeData, setDiscountTypeData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedDiscountType, setSelectedDiscountType] = useState("");
  const [applicableDiscount, setApplicableDiscount] = useState("");
  const [applicableDiscountType, setApplicableDiscountType] = useState("");
  const [discountAmount, setDiscountAmount] = useState("");

  const getAdmittedStudentsData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/fetchAdmittedStudents`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setStudentsData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const getDiscountType = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getDiscountType`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      setDiscountTypeData(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  const assignDiscount = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("session", session);
    data.append("Class", selectedClass);
    data.append("student_id", selectedStudent);
    data.append("section", selectedSection);
    data.append("discount_type", selectedDiscountType);
    data.append("applicableFor", applicableDiscount);
    data.append("dType", applicableDiscountType);
    data.append("amount", discountAmount);
    data.append("compile", username + "," + designation + "," + user);
    fetch(`${import.meta.env.VITE_SERVER}/assignDiscount`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        document.getElementById("discountForm").reset();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  useEffect(() => {
    getAdmittedStudentsData();
    getDiscountType();
  }, []);

  return (
    <div className="content-body">
      <div className="d-flex py-2 px-3 border-b align-items-center">
        <p className="header-font">Assign Discount</p>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1 py-1">
            <div className="col-lg-4">
              <form className="row" onSubmit={assignDiscount} id="discountForm">
                {/* ANCHOR Class Selection */}

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
                        return item.session === session && +item.pstatus === 1;
                      })
                      ?.map((item) => (
                        <option key={item.id} value={item.class_name}>
                          {item.class_name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* ANCHOR Section Selection */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Section</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setSelectedSection(e.target.value);
                    }}
                  >
                    <option selected>Select Section</option>
                    {sectionInfo
                      ?.filter((item) => {
                        return item.class_name === selectedClass;
                      })
                      ?.map((item) => (
                        <option key={item.id} value={item.section_name}>
                          {item.section_name}
                        </option>
                      ))}
                  </select>
                </div>

                {/* ANCHOR Student Selection */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Student</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setSelectedStudent(e.target.value);
                    }}
                  >
                    <option selected>Select Student</option>
                    {studentData
                      ?.filter((item) => {
                        return (
                          item.Class === selectedClass &&
                          item.section === selectedSection &&
                          item.principal_approve === "Approved"
                        );
                      })
                      ?.map((item) => (
                        <option key={item.id} value={item.student_id}>
                          {item.student_first_name} {item.student_last_name}{" "}
                          {item.student_id}
                        </option>
                      ))}
                  </select>
                </div>

                {/* ANCHOR Discount Type Selection */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Discount Type</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setSelectedDiscountType(e.target.value);
                    }}
                  >
                    <option selected value={""}>
                      Select Discount Type
                    </option>
                    {discountTypeData?.map((item) => (
                      <option key={item.id} value={item.discountType}>
                        {item.discountType}
                      </option>
                    ))}
                  </select>
                </div>

                {/* ANCHOR Applicable for Selection */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Applicable For</label>
                  <select
                    className="form-select input1 py-0"
                    onChange={(e) => {
                      setApplicableDiscount(e.target.value);
                    }}
                  >
                    <option selected value={""}>
                      Select Applicable Type
                    </option>
                    <option value={"Admission Fee"}>Admission Fee</option>
                    <option value={"Annual Fee"}>Annual Fee</option>
                    <option value={"Tuition Fee"}>Tuition Fee</option>
                  </select>
                </div>

                {/* ANCHOR Discount Type Selection */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">
                    Applicable Discount Type
                  </label>
                  <div className="d-flex ">
                    <div className="form-check col-lg-6">
                      <input
                        className="form-check-input mt-1"
                        type="radio"
                        value="%"
                        name="discountType"
                        onChange={(e) => {
                          setApplicableDiscountType(e.target.value);
                        }}
                      />
                      <label className="form-check-label font-13 fw-500 ms-1">
                        %
                      </label>
                    </div>
                    <div className="form-check col-lg-6">
                      <input
                        className="form-check-input mt-1"
                        type="radio"
                        name="discountType"
                        value="BDT"
                        onChange={(e) => {
                          setApplicableDiscountType(e.target.value);
                        }}
                      />
                      <label className="form-check-label font-13 fw-500 ms-1">
                        Fixed Amount
                      </label>
                    </div>
                  </div>
                </div>

                {/* ANCHOR Discount Amount */}

                <div className="col-lg-12 mb-2">
                  <label className="form-label label1">Amount</label>

                  <input
                    className="form-control input1"
                    type="text"
                    placeholder=""
                    aria-label="form-control example"
                    onChange={(e) => {
                      setDiscountAmount(e.target.value);
                    }}
                  />
                </div>

                <div className="col-lg-8">
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
                <div className="col-lg-4 text-end">
                  <button
                    className="btn submit-btn-sm w-100"
                    disabled={yn !== true}
                  >
                    Assign
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
