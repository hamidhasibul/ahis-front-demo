import React, { useEffect, useState, useContext } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
import { SessionContext } from "../../../context/SessionContext";
import { ClassContext } from "../../../context/ClassContext";
import { UserRoleContext } from "../../../context/UserRoleContext";

const customStyle = {
  rows: {
    style: {
      fontSize: "12px",
    },
  },
  headCells: {
    style: {
      fontSize: "11px",
      fontWeight: 600,
      backgroundColor: "#dddddd",
    },
  },
};

export const EnrollmentFeesIndViewComp = () => {
  const [studentData, setStudentData] = useState([]);
  const [feeInfoData, setFeeInfoData] = useState([]);
  const [selectedRows, setSelectedRows] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const [inputValues, setInputValues] = useState([0, 0, 0, 0]);
  const [payableValues, setPayableValues] = useState([]);

  const [paymentStatVal, setPaymentStatVal] = useState([]);
  const [filteredData, setFilteredData] = useState([
    {
      id: 0,
      amount: 0,
      discount: 0,
      due: 0,
      feeClass: "",
      feeDesc: "",
      feeType: "",
      paidAmount: 0,
      paymentStatus: "",
      session: "",
      totalPayable: 0,
    },
  ]);

  const { session } = useContext(SessionContext);
  const { classInfo } = useContext(ClassContext);
  const { user, username, userid, designation } = useContext(UserRoleContext);
  const params = useParams();
  const { id } = params;

  const handleInputChange = (index, e) => {
    const newInputValues = [...inputValues];

    newInputValues[index] = Number(e.target.value);

    setInputValues(newInputValues);
  };

  const handlePaymentStatChange = (index, e) => {
    const newPaymentStatValues = [...paymentStatVal];

    newPaymentStatValues[index] = e.target.value;
    setPaymentStatVal(newPaymentStatValues);
  };

  const columns = [
    {
      name: "Fee Type",
      selector: (row) => row.feeType,
      width: "25%",
    },
    {
      name: "Total",
      selector: (row) => row.amount,
      width: "10%",
    },
    {
      name: "Total Payable",
      selector: (row, index) => row.totalPayable,
      width: "10%",
    },
    {
      name: "Payment Status",
      cell: (row, index) => (
        <>
          <div className="form-check col-lg-4">
            <input
              className="form-check-input mt-0"
              type="radio"
              value="fullPaid"
              name={`${row.feeType
                .replace(" ", "")
                .toLowerCase()}paymentStatus`}
              onChange={(e) => {
                handlePaymentStatChange(index, e);
                inputValues[index] = row.totalPayable;
              }}
            />
            <label className="form-check-label font-13 fw-500 ms-1">
              Full Paid
            </label>
          </div>
          <div className="form-check col-lg-4">
            <input
              className="form-check-input mt-0"
              type="radio"
              value="halfPaid"
              name={`${row.feeType
                .replace(" ", "")
                .toLowerCase()}paymentStatus`}
              onChange={(e) => {
                handlePaymentStatChange(index, e);
              }}
            />
            <label className="form-check-label font-13 fw-500 ms-1 text-pending">
              Partial Paid
            </label>
          </div>
        </>
      ),
      width: "30%",
    },
    {
      name: "Amount",
      cell: (row, index) => (
        <>
          <input
            className="form-control input1"
            type="text"
            placeholder="Amount"
            aria-label="form-control example"
            onChange={(e) => handleInputChange(index, e)}
            value={inputValues[index]}
          />
        </>
      ),
    },
    {
      name: "Due",
      selector: (row) => row.due,
    },
  ];

  // Functions

  const getstudent = () => {
    const data = new FormData();
    data.append("id", id);
    fetch(`${import.meta.env.VITE_SERVER}/fetchStudentByid`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setStudentData(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  const getAllFeeInfo = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/fetchFeeInfo`,
        {
          method: "POST",
        }
      );
      const res = await response.json();

      const filteredFeeInfo = await res.message.filter((item) => {
        if (item.session === session && item.feeClass === studentData.Class) {
          return item;
        }
      });
      setFeeInfoData(filteredFeeInfo);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectedChange = ({ selectedRows }) => {
    setSelectedRows(selectedRows);
  };

  const filterData = () => {
    const data = feeInfoData
      ?.filter((item) => {
        return (
          item.feeType === "Admission Fee" ||
          item.feeType === "Tuition Fee" ||
          item.feeType === "Annual Fee"
          // item.feeType === "One-Time Fee"
        );
      })
      ?.map((row, index) => {
        // Admission Fee
        if (
          row.feeType === "Admission Fee" &&
          studentData?.admission_fee === "true"
        ) {
          if (studentData?.admission_discount === "percentage") {
            const totalPayable =
              Number(row.amount) -
              Number(row.amount) * (Number(studentData.admission_amount) / 100);

            const discount =
              Number(row.amount) * (Number(studentData.admission_amount) / 100);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paymentStatus: paymentStatVal[index],
              paidAmount: +inputValues[index],
              discount,
            };
          } else {
            const totalPayable =
              Number(row.amount) - Number(studentData.admission_amount);

            const discount = Number(studentData.admission_amount);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paidAmount: +inputValues[index],
              paymentStatus: paymentStatVal[index],
              discount,
            };
          }
        } else if (
          row.feeType === "Admission Fee" &&
          studentData?.admission_fee === "false"
        ) {
          const totalPayable = Number(row.amount);

          const discount = 0;
          return {
            ...row,
            totalPayable,
            due: +totalPayable - +inputValues[index],
            paidAmount: +inputValues[index],
            paymentStatus: paymentStatVal[index],
            discount,
          };
        }

        // Tuition Fee
        else if (
          row.feeType === "Tuition Fee" &&
          studentData?.tuition_fee === "true"
        ) {
          if (studentData?.tuition_discount === "percentage") {
            const totalPayable =
              Number(row.amount) -
              Number(row.amount) * (Number(studentData.tuition_amount) / 100);

            const discount =
              Number(row.amount) * (Number(studentData.tuition_amount) / 100);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paidAmount: +inputValues[index],
              paymentStatus: paymentStatVal[index],
              discount,
            };
          } else {
            const totalPayable =
              Number(row.amount) - Number(studentData.tuition_amount);

            const discount = Number(studentData.tuition_amount);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paidAmount: +inputValues[index],
              paymentStatus: paymentStatVal[index],
              discount,
            };
          }
        } else if (
          row.feeType === "Tuition Fee" &&
          studentData?.tuition_fee === "false"
        ) {
          const totalPayable = Number(row.amount);

          const discount = 0;
          return {
            ...row,
            totalPayable,
            due: +totalPayable - +inputValues[index],
            paidAmount: inputValues[index],
            paymentStatus: paymentStatVal[index],
            discount,
          };
        }

        // Annual Fee
        else if (
          row.feeType === "Annual Fee" &&
          studentData?.annual_fee === "true"
        ) {
          if (studentData?.annual_discount === "percentage") {
            const totalPayable =
              Number(row.amount) -
              Number(row.amount) * (Number(studentData.annual_amount) / 100);

            const discount =
              Number(row.amount) * (Number(studentData.annual_amount) / 100);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paidAmount: +inputValues[index],
              paymentStatus: paymentStatVal[index],
              discount,
            };
          } else {
            const totalPayable =
              Number(row.amount) - Number(studentData.annual_amount);

            const discount = Number(studentData.annual_amount);
            return {
              ...row,
              totalPayable,
              due: +totalPayable - +inputValues[index],
              paidAmount: +inputValues[index],
              paymentStatus: paymentStatVal[index],
              discount,
            };
          }
        } else if (
          row.feeType === "Annual Fee" &&
          studentData?.annual_fee === "false"
        ) {
          const totalPayable = Number(row.amount);

          const discount = 0;
          return {
            ...row,
            totalPayable,
            due: +totalPayable - +inputValues[index],
            paidAmount: +inputValues[index],
            paymentStatus: paymentStatVal[index],
            discount,
          };
        }

        // One-Time Fee
        // else if (
        //   row.feeType === "One-Time Fee" &&
        //   studentData?.ot_discount === "true"
        // ) {
        //   if (studentData?.ot_discount_type === "percentage") {
        //     const totalPayable =
        //       Number(row.amount) -
        //       Number(row.amount) * (Number(studentData.ot_amount) / 100);

        //     const discount =
        //       Number(row.amount) * (Number(studentData.ot_amount) / 100);
        //     return {
        //       ...row,
        //       totalPayable,
        //       due: totalPayable - inputValues[index],
        //       paidAmount: inputValues[index],
        //       paymentStatus: paymentStatVal[index],
        //       discount,
        //     };
        //   } else {
        //     const totalPayable =
        //       Number(row.amount) - Number(studentData.ot_amount);

        //     const discount = Number(studentData.ot_amount);
        //     return {
        //       ...row,
        //       totalPayable,
        //       due: totalPayable - inputValues[index],
        //       paidAmount: inputValues[index],
        //       paymentStatus: paymentStatVal[index],
        //       discount,
        //     };
        //   }
        // } else if (
        //   row.feeType === "One-Time Fee" &&
        //   studentData?.ot_discount === "false"
        // ) {
        //   const totalPayable = Number(row.amount);

        //   const discount = 0;
        //   return {
        //     ...row,
        //     totalPayable,
        //     due: totalPayable - inputValues[index],
        //     paidAmount: inputValues[index],
        //     paymentStatus: paymentStatVal[index],
        //     discount,
        //   };
        // } else {
        //   return null;
        // }
      });
    setFilteredData(data.filter((item) => item !== null));
  };

  /* const filterData = () => {
    const filterTypes = [
      "Admission Fee",
      "Tuition Fee",
      "Annual Fee",
      "One-Time Fee",
    ];

    const calculateDiscount = (amount, discountType, discountAmount) => {
      if (discountType === "percentage") {
        const discount = amount * (discountAmount / 100);
        return { discount, totalPayable: amount - discount };
      } else {
        const discount = discountAmount;
        return { discount, totalPayable: amount - discount };
      }
    };

    const processFeeType = (
      row,
      index,
      studentData,
      inputValues,
      paymentStatVal
    ) => {
      const feeType = row.feeType;

      if (studentData && studentData[feeType.toLowerCase()]) {
        const discountData = calculateDiscount(
          Number(row.amount),
          studentData[feeType.toLowerCase() + "_discount"],
          Number(studentData[feeType.toLowerCase() + "_amount"])
        );

        return {
          ...row,
          ...discountData,
          due: discountData.totalPayable - inputValues[index],
          paidAmount: inputValues[index],
          paymentStatus: paymentStatVal[index],
        };
      } else {
        return {
          ...row,
          totalPayable: Number(row.amount),
          due: Number(row.amount) - inputValues[index],
          paidAmount: inputValues[index],
          paymentStatus: paymentStatVal[index],
          discount: 0,
        };
      }
    };

    const data = feeInfoData
      ?.filter((item) => filterTypes.includes(item.feeType))
      ?.map((row, index) =>
        processFeeType(row, index, studentData, inputValues, paymentStatVal)
      )
      .filter((item) => item !== null);

    setFilteredData(data);
  }; */

  // Add Fees

  function addFeeCollection(selectedRows) {
    selectedRows.map((item) => {
      const data = new FormData();
      data.append("student_id", studentData.student_id);
      data.append("fees_info", "");
      data.append("feesType", item.feeType);
      data.append(
        "due_date",
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      data.append("amount", +item.amount);
      data.append("payment_mode", "");
      data.append("payment_id", "");
      data.append(
        "payment_date",
        new Date().toISOString().slice(0, 19).replace("T", " ")
      );
      data.append("discount", +item.discount);
      data.append("advancePayment", 0);
      data.append("paymentStatus", item.paymentStatus);
      data.append("fine", "");
      data.append("paid", +item.paidAmount);
      data.append("balance", +item.due);
      data.append("session", session);
      data.append("compile", username + "," + designation + "," + user);

      fetch(`${import.meta.env.VITE_SERVER}/addFeesCollection`, {
        method: "POST",
        body: data,
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    });
  }

  useEffect(() => {
    Promise.all([getstudent(), getAllFeeInfo(), filterData()]).then(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    getstudent();
    filterData();
  }, []);

  useEffect(() => {
    getAllFeeInfo();
  }, [studentData]);

  useEffect(() => {
    filterData();
  }, [studentData, feeInfoData, inputValues, paymentStatVal, selectedRows]);

  const [yn, setYn] = useState(false);
  const handlerChange = (e) => {
    if (e.target.checked) {
      setYn(true);
    } else {
      setYn(false);
    }
  };

  console.log(selectedRows);

  return (
    <>
      <div className="content-body">
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Applicant Info</p>
        </div>
        <div className="scroll-element">
          <div className="container-fluid">
            {/* Student info Section */}

            <div className="row py-2 mb-2">
              <div className="col-lg-2">
                <img
                  src={`${
                    import.meta.env.VITE_IMG_SERVER +
                    studentData.student_picture
                  }`}
                  className="profile_img2"
                />
              </div>
              <div className="col-lg-5">
                <table className="table border table-striped table-responsive">
                  <thead>
                    <tr>
                      <th colspan="2" className="font-13 py-1">
                        Student's Info
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="font-13 py-1" width="40%">
                        Student Name
                      </td>
                      <td className="font-13 py-1">
                        : {studentData.student_first_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-13 py-1">Student ID</td>
                      <td className="font-13 py-1">
                        : {studentData.student_id}
                      </td>
                    </tr>
                    <tr>
                      <td className="font-13 py-1">Class</td>
                      <td className="font-13 py-1">: {studentData.Class}</td>
                    </tr>
                    <tr>
                      <td className="font-13 py-1">Student Category</td>
                      <td className="font-13 py-1">: {studentData.category}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-lg-5">
                <table className="table border table-striped table-responsive">
                  <thead>
                    <tr>
                      <th className="font-13 py-1">Financial Aid</th>
                      <th className="font-13 py-1">Applicable For</th>
                      <th className="font-13 py-1">Aid Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* Sibling Admission Fee */}
                    {studentData?.financial_aid_type === "Siblings" &&
                      studentData?.admission_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Siblings</td>
                          <td className="font-13 py-1">Admission Fee</td>
                          <td className="font-13 py-1">
                            {studentData.admission_discount === "percentage"
                              ? `${studentData.admission_amount}%`
                              : studentData.admission_amount}
                          </td>
                        </tr>
                      )}

                    {/* Sibling Tuition Fee */}

                    {studentData?.financial_aid_type === "Siblings" &&
                      studentData?.tuition_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Siblings</td>
                          <td className="font-13 py-1">Tuition Fee</td>
                          <td className="font-13 py-1">
                            {studentData.tuition_discount === "percentage"
                              ? `${studentData.tuition_amount}%`
                              : studentData.tuition_amount}
                          </td>
                        </tr>
                      )}

                    {/* Sibling Annual Fee */}

                    {studentData?.financial_aid_type === "Siblings" &&
                      studentData?.annual_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Siblings</td>
                          <td className="font-13 py-1">Annual Fee</td>
                          <td className="font-13 py-1">
                            {studentData.annual_discount === "percentage"
                              ? `${studentData.annual_amount}%`
                              : studentData.annual_amount}
                          </td>
                        </tr>
                      )}

                    {/* Sibling One-Time Fee */}

                    {studentData?.financial_aid_type === "Siblings" &&
                      studentData?.ot_discount === "true" && (
                        <tr>
                          <td className="font-13 py-1">Siblings</td>
                          <td className="font-13 py-1">One-Time Fee</td>
                          <td className="font-13 py-1">
                            {studentData.ot_discount_type === "percentage"
                              ? `${studentData.ot_amount}%`
                              : studentData.ot_amount}
                          </td>
                        </tr>
                      )}

                    {/* AHIS Employee Admission Fee */}

                    {studentData?.financial_aid_type === "AHIS Employee" &&
                      studentData?.admission_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">AHIS Employee</td>
                          <td className="font-13 py-1">Admission Fee</td>
                          <td className="font-13 py-1">
                            {studentData.admission_discount === "percentage"
                              ? `${studentData.admission_amount}%`
                              : studentData.admission_amount}
                          </td>
                        </tr>
                      )}

                    {/* AHIS Employee Tuition Fee */}

                    {studentData?.financial_aid_type === "AHIS Employee" &&
                      studentData?.tuition_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">AHIS Employee</td>
                          <td className="font-13 py-1">Tuition Fee</td>
                          <td className="font-13 py-1">
                            {studentData.tuition_discount === "percentage"
                              ? `${studentData.tuition_amount}%`
                              : studentData.tuition_amount}
                          </td>
                        </tr>
                      )}

                    {/* AHIS Employee Annual Fee */}

                    {studentData?.financial_aid_type === "AHIS Employee" &&
                      studentData?.annual_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">AHIS Employee</td>
                          <td className="font-13 py-1">Annual Fee</td>
                          <td className="font-13 py-1">
                            {studentData.annual_discount === "percentage"
                              ? `${studentData.annual_amount}%`
                              : studentData.annual_amount}
                          </td>
                        </tr>
                      )}

                    {/* AHIS Employee One-Time Fee */}

                    {studentData?.financial_aid_type === "AHIS Employee" &&
                      studentData?.ot_discount === "true" && (
                        <tr>
                          <td className="font-13 py-1">AHIS Employee</td>
                          <td className="font-13 py-1">One-Time Fee</td>
                          <td className="font-13 py-1">
                            {studentData.ot_discount_type === "percentage"
                              ? `${studentData.ot_amount}%`
                              : studentData.ot_amount}
                          </td>
                        </tr>
                      )}

                    {/* Civil Defence */}

                    {/* Civil Defence Admission Fee */}

                    {studentData?.financial_aid_type === "Civil Defence" &&
                      studentData?.admission_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Civil Defence</td>
                          <td className="font-13 py-1">Admission Fee</td>
                          <td className="font-13 py-1">
                            {studentData.admission_discount === "percentage"
                              ? `${studentData.admission_amount}%`
                              : studentData.admission_amount}
                          </td>
                        </tr>
                      )}

                    {/* Civil Defence Tuition Fee */}

                    {studentData?.financial_aid_type === "Civil Defence" &&
                      studentData?.tuition_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Civil Defence</td>
                          <td className="font-13 py-1">Tuition Fee</td>
                          <td className="font-13 py-1">
                            {studentData.tuition_discount === "percentage"
                              ? `${studentData.tuition_amount}%`
                              : studentData.tuition_amount}
                          </td>
                        </tr>
                      )}

                    {/* Civil Defence Annual Fee */}

                    {studentData?.financial_aid_type === "Civil Defence" &&
                      studentData?.annual_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Civil Defence</td>
                          <td className="font-13 py-1">Annual Fee</td>
                          <td className="font-13 py-1">
                            {studentData.annual_discount === "percentage"
                              ? `${studentData.annual_amount}%`
                              : studentData.annual_amount}
                          </td>
                        </tr>
                      )}

                    {/* Civil Defence One-Time Fee */}

                    {studentData?.financial_aid_type === "Civil Defence" &&
                      studentData?.ot_discount === "true" && (
                        <tr>
                          <td className="font-13 py-1">Civil Defence</td>
                          <td className="font-13 py-1">One-Time Fee</td>
                          <td className="font-13 py-1">
                            {studentData.ot_discount_type === "percentage"
                              ? `${studentData.ot_amount}%`
                              : studentData.ot_amount}
                          </td>
                        </tr>
                      )}

                    {/* Merit Based */}

                    {/* Merit Based Admission Fee */}

                    {studentData?.financial_aid_type === "Merit Based" &&
                      studentData?.admission_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Merit Based</td>
                          <td className="font-13 py-1">Admission Fee</td>
                          <td className="font-13 py-1">
                            {studentData.admission_discount === "percentage"
                              ? `${studentData.admission_amount}%`
                              : studentData.admission_amount}
                          </td>
                        </tr>
                      )}

                    {/* Merit Based Tuition Fee */}

                    {studentData?.financial_aid_type === "Merit Based" &&
                      studentData?.tuition_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Merit Based</td>
                          <td className="font-13 py-1">Tuition Fee</td>
                          <td className="font-13 py-1">
                            {studentData.tuition_discount === "percentage"
                              ? `${studentData.tuition_amount}%`
                              : studentData.tuition_amount}
                          </td>
                        </tr>
                      )}

                    {/* Merit Based Annual Fee */}

                    {studentData?.financial_aid_type === "Merit Based" &&
                      studentData?.annual_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Merit Based</td>
                          <td className="font-13 py-1">Annual Fee</td>
                          <td className="font-13 py-1">
                            {studentData.annual_discount === "percentage"
                              ? `${studentData.annual_amount}%`
                              : studentData.annual_amount}
                          </td>
                        </tr>
                      )}

                    {/* Merit Based One-Time Fee */}

                    {studentData?.financial_aid_type === "Merit Based" &&
                      studentData?.ot_discount === "true" && (
                        <tr>
                          <td className="font-13 py-1">Merit Based</td>
                          <td className="font-13 py-1">One-Time Fee</td>
                          <td className="font-13 py-1">
                            {studentData.ot_discount_type === "percentage"
                              ? `${studentData.ot_amount}%`
                              : studentData.ot_amount}
                          </td>
                        </tr>
                      )}

                    {/* Others */}

                    {/* Others Admission Fee */}

                    {studentData?.financial_aid_type === "Others" &&
                      studentData?.admission_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Others</td>
                          <td className="font-13 py-1">Admission Fee</td>
                          <td className="font-13 py-1">
                            {studentData.admission_discount === "percentage"
                              ? `${studentData.admission_amount}%`
                              : studentData.admission_amount}
                          </td>
                        </tr>
                      )}

                    {/* Others Tuition Fee */}

                    {studentData?.financial_aid_type === "Others" &&
                      studentData?.tuition_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Others</td>
                          <td className="font-13 py-1">Tuition Fee</td>
                          <td className="font-13 py-1">
                            {studentData.tuition_discount === "percentage"
                              ? `${studentData.tuition_amount}%`
                              : studentData.tuition_amount}
                          </td>
                        </tr>
                      )}

                    {/* Others Annual Fee */}

                    {studentData?.financial_aid_type === "Others" &&
                      studentData?.annual_fee === "true" && (
                        <tr>
                          <td className="font-13 py-1">Others</td>
                          <td className="font-13 py-1">Annual Fee</td>
                          <td className="font-13 py-1">
                            {studentData.annual_discount === "percentage"
                              ? `${studentData.annual_amount}%`
                              : studentData.annual_amount}
                          </td>
                        </tr>
                      )}

                    {/* Others One-Time Fee */}

                    {studentData?.financial_aid_type === "Others" &&
                      studentData?.ot_discount === "true" && (
                        <tr>
                          <td className="font-13 py-1">Others</td>
                          <td className="font-13 py-1">One-Time Fee</td>
                          <td className="font-13 py-1">
                            {studentData.ot_discount_type === "percentage"
                              ? `${studentData.ot_amount}%`
                              : studentData.ot_amount}
                          </td>
                        </tr>
                      )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <DataTable
            columns={columns}
            data={filteredData}
            customStyles={customStyle}
            onSelectedRowsChange={handleSelectedChange}
            selectableRows
          />

          <div className="container-fluid border-top">
            <div className="row align-items-center py-3">
              <div className="col-lg-12">
                <p className="font-11 text-muted">
                  You can select and submit all items together. Check again
                  before submit.
                </p>
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
              <div className="col-lg-2 text-end">
                <button
                  className="btn submit-btn-sm w-100"
                  onClick={() => {
                    addFeeCollection(selectedRows);
                  }}
                  disabled={yn !== true}
                >
                  Add
                </button>
              </div>
            </div>
          </div>

          {/* Test */}
        </div>
      </div>
    </>
  );
};
