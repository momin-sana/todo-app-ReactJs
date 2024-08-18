import React, { useState, useEffect } from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";


export default function Todo({ todo, toggleComplete, handleDelete, handleEdit, }) {
    const [isEditing, setIsEditing] = useState(false);
    const [newTitle, setNewTitle] = useState(todo.title);
    const [inputHeight, setInputHeight] = useState("auto");


    const handleChange = (e) => {
        e.preventDefault();
        if (todo.complete === true) {
            setNewTitle(todo.title);
        } else {
            todo.title = "";
            setNewTitle(e.target.value);
        }
        // Adjust the height of the input dynamically
        const input = e.target;
        input.style.height = "auto"; // Reset the height
        input.style.height = input.scrollHeight + "px"; // Set it to the scroll height
    };

    const handleEditClick = () => {
        setIsEditing(!isEditing);
        if (isEditing) {
            handleEdit(todo, newTitle);
        }
    };

    const getRows = () => {
        if (!isEditing) return 1; // Single row when not editing
        // Calculate number of rows based on text length
        const lineBreaks = (newTitle.match(/\n/g) || []).length + 1;
        const approxLines = Math.ceil(newTitle.length / 50); // Approximate lines based on width
        return Math.max(lineBreaks, approxLines); // Use the greater of the two
    };

    useEffect(() => {
        // Adjust the height of the input field based on its content
        const tempTextArea = document.createElement("textarea");
        tempTextArea.style.visibility = "hidden";
        tempTextArea.style.position = "absolute";
        tempTextArea.style.height = "auto";
        tempTextArea.value = newTitle;
        document.body.appendChild(tempTextArea);
        setInputHeight(`${tempTextArea.scrollHeight}px`);
        document.body.removeChild(tempTextArea);
    }, [newTitle]);

    return ( 
        <div className = "todo" >

            <button className = "button-complete" 
                onClick = {() => toggleComplete(todo) }>
                <CheckCircleIcon id = "i" 
                    style={{ marginRight: "10px" }}/>
            </button> 

            <textarea
                style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    backgroundColor: isEditing ? "#e0f7fa" : "white",
                    border: isEditing ? "1px solid #0288d1" : "none",
                    cursor: isEditing ? "text" : "default",
                    overflow: 'auto',
                    resize: 'none',
                    minHeight: '1.5em',
                    maxHeight: inputHeight, // Optional: Set a max height to avoid excessive expansion
                    width: '100%',
                }}
                type="text"
                value={newTitle}
                className="list"
                onChange={handleChange}
                disabled={!isEditing}
                autoComplete="off"
               rows={getRows()} // Set the number of rows dynamically
            />

            <div className="edit-delete-btn"> 
                <button className="button-edit" onClick={handleEditClick}>
                    <EditIcon id = "i" />
                </button> 
                <button className = "button-delete"
                    onClick = {() => handleDelete(todo.id) }>
                    <DeleteIcon id = "i" />
                </button> 
            </div> 
        </div>
    );
}