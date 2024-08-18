import React, { useState } from "react";
import { db } from "./Firebase/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTodo() {
    // const classes = themes();
    const [title, setTitle] = useState("");
    const [placeholder, setPlaceholder] = useState("Enter todo..."); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title === "") {
            setPlaceholder("Task can't be empty"); 
            return;
        }

        await addDoc(
            collection(db, "todos"), {
            title,
            completed: false,
            createdAt: serverTimestamp()
        });
        setTitle("");
        setPlaceholder("Enter todo...");
    };
    const handleInputChange = (e) => {
        setTitle(e.target.value);
        if (placeholder !== "Enter todo...") {
            setPlaceholder("Enter todo..."); 
        }
    };
    return (
        <form onSubmit={handleSubmit}>

            <div className="input_container">
                <input type="text"
                    placeholder={placeholder}
                    value={title}
                    style={{ borderColor: placeholder === "Task can't be empty" ? 'red' : 'initial' }}                     
                    onChange={handleInputChange}
                /> 
            </div> 
        
            <div className="btn_container" >
                <button > Add </button> 
            </div>
         
        </form>
    );
}