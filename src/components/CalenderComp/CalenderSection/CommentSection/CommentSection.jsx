import { InputTextarea } from "primereact/inputtextarea";
import React, { useContext, useState } from "react";
import { InputSwitch } from "primereact/inputswitch";
import axios from "axios";
import swal from "sweetalert";
import CommentsAPI from "../../Hooks/CommentsAPI";
import { UserConntext } from "../../Context/CalendarManagement/UserInfoProvider";

function CommentSection(props) {
  const { task_ID, host_UserName } = props;
  const { userInfo } = useContext(UserConntext);
  const userLoggedIn = userInfo[0]?.username;
  const [comments] = CommentsAPI(task_ID);
  // console.log(comments)
  const [commentText, setCommentText] = useState("");
  const handleCommentSend = () => {
    if (commentText.trim() !== "")
      axios
        .post(`${import.meta.env.VITE_SERVER}/comments`, {
          username: userLoggedIn,
          comment_Text: commentText,
          task_ID: task_ID,
        })
        .then((res) => {
          if (res.data) {
          } else {
            swal("Sorry!", "Some Error occure", "error");
          }
        });
    else console.log("Please write something");
  };

  const handleCommentActivity = (e) => {
    const check = e.target.value ? 1 : 0;
    fetch(`${import.meta.env.VITE_SERVER}/comments/${task_ID}/${check}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        // Handle the response or perform any necessary actions
        // console.log(response.data);
      })
      .catch((error) => {
        // Handle the error or display an error message
        console.error("Failed to change comment activity:", error);
      });
  };

  return (
    <div className="my-3 mb-0 todo">
      <div className="d-flex my-2">
        <p className="m-0 fs-14 fw-bold">Comments</p>
        {host_UserName === userLoggedIn ? (
          <InputSwitch
            className="ms-3"
            checked={Boolean(comments?.isComment)}
            onChange={(e) => handleCommentActivity(e)}
          />
        ) : (
          <></>
        )}
      </div>

      {comments.isComment ? (
        <div style={{ position: "relative" }}>
          <InputTextarea
            placeholder="Write comments here. . ."
            className="w-100 fs-13 py-1"
            autoResize
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={1}
          />
          <i
            className="pi pi-send "
            style={{
              fontSize: "1rem",
              position: "absolute",
              bottom: "12px",
              right: "10px",
              cursor: "pointer",
              color: "#13856a",
            }}
            onClick={handleCommentSend}
          />
        </div>
      ) : (
        <></>
      )}

      {/* Comment List  */}

      {comments.commentList?.map((comment) => (
        <div
          className="my-2 bg-light p-1 rounded px-2"
          key={comment.comment_ID}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <i
                className="pi pi-user fs-13"
                style={{
                  color: "#13856a",
                }}
              ></i>
              <span className="mx-2 fw-bold fs-13">{comment.username}</span>
            </div>
            <div>
              <small className="mx-2 fs-11">
                {new Date(comment.comment_Date).toLocaleString()}
              </small>
            </div>
          </div>
          <div className="mt-1">
            <p className="m-0 fs-12">{comment.comment_Text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentSection;
