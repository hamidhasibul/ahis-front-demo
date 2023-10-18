import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { Timeline } from "primereact/timeline";

export const RequisitionTimelineComp = (update) => {
  // States
  const [requisition, setRequisition] = useState([]);
  const [requisitionDetails, setRequisitionDetails] = useState([]);

  // const [update, setUpdate] = useState([]);
  const params = useParams();
  const { id } = params;

  // Functions
  const getRequisitionListData = () => {
    const data = new FormData();
    data.append("requisition_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/getrequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setRequisition(res.message3);
        setRequisitionDetails(res.message[0]);
      })
      .catch((err) => console.log(err));
  };

  const customizedMarker = () => {
    return (
      <span
        className=" text-white rounded-circle custom-marker"
        style={{ backgroundColor: "#607D8B", height: "2rem", width: "2rem" }}
      >
        <i className="fa-solid fa-user"></i>
      </span>
    );
  };

  const customizedCard = (item) => {
    return (
      <>
        <div className="mb-4">
          <div className="mb-1 ">
            <h6 class="card-title font-12">{item.user.toUpperCase()}</h6>
          </div>
          <div class="card bg3 mb-1">
            <div class="card-body p-2">
              <div className="d-flex mb-1">
                <p className="rounded-pill font-10 approvedc">
                  {item.approve_status}
                </p>
              </div>

              <p className="card-text font-12">{item.note}</p>
            </div>
          </div>
          <div className="">
            <p className="m-0 font-11">
              {item.date.slice(0, 16).replace("T", " ")}
            </p>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    getRequisitionListData();
  }, [update]);

  return (
    <>
      <div className="mb-4 font-13 border p-2 rounded">
        <p>Requested by: {requisitionDetails.name}</p>
        <p>Designation: {requisitionDetails.designation}</p>
      </div>
      <Timeline
        value={requisition}
        className="custom-timeline"
        marker={customizedMarker}
        content={customizedCard}
      />
    </>
  );
};
