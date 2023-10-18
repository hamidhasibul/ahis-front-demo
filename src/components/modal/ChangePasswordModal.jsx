import React from "react";
import { useState } from "react";

export const ChangePassword = (props) => {
  const { activeID } = props;

  const [newPass, setNewPass] = useState("");
  const [renewPass, setRenewPass] = useState("");

  const changePassword = async () => {
    if (newPass !== renewPass) {
      console.log("Passwords do not match");
      return false;
    } else if (newPass.length < 4 || renewPass.length < 4) {
      console.log("Password length can't be less than 4 digits");
      return false;
    }

    const data = new FormData();
    data.append("id", activeID);
    data.append("pass", newPass);

    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER}/`, {
        method: "POST",
        body: data,
      });

      const res = await response.json();
      console.log(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div
        class="modal fade"
        id="changePassModal"
        tabindex="-1"
        aria-labelledby="changePassModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="changePassModalLabel">
                Modal title
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">New Password</label>
                    <input
                      className="form-control input1"
                      type="password"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setNewPass(e.target.value);
                      }}
                    />
                  </div>
                  <div className="col-lg-12 mb-2">
                    <label className="form-label label1">
                      Re-type New Password
                    </label>
                    <input
                      className="form-control input1"
                      type="password"
                      placeholder=""
                      aria-label="form-control example"
                      onChange={(e) => {
                        setRenewPass(e.target.value);
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={changePassword}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
