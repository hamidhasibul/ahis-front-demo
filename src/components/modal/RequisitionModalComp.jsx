import React, { useState, useEffect } from "react";

export const RequisitionModalComp = ({
  delitem,
  dltinfo,
  update,
  setUpdate,
  sl,
}) => {
  function delitembtn() {
    const data = new FormData();
    data.append("id", delitem);
    fetch(`${import.meta.env.VITE_SERVER}/DeleteRequisionItemById`, {
      method: "POST",
      body: data,
    })
      .then((res) => res.json())
      .then((res) => {
        setUpdate(update + 1);
        setSl(sl - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  }
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
              {dltinfo == "item" && (
                <>
                  <button
                    class="btn submit-btn mt-2"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    onClick={delitembtn}
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
