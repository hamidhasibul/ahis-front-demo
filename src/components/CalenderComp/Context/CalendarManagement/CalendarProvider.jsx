import React, { createContext, useState } from 'react'

export const CalendarConntext = createContext();
const CalendarProvider = ({ children }) => {
    const [view, setView] = useState('month');
    const [date, setDate] = useState(new Date());
    const [selectedTaskType, setSelectedTaskType] = useState("All");
    const [selectedHost, setSelectedHost] = useState([]);

    return (
        <CalendarConntext.Provider value={{ view, setView, date, setDate, selectedTaskType, setSelectedTaskType, selectedHost, setSelectedHost }}>
            {children}
        </CalendarConntext.Provider>
    )
}

export default CalendarProvider