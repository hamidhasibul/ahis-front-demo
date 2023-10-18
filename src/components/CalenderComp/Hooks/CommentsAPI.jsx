import { useEffect, useState } from "react";

const CommentsAPI = (task_ID) => {
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/comments/${task_ID}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await response.json();
                setComments(data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [task_ID, comments]);

    return [comments, setComments];
};

export default CommentsAPI;
