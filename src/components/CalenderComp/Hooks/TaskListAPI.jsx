import { useEffect, useState } from "react";

const TaskListAPI = (userName, selectedTaskType, selectedHost) => {
    const [taskList, setTaskList] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_SERVER}/tasks/${userName}`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();
                // setTaskList(data);
                let filteredTasks = data;

                if (selectedTaskType !== "All") {

                    filteredTasks = filteredTasks.filter(
                        (task) => task.task_Type === selectedTaskType
                    );
                }

                if (selectedHost.length > 0) {
                    filteredTasks = filteredTasks.filter((task) =>
                        selectedHost.includes(task.host_UserName)
                    );
                }

                setTaskList(filteredTasks);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };

        fetchTasks();
    }, [userName, selectedTaskType, selectedHost, taskList]);

    return [taskList, setTaskList];
};

export default TaskListAPI;
