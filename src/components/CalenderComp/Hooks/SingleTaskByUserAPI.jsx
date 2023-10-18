import { useEffect } from "react";
import { useState } from "react"

const SingleTaskByUserAPI = (taskID, userName) => {
    const [singleTaskByUser, setSingleTaskByUser] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/singletask/${taskID}/${userName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setSingleTaskByUser(data));

    }, [taskID, userName, singleTaskByUser]);
    return [singleTaskByUser];
}

export default SingleTaskByUserAPI;