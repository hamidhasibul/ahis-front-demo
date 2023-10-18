import { useEffect } from "react";
import { useState } from "react"

const NoteListAPI = (userName, selectedNoteType, selectedHost) => {
    const [myNotes, setMyNotes] = useState([]);
    useEffect(() => {
        fetch(`${import.meta.env.VITE_SERVER}/stickynotes/${userName}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(res => res.json())
            .then(data => {
                let filteredNote = data;

                if (selectedNoteType !== "All") {

                    filteredNote = filteredNote.filter(
                        (note) => note.note_Type === selectedNoteType
                    );
                }

                if (selectedHost.length > 0) {
                    filteredNote = filteredNote.filter((note) =>
                        selectedHost.includes(note.host_UserName)
                    );
                }

                setMyNotes(filteredNote);
            });

    }, [userName, selectedNoteType, selectedHost, myNotes]);
    return [myNotes];
}

export default NoteListAPI;