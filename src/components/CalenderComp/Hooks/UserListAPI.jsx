import { useEffect } from "react";
import { useState } from "react"

const UserListAPI = (userName) => {
    const [userDetails, setUserDetails] = useState([]);
    useEffect(() => {
        let url = '';
        if (userName)
            url = `${import.meta.env.VITE_SERVER}/users/${userName}`;
        else
            url = `${import.meta.env.VITE_SERVER}/users/`
        fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => setUserDetails(data));

    }, [userDetails, userName]);
    return [userDetails, setUserDetails];
}

export default UserListAPI;