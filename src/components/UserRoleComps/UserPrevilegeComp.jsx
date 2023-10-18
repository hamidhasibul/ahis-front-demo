import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const UserPrevilegeComp = () => {
  const [addArr, setAddArr] = useState([]);
  const [viewArr, setViewArr] = useState([]);
  const [editArr, setEditArr] = useState([]);
  const [deleteArr, setDeleteArr] = useState([]);

  const [userRole, setUserRole] = useState("");

  const params = useParams();

  const { id } = params;

  // Handler Functions

  const handleAddChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setAddArr((prev) => [...prev, value]);
    } else {
      setAddArr((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleViewChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setViewArr((prev) => [...prev, value]);
    } else {
      setViewArr((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleEditChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setEditArr((prev) => [...prev, value]);
    } else {
      setEditArr((prev) => prev.filter((item) => item !== value));
    }
  };

  const handleDeleteChange = (e) => {
    const { value, checked } = e.target;

    if (checked) {
      setDeleteArr((prev) => [...prev, value]);
    } else {
      setDeleteArr((prev) => prev.filter((item) => item !== value));
    }
  };

  const getRoleDetails = async () => {
    const data = new FormData();
    data.append("id", id);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getroleByID`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setUserRole(res.message[0].roleName);
    } catch (error) {
      console.error(error);
    }
  };

  const submitUserPrevileges = async () => {
    const data = new FormData();

    data.append("role", userRole);
    data.append("create", addArr.toString());
    data.append("read", viewArr.toString());
    data.append("update", editArr.toString());
    data.append("dlt", deleteArr.toString());

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/addprivileges`,
        {
          method: "POST",
          body: data,
        }
      );
      const res = await response.json();
      console.log(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getRoleDetails();
  }, []);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Previlege</p>
        </div>

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              <div className="col-lg-12 pt-2">
                <table className="table ">
                  <thead>
                    <tr>
                      <th scope="col">Main Section</th>
                      <th scope="col">Feature</th>
                      <th scope="col">Access</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* ANCHOR Front Office */}

                    {/* Admission Requirements */}
                    <tr>
                      <th scope="row" rowSpan={6}>
                        Front Office
                      </th>
                      <td>Admission Requirements</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionrequirementsAdd"
                            value="admissionrequirements"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionrequirementsAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionrequirementsView"
                            value="admissionrequirements"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionrequirementsView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionrequirementsEdit"
                            value="admissionrequirements"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionrequirementsEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionrequirementsDelete"
                            value="admissionrequirements"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionrequirementsDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Employee Contacts */}

                    <tr>
                      <td>Employee Contacts</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="contactofemployeesAdd"
                            value="contactofemployees"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="contactofemployeesAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="contactofemployeesView"
                            value="contactofemployees"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="contactofemployeesView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="contactofemployeesEdit"
                            value="contactofemployees"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="contactofemployeesEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="contactofemployeesDelete"
                            value="contactofemployees"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="contactofemployeesDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Complain Box */}

                    <tr>
                      <td>Complain Box</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="complainboxAdd"
                            value="complainbox"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="complainboxAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="complainboxView"
                            value="complainbox"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="complainboxView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="complainboxEdit"
                            value="complainbox"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="complainboxEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="complainboxDelete"
                            value="complainbox"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="complainboxDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Postal Dispatch */}

                    <tr>
                      <td>Postal Dispatch</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postaldispatchAdd"
                            value="postaldispatch"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="postaldispatchAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postaldispatchView"
                            value="postaldispatch"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="postaldispatchView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postaldispatchEdit"
                            value="postaldispatch"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="postaldispatchEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postaldispatchDelete"
                            value="postaldispatch"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="postaldispatchDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Postal Receive */}

                    <tr>
                      <td>Postal Receive</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postalreceiveAdd"
                            value="postalreceive"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="postalreceiveAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postalreceiveView"
                            value="postalreceive"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="postalreceiveView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postalreceiveEdit"
                            value="postalreceive"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="postalreceiveEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="postalreceiveDelete"
                            value="postalreceive"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="postalreceiveDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Visitors Book */}

                    <tr>
                      <td>Visitors Book</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="visitorsbookAdd"
                            value="visitorsbook"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="visitorsbookAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="visitorsbookView"
                            value="visitorsbook"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="visitorsbookView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="visitorsbookEdit"
                            value="visitorsbook"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="visitorsbookEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="visitorsbookDelete"
                            value="visitorsbook"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="visitorsbookDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Admission Process */}

                    {/* Admission Form */}

                    <tr>
                      <th rowSpan={4}>Admission Process</th>
                      <td>Admission Form</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionformAdd"
                            value="admissionform"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionformAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionformView"
                            value="admissionform"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionformView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionformEdit"
                            value="admissionform"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionformEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissionformDelete"
                            value="admissionform"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissionformDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Applicant List */}

                    <tr>
                      <td>Applicants List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="applicantlistAdd"
                            value="applicantlist"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="applicantlistAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="applicantlistView"
                            value="applicantlist"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="applicantlistView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="applicantlistEdit"
                            value="applicantlist"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="applicantlistEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="applicantlistDelete"
                            value="applicantlist"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="applicantlistDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Admission Test */}

                    <tr>
                      <td>Admission Test</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissiontestAdd"
                            value="admissiontest"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissiontestAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissiontestView"
                            value="admissiontest"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissiontestView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissiontestEdit"
                            value="admissiontest"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissiontestEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admissiontestDelete"
                            value="admissiontest"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="admissiontestDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Eligible Student */}

                    <tr>
                      <td>Eligible Student</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="eligible-studentAdd"
                            value="eligible-student"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="eligible-studentAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="eligible-studentView"
                            value="eligible-student"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="eligible-studentView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="eligible-studentEdit"
                            value="eligible-student"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="eligible-studentEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="eligible-studentDelete"
                            value="eligible-student"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="eligible-studentDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Student Information */}

                    {/* Student's Information */}

                    <tr>
                      <th rowSpan={4}>Student's Information</th>
                      <td>Student's Details</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentinfoAdd"
                            value="studentinfo"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="studentinfoAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentinfoView"
                            value="studentinfo"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="studentinfoView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentinfoEdit"
                            value="studentinfo"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="studentinfoEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentinfoDelete"
                            value="studentinfo"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentinfoDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Student Admisiion */}

                    <tr>
                      <td>Student Admission</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentadmissionAdd"
                            value="studentadmission"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentadmissionAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentadmissionView"
                            value="studentadmission"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentadmissionView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentadmissionEdit"
                            value="studentadmission"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentadmissionEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentadmissionDelete"
                            value="studentadmission"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentadmissionDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Student Category */}

                    <tr>
                      <td>Student Category</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="categoryAdd"
                            value="category"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="categoryAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="categoryView"
                            value="category"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="categoryView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="categoryEdit"
                            value="category"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="categoryEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="categoryDelete"
                            value="category"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="categoryDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Student House */}

                    <tr>
                      <td>Student House</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="houseAdd"
                            value="house"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="houseAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="houseView"
                            value="house"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="houseView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="houseEdit"
                            value="house"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="houseEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="houseDelete"
                            value="house"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="houseDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Academic */}

                    {/* Class & Section */}

                    <tr>
                      <th scope="row">Academic</th>
                      <td>Class & Section</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="classsectionAdd"
                            value="classsection"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="classsectionAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="classsectionView"
                            value="classsection"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="classsectionView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="classsectionEdit"
                            value="classsection"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="classsectionEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="classsectionDelete"
                            value="classsection"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="classsectionDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Examination */}

                    {/* Admit Card Generate */}

                    <tr>
                      <th rowSpan={3}>Examination</th>
                      <td>Admit Card Generate</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admitcardgenerateAdd"
                            value="admitcardgenerate"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="admitcardgenerateAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admitcardgenerateView"
                            value="admitcardgenerate"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="admitcardgenerateView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admitcardgenerateEdit"
                            value="admitcardgenerate"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="admitcardgenerateEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="admitcardgenerateDelete"
                            value="admitcardgenerate"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="admitcardgenerateDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Exam Eligibility */}
                    <tr>
                      <td>Exam Eligibility</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="exameligibilityAdd"
                            value="exameligibility"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="exameligibilityAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="exameligibilityView"
                            value="exameligibility"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="exameligibilityView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="exameligibilityEdit"
                            value="exameligibility"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="exameligibilityEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="exameligibilityDelete"
                            value="exameligibility"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="exameligibilityDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Temporary Pass */}

                    <tr>
                      <td>Temporary Pass</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="temppassAdd"
                            value="temppass"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="temppassAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="temppassView"
                            value="temppass"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="temppassView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="temppassEdit"
                            value="temppass"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="temppassEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="temppassDelete"
                            value="temppass"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="temppassDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR ECA & Club */}

                    {/* ECA Enrollment */}

                    <tr>
                      <th rowSpan={2}>ECA & Club</th>
                      <td>ECA Enrollment</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecaenrollmentAdd"
                            value="ecaenrollment"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="ecaenrollmentAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecaenrollmentView"
                            value="ecaenrollment"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="ecaenrollmentView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecaenrollmentEdit"
                            value="ecaenrollment"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="ecaenrollmentEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecaenrollmentDelete"
                            value="ecaenrollment"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="ecaenrollmentDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ECA Members */}

                    <tr>
                      <td>ECA Members</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecamembersAdd"
                            value="ecamembers"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="ecamembersAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecamembersView"
                            value="ecamembers"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="ecamembersView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecamembersEdit"
                            value="ecamembers"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="ecamembersEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="ecamembersDelete"
                            value="ecamembers"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="ecamembersDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Hifz */}

                    {/* Hifz Enrollment */}

                    <tr>
                      <th rowSpan={2}>Hifz</th>
                      <td>Hifz Enrollment</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzenrollmentAdd"
                            value="hifzenrollment"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="hifzenrollmentAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzenrollmentView"
                            value="hifzenrollment"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="hifzenrollmentView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzenrollmentEdit"
                            value="hifzenrollment"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="hifzenrollmentEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzenrollmentDelete"
                            value="hifzenrollment"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="hifzenrollmentDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Hifz Members */}

                    <tr>
                      <td>Hifz Members</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzmembersAdd"
                            value="hifzmembers"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="hifzmembersAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzmembersView"
                            value="hifzmembers"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="hifzmembersView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzmembersEdit"
                            value="hifzmembers"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="hifzmembersEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="hifzmembersDelete"
                            value="hifzmembers"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="hifzmembersDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Library */}

                    {/* Library */}

                    <tr>
                      <th scope="row">Library</th>
                      <td>Library Sell</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="librarysellAdd"
                            value="librarysell"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="librarysellAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="librarysellView"
                            value="librarysell"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="librarysellView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="librarysellEdit"
                            value="librarysell"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="librarysellEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="librarysellDelete"
                            value="librarysell"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="librarysellDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Certification */}

                    {/* Student ID Card Generate */}

                    <tr>
                      <th rowSpan={4}>Certification</th>
                      <td>Student ID Card Generate</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="student-card-generateAdd"
                            value="student-card-generate"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="student-card-generateAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="student-card-generateView"
                            value="student-card-generate"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="student-card-generateView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="student-card-generateEdit"
                            value="student-card-generate"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="student-card-generateEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="student-card-generateDelete"
                            value="student-card-generate"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="student-card-generateDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Bulk ID card Generation */}

                    <tr>
                      <td>Bulk Student ID Card Generate</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="bulk-student-card-generatorAdd"
                            value="bulk-student-card-generator"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="bulk-student-card-generatorAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="bulk-student-card-generatorView"
                            value="bulk-student-card-generator"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="bulk-student-card-generatorView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="bulk-student-card-generatorEdit"
                            value="bulk-student-card-generator"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="bulk-student-card-generatorEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="bulk-student-card-generatorDelete"
                            value="bulk-student-card-generator"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="bulk-student-card-generatorDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Program Certificate */}

                    <tr>
                      <td>Program Certificate</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="program-certificateAdd"
                            value="program-certificate"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="program-certificateAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="program-certificateView"
                            value="program-certificate"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="program-certificateView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="program-certificateEdit"
                            value="program-certificate"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="program-certificateEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="program-certificateDelete"
                            value="program-certificate"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="program-certificateDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Certificate Customization */}

                    <tr>
                      <td>Certificate Customization</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="certificate-customizeAdd"
                            value="certificate-customize"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="certificate-customizeAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="certificate-customizeView"
                            value="certificate-customize"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="certificate-customizeView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="certificate-customizeEdit"
                            value="certificate-customize"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="certificate-customizeEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="certificate-customizeDelete"
                            value="certificate-customize"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="certificate-customizeDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Fees Collection */}

                    {/* Fees Type */}

                    <tr>
                      <th rowSpan={6}>Fees Collection</th>
                      <td>Fees Type</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feestypeAdd"
                            value="feestype"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="feestypeAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feestypeView"
                            value="feestype"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="feestypeView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feestypeEdit"
                            value="feestype"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="feestypeEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feestypeDelete"
                            value="feestype"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="feestypeDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Fees Info */}

                    <tr>
                      <td>Fees Info</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesinfoAdd"
                            value="feesinfo"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="feesinfoAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesinfoView"
                            value="feesinfo"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="feesinfoView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesinfoEdit"
                            value="feesinfo"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="feesinfoEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesinfoDelete"
                            value="feesinfo"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="feesinfoDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Enrollment Fees */}

                    <tr>
                      <td>Enrollment Fees</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="enrollmentfeesAdd"
                            value="enrollmentfees"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="enrollmentfeesAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="enrollmentfeesView"
                            value="enrollmentfees"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="enrollmentfeesView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="enrollmentfeesEdit"
                            value="enrollmentfees"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="enrollmentfeesEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="enrollmentfeesDelete"
                            value="enrollmentfees"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="enrollmentfeesDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Fees Forward */}
                    <tr>
                      <td>Fees Forward</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fees-forwardAdd"
                            value="fees-forward"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="fees-forwardAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fees-forwardView"
                            value="fees-forward"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="fees-forwardView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fees-forwardEdit"
                            value="fees-forward"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="fees-forwardEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fees-forwardDelete"
                            value="fees-forward"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="fees-forwardDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Collect Fees */}
                    <tr>
                      <td>Collect Fees</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="collectfeesAdd"
                            value="collectfees"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="collectfeesAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="collectfeesView"
                            value="collectfees"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="collectfeesView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="collectfeesEdit"
                            value="collectfees"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="collectfeesEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="collectfeesDelete"
                            value="collectfees"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="collectfeesDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Fees Approval */}

                    <tr>
                      <td>Fees Approval</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesapprovalAdd"
                            value="feesapproval"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="feesapprovalAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesapprovalView"
                            value="feesapproval"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="feesapprovalView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesapprovalEdit"
                            value="feesapproval"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="feesapprovalEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="feesapprovalDelete"
                            value="feesapproval"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="feesapprovalDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Fees Discount */}

                    {/* Discount Type */}

                    <tr>
                      <th rowSpan={3}>Fees Discount</th>
                      <td>Discount Type</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discounttypeAdd"
                            value="discounttype"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="discounttypeAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discounttypeView"
                            value="discounttype"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="discounttypeView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discounttypeEdit"
                            value="discounttype"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="discounttypeEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discounttypeDelete"
                            value="discounttype"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="discounttypeDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Discount Assign */}
                    <tr>
                      <td>Discount Assign</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discountassignAdd"
                            value="discountassign"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="discountassignAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discountassignView"
                            value="discountassign"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="discountassignView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discountassignEdit"
                            value="discountassign"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="discountassignEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="discountassignDelete"
                            value="discountassign"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="discountassignDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Financial Aid */}

                    <tr>
                      <td>Financial Aid</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="financialaidAdd"
                            value="financialaid"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="financialaidAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="financialaidView"
                            value="financialaid"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="financialaidView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="financialaidEdit"
                            value="financialaid"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="financialaidEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="financialaidDelete"
                            value="financialaid"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="financialaidDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Expenses */}
                    {/* Add Expenses */}
                    <tr>
                      <th rowSpan={3}>Expenses</th>
                      <td>Add Expense</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="addexpenseAdd"
                            value="addexpense"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="addexpenseAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="addexpenseView"
                            value="addexpense"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="addexpenseView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="addexpenseEdit"
                            value="addexpense"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="addexpenseEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="addexpenseDelete"
                            value="addexpense"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="addexpenseDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Expense Head */}

                    <tr>
                      <td>Expense Head</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="expenseheadAdd"
                            value="expensehead"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="expenseheadAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="expenseheadView"
                            value="expensehead"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="expenseheadView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="expenseheadEdit"
                            value="expensehead"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="expenseheadEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="expenseheadDelete"
                            value="expensehead"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="expenseheadDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Approve Expense */}

                    <tr>
                      <td>Approve Expense</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveexpenseAdd"
                            value="approveexpense"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveexpenseAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveexpenseView"
                            value="approveexpense"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveexpenseView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveexpenseEdit"
                            value="approveexpense"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveexpenseEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveexpenseDelete"
                            value="approveexpense"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveexpenseDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Income */}

                    {/* Student Income */}

                    <tr>
                      <th rowSpan={4}>Income</th>
                      <td>Student Income</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentincomeAdd"
                            value="studentincome"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentincomeAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentincomeView"
                            value="studentincome"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentincomeView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentincomeEdit"
                            value="studentincome"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentincomeEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="studentincomeDelete"
                            value="studentincome"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="studentincomeDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* General Income */}

                    <tr>
                      <td>General Income</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generalincomeAdd"
                            value="generalincome"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="generalincomeAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generalincomeView"
                            value="generalincome"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="generalincomeView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generalincomeEdit"
                            value="generalincome"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="generalincomeEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generalincomeDelete"
                            value="generalincome"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="generalincomeDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Income Head */}

                    <tr>
                      <td>Income Head</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="incomeheadAdd"
                            value="incomehead"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="incomeheadAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="incomeheadView"
                            value="incomehead"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="incomeheadView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="incomeheadEdit"
                            value="incomehead"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="incomeheadEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="incomeheadDelete"
                            value="incomehead"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="incomeheadDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Approve Income */}

                    <tr>
                      <td>Approve Income</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveincomeAdd"
                            value="approveincome"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveincomeAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveincomeView"
                            value="approveincome"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveincomeView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveincomeEdit"
                            value="approveincome"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveincomeEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="approveincomeDelete"
                            value="approveincome"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="approveincomeDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Store & Inventory */}

                    {/* Product Student */}
                    <tr>
                      <th rowSpan={7}>Store & Inventory</th>
                      <td>Product Student</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="product-studentAdd"
                            value="product-student"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="product-studentAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="product-studentView"
                            value="product-student"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="product-studentView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="product-studentEdit"
                            value="product-student"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="product-studentEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="product-studentDelete"
                            value="product-student"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="product-studentDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Product General */}

                    <tr>
                      <td>Product General</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productaddAdd"
                            value="productadd"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="productaddAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productaddView"
                            value="productadd"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="productaddView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productaddEdit"
                            value="productadd"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="productaddEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productaddDelete"
                            value="productadd"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="productaddDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Product Category */}

                    <tr>
                      <td>Product Category</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productcategoryAdd"
                            value="productcategory"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="productcategoryAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productcategoryView"
                            value="productcategory"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="productcategoryView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productcategoryEdit"
                            value="productcategory"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="productcategoryEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="productcategoryDelete"
                            value="productcategory"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="productcategoryDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* GRN List */}

                    <tr>
                      <td>GRN List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNListAdd"
                            value="GRNList"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="GRNListAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNListView"
                            value="GRNList"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="GRNListView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNListEdit"
                            value="GRNList"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="GRNListEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNListDelete"
                            value="GRNList"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="GRNListDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Make GRN */}

                    <tr>
                      <td>Make GRN</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNAdd"
                            value="GRN"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="GRNAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNView"
                            value="GRN"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="GRNView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNEdit"
                            value="GRN"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="GRNEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="GRNDelete"
                            value="GRN"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="GRNDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* MDR List */}

                    <tr>
                      <td>MDR List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRListAdd"
                            value="MDRList"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="MDRListAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRListView"
                            value="MDRList"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="MDRListView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRListEdit"
                            value="MDRList"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="MDRListEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRListDelete"
                            value="MDRList"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="MDRListDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Make MDR */}

                    <tr>
                      <td>Make MDR</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRAdd"
                            value="MDR"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="MDRAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRView"
                            value="MDR"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="MDRView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDREdit"
                            value="MDR"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="MDREdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="MDRDelete"
                            value="MDR"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="MDRDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Procurement */}

                    {/* Make Requisition */}

                    <tr>
                      <th rowSpan={12}>Procurement</th>
                      <td>Make Requisition</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makerequisitionAdd"
                            value="makerequisition"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="makerequisitionAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makerequisitionView"
                            value="makerequisition"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="makerequisitionView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makerequisitionEdit"
                            value="makerequisition"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="makerequisitionEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makerequisitionDelete"
                            value="makerequisition"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="makerequisitionDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Requisition List */}

                    <tr>
                      <td>Requisition List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="requisitionlistAdd"
                            value="requisitionlist"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="requisitionlistAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="requisitionlistView"
                            value="requisitionlist"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="requisitionlistView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="requisitionlistEdit"
                            value="requisitionlist"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="requisitionlistEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="requisitionlistDelete"
                            value="requisitionlist"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="requisitionlistDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Suppliers */}

                    <tr>
                      <td>Suppliers</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="suppliersAdd"
                            value="suppliers"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="suppliersAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="suppliersView"
                            value="suppliers"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="suppliersView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="suppliersEdit"
                            value="suppliers"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="suppliersEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="suppliersDelete"
                            value="suppliers"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="suppliersDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* CS Generation */}

                    <tr>
                      <td>CS Generation</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="csgenerateAdd"
                            value="csgenerate"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="csgenerateAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="csgenerateView"
                            value="csgenerate"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="csgenerateView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="csgenerateEdit"
                            value="csgenerate"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="csgenerateEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="csgenerateDelete"
                            value="csgenerate"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="csgenerateDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* CS List */}

                    <tr>
                      <td>CS List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="cslistAdd"
                            value="cslist"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="cslistAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="cslistView"
                            value="cslist"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="cslistView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="cslistEdit"
                            value="cslist"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="cslistEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="cslistDelete"
                            value="cslist"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="cslistDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Generate Order */}

                    <tr>
                      <td>Generate Order</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generateorderAdd"
                            value="generateorder"
                            onChange={handleAddChange}
                          />
                          <label
                            class="form-check-label"
                            for="generateorderAdd"
                          >
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generateorderView"
                            value="generateorder"
                            onChange={handleViewChange}
                          />
                          <label
                            class="form-check-label"
                            for="generateorderView"
                          >
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generateorderEdit"
                            value="generateorder"
                            onChange={handleEditChange}
                          />
                          <label
                            class="form-check-label"
                            for="generateorderEdit"
                          >
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="generateorderDelete"
                            value="generateorder"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="generateorderDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Order List */}

                    <tr>
                      <td>Order List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="orderlistAdd"
                            value="orderlist"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="orderlistAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="orderlistView"
                            value="orderlist"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="orderlistView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="orderlistEdit"
                            value="orderlist"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="orderlistEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="orderlistDelete"
                            value="orderlist"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="orderlistDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Make FR */}

                    <tr>
                      <td>Make FR</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makefrAdd"
                            value="makefr"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="makefrAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makefrView"
                            value="makefr"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="makefrView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makefrEdit"
                            value="makefr"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="makefrEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makefrDelete"
                            value="makefr"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="makefrDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* FR List */}

                    <tr>
                      <td>FR List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fr-listAdd"
                            value="fr-list"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="fr-listAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fr-listView"
                            value="fr-list"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="fr-listView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fr-listEdit"
                            value="fr-list"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="fr-listEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="fr-listDelete"
                            value="fr-list"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="fr-listDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Make SP */}

                    <tr>
                      <td>Make SP</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makespAdd"
                            value="makesp"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="makespAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makespView"
                            value="makesp"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="makespView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makespEdit"
                            value="makesp"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="makespEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makespDelete"
                            value="makesp"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="makespDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* SP List */}

                    <tr>
                      <td>Make SP</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="sp-listAdd"
                            value="sp-list"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="sp-listAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="sp-listView"
                            value="sp-list"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="sp-listView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="sp-listEdit"
                            value="sp-list"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="sp-listEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="sp-listDelete"
                            value="sp-list"
                            onChange={handleDeleteChange}
                          />
                          <label class="form-check-label" for="sp-listDelete">
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Audit Trial */}

                    <tr>
                      <td>Audit Trial</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="audittrialAdd"
                            value="audittrial"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="audittrialAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="audittrialView"
                            value="audittrial"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="audittrialView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="audittrialEdit"
                            value="audittrial"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="audittrialEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="audittrialDelete"
                            value="audittrial"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="audittrialDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Budget */}

                    {/* Budget List */}

                    <tr>
                      <th rowSpan={2}>Budget</th>
                      <td>Budget List</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="budgetlistAdd"
                            value="budgetlist"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="budgetlistAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="budgetlistView"
                            value="budgetlist"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="budgetlistView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="budgetlistEdit"
                            value="budgetlist"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="budgetlistEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="budgetlistDelete"
                            value="budgetlist"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="budgetlistDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Make Budget */}

                    <tr>
                      <td>Make Budget</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makebudgetAdd"
                            value="makebudget"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="makebudgetAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makebudgetView"
                            value="makebudget"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="makebudgetView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makebudgetEdit"
                            value="makebudget"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="makebudgetEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="makebudgetDelete"
                            value="makebudget"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="makebudgetDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR HR */}

                    {/* Depertment */}

                    <tr>
                      <th rowSpan={2}>HR</th>
                      <td>Depertment</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="departmentAdd"
                            value="department"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="departmentAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="departmentView"
                            value="department"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="departmentView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="departmentEdit"
                            value="department"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="departmentEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="departmentDelete"
                            value="department"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="departmentDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* Designation */}
                    <tr>
                      <td>Designation</td>
                      <td>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="designationAdd"
                            value="designation"
                            onChange={handleAddChange}
                          />
                          <label class="form-check-label" for="designationAdd">
                            Add
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="designationView"
                            value="designation"
                            onChange={handleViewChange}
                          />
                          <label class="form-check-label" for="designationView">
                            View
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="designationEdit"
                            value="designation"
                            onChange={handleEditChange}
                          />
                          <label class="form-check-label" for="designationEdit">
                            Edit
                          </label>
                        </div>
                        <div class="form-check form-check-inline">
                          <input
                            class="form-check-input"
                            type="checkbox"
                            id="designationDelete"
                            value="designation"
                            onChange={handleDeleteChange}
                          />
                          <label
                            class="form-check-label"
                            for="designationDelete"
                          >
                            Delete
                          </label>
                        </div>
                      </td>
                    </tr>

                    {/* ANCHOR Settings */}
                  </tbody>
                </table>

                <button
                  className="btn submit-btn-sm w-100"
                  type="submit"
                  onClick={submitUserPrevileges}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
