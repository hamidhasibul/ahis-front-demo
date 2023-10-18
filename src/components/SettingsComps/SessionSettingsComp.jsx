import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";

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

export const SessionSettingsComp = () => {
  const [sessionData, setSessionData] = useState([]);
  const [selectedSession, setSelectedSession] = useState("");
  const [update, setUpdate] = useState(0);

  const columns = [
    {
      name: "#",

      cell: (row, index) => <div>{index + 1}</div>,
    },
    {
      name: "Session",
      cell: (row) => <div>{row.session}</div>,
    },
    {
      name: "Status",
      cell: (row) => (
        <div>
          {+row.status === 1 ? (
            <p className="text-danger fw-bold">Active</p>
          ) : (
            <p className="fw-bold">Inactive</p>
          )}
        </div>
      ),
    },
  ];

  //   Functions

  const getSessionData = () => {
    fetch(`${import.meta.env.VITE_SERVER}/getSession`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((res) => {
        setSessionData(res.message);
      })
      .catch((err) => console.log(err));
  };

  const changeActiveSessionHandler = async (id) => {
    const data = new FormData();
    data.append("id", id);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER}/changeActiveSession`,
        {
          method: "POST",
          body: data,
        }
      );

      const res = await response.json();

      setUpdate(update + 1);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSessionData();
  }, [update]);

  return (
    <>
      <div className="content-body">
        {/* Head */}
        <div className="d-flex py-2 px-3 border-b align-items-center">
          <p className="header-font">Session Settings</p>
        </div>

        {/* Body */}

        <div className="scroll-element">
          <div className="container-fluid">
            <div className="row px-1">
              {/* Active Session Settings */}

              <div className="col-lg-4 pt-2">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">Active Session</label>
                    <select
                      className="form-select input1 py-0"
                      onChange={(e) => {
                        setSelectedSession(e.target.value);
                      }}
                    >
                      {sessionData.map((item) => (
                        <>
                          <option
                            selected={+item.status === 1}
                            key={item.id}
                            value={item.id}
                          >
                            {item.session}
                          </option>
                        </>
                      ))}
                    </select>
                  </div>
                  <div className="col-lg-6 offset-6 text-end">
                    <button
                      className="btn submit-btn-sm w-100"
                      onClick={() => {
                        changeActiveSessionHandler(selectedSession);
                      }}
                    >
                      Change Active Session
                    </button>
                  </div>
                </div>
              </div>

              {/* Session Listing */}

              <div className="col-lg-8 pt-2">
                <DataTable
                  columns={columns}
                  data={sessionData}
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
