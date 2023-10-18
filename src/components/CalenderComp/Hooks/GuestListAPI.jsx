import { useEffect, useState } from "react";

const GuestListAPI = (task_ID) => {
    const [guestList, setGuestList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/guests/${task_ID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setGuestList(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [task_ID, guestList]);

    return [guestList, setGuestList];
};

export default GuestListAPI;
