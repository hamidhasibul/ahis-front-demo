import React, { useState, useEffect, useRef } from "react";
import DataTable from "react-data-table-component";
import { Dialog } from 'primereact/dialog';
import { Loader } from "../Common/Loader";
import { useContext } from "react";
import { CategoryContext } from "../../context/CategoryContext";
import { Toast } from "primereact/toast";
import { MultiSelect } from "primereact/multiselect";
import { useNavigate } from "react-router-dom";
export const StaffAddComp = () => {
  const [yn, setYn] = useState(false);
  const [visibleImportCSVDialog, setVisibleImportCSVDialog] = useState(false);
  let navigate = useNavigate();
  const toastTL = useRef(null);
  const [loader, setLoader] = useState(false);
  const [designation, setDesignation] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [selectedClass, setSelectedClass] = useState(null);
  const [emptype, setEmpType] = useState("");
  const [empID, setEmpID] = useState("");
  const [empFileNo, setEmpFileNo] = useState("");
  const [empFname, setEmpFname] = useState("");
  const [empLname, setEmpLname] = useState("");
  const [school, setSchool] = useState("");
  const [assignSub, setAssignSub] = useState("");
  const [traineejoinDate, setTraineejoinDate] = useState("");
  const [traineePeriod, setTraineePeriod] = useState("");
  const [joinAsTeacher, setJoinAsTeacher] = useState("");
  const [gender, setGender] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [blood, setBlood] = useState("");
  const [educationalQualification, setEducational_Qualification] = useState("");
  const [presentAddress, setPresentAddress] = useState("");
  const [permanentAddress, setPermanentAddress] = useState("");
  const [workingExperienceForm, setWorkingExperienceForm] = useState("");
  const [previousInstitution, setPreviousInstitution] = useState("");
  const [specialAchievement, setSpecialAchievement] = useState("");
  const [specialTimeSchedule, setSpecialTimeSchedule] = useState("");
  const [empImg, setEmpImg] = useState("");

  const [designationData, setDesignationData] = useState([]);
  const [classInfo, setClassInfo] = useState([]);
  const [departmentData, setDepartmentData] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedItems, setSelectedItems] = useState(null);

  const [roleData, setRoleData] = useState([]);
  const [update, setUpdate] = useState([]);

  const Conditions = [
    emptype === "",
    empID === "",
    designation === "",
    department === "",
    role === "",
    empFileNo === "",
    empFname === "",
    empLname === "",
    school === "",
    selectedClass === "",
    assignSub === "",
    traineejoinDate === "",
    traineePeriod === "",
    joinAsTeacher === "",
  ];
  const Class = [
    {
      id: 1,
      class_name: "Play",
      session: "2022-2023",
    },
    {
      id: 2,
      class_name: "Nursery",
      session: "2022-2023",
    },
    {
      id: 3,
      class_name: "KG",
      session: "2022-2023",
    },
    {
      id: 4,
      class_name: "Class 1",
      session: "2022-2023",
    },
    {
      id: 5,
      class_name: "Class 2",
      session: "2022-2023",
    },
    {
      id: 6,
      class_name: "Class 3",
      session: "2022-2023",
    },
    {
      id: 7,
      class_name: "Class 4",
      session: "2022-2023",
    },
    {
      id: 8,
      class_name: "Class 5",
      session: "2022-2023",
    },
    {
      id: 9,
      class_name: "Class 6",
      session: "2022-2023",
    },
    {
      id: 10,
      class_name: "Class 7",
      session: "2022-2023",
    },
    {
      id: 11,
      class_name: "Class 8",
      session: "2022-2023",
    },
    {
      id: 12,
      class_name: "Class 9",
      session: "2022-2023",
    },
  ];
  const [items] = useState(
    Class.map((item) => ({
      label: item.class_name,
      value: item.class_name,
    }))
  );
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };
  const addStaff = () => {
    setLoader(true);
    for (let i = 0; i < Conditions.length; i++) {
      if (Conditions[i]) {
        setLoader(false);
        toastTL.current.show({
          severity: "error",
          summary: "Error",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        return false;
      }
    }
    const data = new FormData();

    data.append("emp_id", empID);
    data.append("emp_type", emptype);
    data.append("emp_fileNo", empFileNo);
    data.append("emp_fname", empFname);
    data.append("emp_lname", empLname);
    data.append("designation", designation);
    data.append("department", department);
    data.append("school", school);
    data.append("assigned_subject", assignSub);
    data.append("assigned_class", selectedClass);
    data.append("trainee_period", traineePeriod);
    data.append("trainee_joining", traineejoinDate);
    data.append("joining_as_teacher", joinAsTeacher);
    data.append("img", empImg);
    data.append("gender", gender);
    data.append("phone", phone);
    data.append("dob", dob);
    data.append("email", email);
    data.append("blood", blood);
    data.append("education", educationalQualification);
    data.append("pAddress", presentAddress);
    data.append("perAddress", permanentAddress);
    data.append("word_exp_form", workingExperienceForm);
    data.append("previous_insti", previousInstitution);
    data.append("special_achievement", specialAchievement);
    data.append("special_time", specialTimeSchedule);
    data.append("role", role);
    fetch(`${import.meta.env.VITE_SERVER}/addEmployee`, {
      method: "POST",
      body: data,
    })
      .then((res) => {
        console.log(res.message);
        toastTL.current.show({
          severity: "success",
          summary: "New Staff Added",
          detail: "Fill up the required fields!",
          life: 2000,
        });
        setTimeout(function () {
          setLoader(false);
          navigate("/staffinfo");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllDesignation = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getAllDesignation`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDesignationData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAlldepartment = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getdepartment`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setDepartmentData(res.message);
      })
      .catch((err) => console.log(err));
  };
  const getAllRole = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getRole`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setRoleData(res.message);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getAllDesignation();
    getAlldepartment();
    getAllRole();
  }, [update]);

  const [selectedCSVFile, setSelectedCSVFile] = useState(null);

  const handleCsvFileChange = (event) => {
    setSelectedCSVFile(event.target.files[0]);
  };

  const handleCSVSubmit = (event) => {
    event.preventDefault();

    if (selectedCSVFile) {
      const formData = new FormData();
      formData.append('file', selectedCSVFile);

      fetch(`${import.meta.env.VITE_SERVER}/upload-csv-add-employee`, {
        method: 'POST',
        body: formData,
      })
        .then((response) => {
          console.log(response)
          if (response) {
            toastTL.current.show({
              severity: "success",
              summary: "New Staffs Added",
              detail: "Fill up the required fields!",
              life: 2000,
            });
            setTimeout(function () {
              setLoader(false);
              navigate("/staffinfo");
            }, 2000);
          } else {
            throw new Error('Error uploading file');
          }
        })
        .catch((error) => {
          console.error('Error uploading file:', error);
          alert('Error uploading file:' + error);
        });
    }
  };

  return (
    <div className="content-body">
      {loader && <Loader />}

      <Toast ref={toastTL} position="top-right" />
      <div className="d-flex py-2 px-3 border-b align-items-center justify-content-between">
        <p className="header-font">Add Employee</p>
        <button
          className="btn submit-btn"
          onClick={() => setVisibleImportCSVDialog(true)}
        >
          Import from CSV
        </button>
        <Dialog header="Upload your CSV" visible={visibleImportCSVDialog} style={{ width: '50vw' }} onHide={() => setVisibleImportCSVDialog(false)}>
          <form onSubmit={handleCSVSubmit}>
            <input className="my-3 w-100 form-control" type="file" accept=".csv" onChange={handleCsvFileChange} />
            <button className="btn submit-btn w-100" type="submit">Upload</button>
          </form>
        </Dialog>
      </div>

      <div className="scroll-element">
        <div className="container-fluid">
          <div className="row px-1">
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee Type</label>

              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setEmpType(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                <option>Support Staff</option>
                <option>Teacher / Academic</option>
                <option>Administrative</option>
              </select>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee ID</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setEmpID(e.target.value);
                }}
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee File No</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setEmpFileNo(e.target.value);
                }}
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee Role</label>
              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                {roleData?.map((item) => {
                  return (
                    <>
                      <option>{item.roleName}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee First Name</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setEmpFname(e.target.value);
                }}
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee Last Name</label>
              <input
                className="form-control input1"
                type="text"
                onChange={(e) => {
                  setEmpLname(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Designation</label>

              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setDesignation(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                {designationData?.map((item) => {
                  return (
                    <>
                      <option>{item.designation}</option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Department</label>

              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setDepartment(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                {departmentData?.map((item) => {
                  return (
                    <>
                      <option>{item.department}</option>
                    </>
                  );
                })}
              </select>
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">School</label>

              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setSchool(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                <option>Pre School</option>
                <option>Junior School</option>
                <option>Middle School</option>
                <option>Senior School</option>
              </select>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Assigned Class</label>
              <br />
              <MultiSelect
                value={selectedClass}
                options={items}
                onChange={(e) => {
                  setSelectedClass(e.value);
                  setSelectAll(e.value.length === items.length);
                }}
                selectAll={selectAll}
                onSelectAll={(e) => {
                  setSelectedClass(
                    e.checked ? [] : items.map((item) => item.value)
                  );
                  setSelectAll(!e.checked);
                }}
                virtualScrollerOptions={{ itemSize: 43 }}
                placeholder="Select Class"
                className="w-100"
                display="chip"
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Assigned Subject</label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setAssignSub(e.target.value);
                }}
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Trainee Joining Date</label>
              <input
                type="date"
                className="form-control input1"
                onChange={(e) => {
                  setTraineejoinDate(e.target.value);
                }}
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Trainee Period</label>
              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setTraineePeriod(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                <option>1 Week</option>
                <option>15 Days</option>
                <option>1 Month</option>
                <option>2 Month</option>
                <option>3 Month</option>
              </select>
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Joining as Teacher</label>
              <input
                type="date"
                className="form-control input1"
                onChange={(e) => {
                  setJoinAsTeacher(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Employee Image</label>
              <input
                type="file"
                className="form-control input1"
                onChange={(e) => {
                  setEmpImg(e.target.files[0]);
                }}
              />
            </div>
            <hr className="my-2" />
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Gender</label>

              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setGender(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                <option>Male</option>
                <option>Female</option>
              </select>
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Contact Number</label>
              <input
                className="form-control input1"
                type="number"
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Date of Birth</label>
              <input
                type="date"
                className="form-control input1"
                onChange={(e) => {
                  setDob(e.target.value);
                }}
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">E-mail</label>
              <input
                className="form-control input1"
                type="text"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Blood Group</label>
              <select
                className="form-select input1 py-0"
                onChange={(e) => {
                  setBlood(e.target.value);
                }}
              >
                <option selected value={""}>
                  Select
                </option>
                <option>A+</option>
                <option>A-</option>
                <option>B+</option>
                <option>B-</option>
                <option>O+</option>
                <option>O-</option>
                <option>AB+</option>
                <option>AB-</option>
              </select>
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">
                Educational Qualification
              </label>
              <textarea
                className="form-control"
                type="number"
                placeholder=""
                onChange={(e) => {
                  setEducational_Qualification(e.target.value);
                }}
                rows="2"
                aria-label="form-control example"
              ></textarea>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Present Address</label>
              <textarea
                className="form-control"
                type="number"
                placeholder=""
                onChange={(e) => {
                  setPresentAddress(e.target.value);
                }}
                rows="2"
                aria-label="form-control example"
              ></textarea>
            </div>
            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Permanent Address</label>
              <textarea
                className="form-control"
                type="number"
                placeholder=""
                onChange={(e) => {
                  setPermanentAddress(e.target.value);
                }}
                rows="2"
                aria-label="form-control example"
              ></textarea>
            </div>

            <hr className="my-2" />

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">
                Working Experience Form
              </label>
              <input
                className="form-control input1"
                type="text"
                placeholder=""
                onChange={(e) => {
                  setWorkingExperienceForm(e.target.value);
                }}
                aria-label="form-control example"
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Previous Institution</label>
              <input
                className="form-control input1"
                type="text"
                onChange={(e) => {
                  setPreviousInstitution(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Special Achievement</label>
              <input
                className="form-control input1"
                type="text"
                onChange={(e) => {
                  setSpecialAchievement(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>

            <div className="col-lg-3 mb-2">
              <label className="form-label label1">Special Time Schedule</label>
              <input
                className="form-control input1"
                type="text"
                onChange={(e) => {
                  setSpecialTimeSchedule(e.target.value);
                }}
                placeholder=""
                aria-label="form-control example"
              />
            </div>

            <div className="container-fluid my-3">
              <div className="row justify-content-between">
                <div className="col-lg-6">
                  <div class="form-check mb-1">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value="1"
                      id="flexCheckDefault"
                      onChange={handlerChange}
                    />
                    <label
                      class="form-check-label font-12"
                      for="flexCheckDefault"
                    >
                      Are you sure you want to submit? Please check once again
                      befor submit.
                    </label>
                  </div>
                </div>

                <div className="col-lg-4 text-center">
                  <button
                    className="btn submit-btn w-100"
                    disabled={yn !== true}
                    onClick={addStaff}
                  >
                    Save & Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
