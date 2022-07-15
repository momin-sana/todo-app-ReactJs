import React, { useState } from "react";
import "./todoList.css";
import db from "../Firebase/firebase";
import { doc, deleteDoc, updateDoc } from "firebase/firestore/lite"; //doc, deleteDoc for delete function

const TodoList = ({ text, id }) => {
    const [showEdit, setShowEdit] = useState(false); //importing "usestate" to run onclick function on "Edit Button"
    //delete function
    const [editTodo, setEditTodo] = useState(text);

    const delTodo = async() => {
        //async function parallel kaam krta hai
        await deleteDoc(doc(db, "todos", id)) // here "todos" is a collection where i want to delete anything that is stored in "id" at firebase/firestore
            .then(() => {
                // alert('Your file has Successfully Deleted')
                window.location.reload();
            });
    };

    //For Updating Editing or changes made in todo list
    const editTodoFunction = async() => {
        await updateDoc(doc(db, "todos", id), {
            todo: editTodo,
        }).then(() => {
            // alert('Your Edit has been Successfully Updated')
            window.location.reload();
        });
    };

    return ( <
        >
        <
        div className = "todoListStyle" >
        <
        div style = {
            { display: "flex", justifyContent: "space-between" } } >
        <
        p style = {
            { marginTop: "7px" } } > { text } < /p>{" "} <
        div className = "features" >
        <
        button onClick = { delTodo } //calling delete function
        className = "featureStyle"
        style = {
            { marginRight: "5.5px" } } >
        <
        i className = "far fa-trash-alt" > < /i>{" "} <
        /button>{" "} <
        button onClick = {
            () => {
                // onclicking this button our input will be shown
                setShowEdit(!showEdit); // this command is according to previous situation. for suppose on clicking the "edit" button the "input box" is visible, clicking again on the button the box will disapear.
                setEditTodo(text);
            }
        }
        className = "featureStyle"
        style = {
            { marginLeft: "2.5px", backgroundColor: "darkkhaki" } } >
        <
        i className = "far fa-edit" > < /i>{" "} <
        /button>{" "} <
        /div>{" "} <
        /div>{" "} {
            showEdit && ( //running a function to  make input box appear upon clicking the edit button
                <
                div className = "inputBtn" >
                <
                input className = "inputBox"
                value = { editTodo }
                onChange = {
                    ({ target }) => {
                        setEditTodo(target.value);
                    }
                }
                placeholder = "Enter your Todo" /
                >
                <
                button onClick = { editTodoFunction } > Edit < /button>{" "} <
                /div>
            )
        } { " " } <
        /div>{" "} <
        />
    );
};

export default TodoList;