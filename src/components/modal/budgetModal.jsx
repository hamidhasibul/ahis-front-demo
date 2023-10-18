import React, { useState, useEffect } from "react";

export const budgetModal = ({ id, info, setUpdate, update }) => {
  const sendprincipal = () => {
    const data = new FormData();
    data.append("po_id", id);
    fetch(`${import.meta.env.VITE_SERVER}/UpdateApprovelforPrincipal`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setUpdate(update + 1);
      })
      .catch((err) => console.log(err));
  };
  return (
    <>
      <button
        type="button"
        class="btn btn-sm btn-success"
        id="yesnomodal"
        data-bs-toggle="modal"
        data-bs-target="#staticBackdrop"
        style={{ display: "none" }}
      >
        btn
      </button>
      <div
        class="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="staticBackdropLabel">
                Are You Sure
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              {/* {info == "Requisition" && (
                <>
                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={sendprincipal}
                  >
                    Yes
                  </button>
                </>
              )} */}
              {info == "po" && (
                <>
                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={sendprincipal}
                  >
                    Yes
                  </button>
                </>
              )}

              <button
                class="btn submit-btn mt-2 mx-2"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                No
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
