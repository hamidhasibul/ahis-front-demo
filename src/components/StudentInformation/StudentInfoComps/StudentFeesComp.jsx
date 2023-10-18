import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useParams } from "react-router-dom";
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
export const StudentFeesComp = () => {
  const [studentData, setStudentData] = useState([]);
  const [feesData, setFeesData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const params = useParams();
  const { id } = params;
  const columns = [
    {
      name: "Fee Type",
      selector: (row) => row.feesType,
      width: "15%",
    },
    {
      name: "Due Date",
      selector: (row) => row.due_date.slice(0, 10),
      width: "10%",
    },
    {
      name: "Total",
      selector: (row) => row.amount,
      width: "8%",
    },
    {
      name: "Discount",
      selector: (row) => row.discount,
      width: "8%",
    },
    {
      name: "Fine",
      selector: (row) => row.fine,
      width: "8%",
    },
    {
      name: "Payable",
      selector: (row) => row.totalPayable,
      width: "8%",
    },
    {
      name: "Payment Status",
      selector: (row) =>
        !row.status2 ? (
          row.paymentStatus === "halfPaid" ? (
            <p className="rounded-pill partial-status">Partial Paid</p>
          ) : row.paymentStatus === "fullPaid" ? (
            <>
              <p className="rounded-pill full-status my-1">Full Paid</p>
              {row.advancePayment == "1" && (
                <>
                  <p className="rounded-pill advance-status">Advanced</p>
                </>
              )}
            </>
          ) : (
            <p className="rounded-pill unpaid-status">Unpaid</p>
          )
        ) : (
          <p className="rounded-pill pending-status">Pending . . .</p>
        ),
      width: "12%",
    },
    {
      name: "Paid",
      selector: (row) => row.paid,
      width: "7%",
    },
    {
      name: "Mode",
      selector: (row) => (
        <>
          {" "}
          <p className="text-uppercase">{row.payment_mode}</p>
        </>
      ),
      width: "7%",
    },
    {
      name: "Payment Date",
      selector: (row) => row.payment_date.slice(0, 10),
      width: "10%",
    },
    {
      name: "Balance",
      selector: (row) => row.balance,
      width: "7%",
    },
  ];
  const getStudentData = async () => {
    try {
      const data = new FormData();
      data.append("id", id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/getStudentViewByid`,
        { method: "POST", body: data }
      );

      const res = await response.json();

      setStudentData(res.message[0]);
    } catch (error) {
      console.log(error);
    }
  };
  const getFeesCollection = async () => {
    try {
      const data = new FormData();
      data.append("student_id", studentData.student_id);

      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/feesCollectionById`,
        { method: "POST", body: data }
      );
      const res = await response.json();
      setFeesData(res.message);
    } catch (error) {
      console.log(error);
    }
  };

  const filterData = () => {
    const data = feesData?.map((row) => {
      return { ...row, totalPayable: row.amount - row.discount };
    });
    setFilteredData(data);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  useEffect(() => {
    getFeesCollection();
  }, [studentData.student_id]);

  useEffect(() => {
    filterData();
  }, [feesData]);

  return (
    <div className="container-fluid">
      <div className="row py-2">
        <div className="col-lg-12">
          <div className="border mb-3">
            <div className="d-flex bg1 px-3 py-1">
              <p className="text1 mb-0">Financial Aid</p>
            </div>

            <div className="container-fluid">
              <div className="row px-1 py-1">
                <div className="col-lg-3 mb-2"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
          <DataTable
            columns={columns}
            data={filteredData}
            className="mb-2 border"
            customStyles={customStyle}
            dense
          />
        </div>
      </div>
    </div>
  );
};
