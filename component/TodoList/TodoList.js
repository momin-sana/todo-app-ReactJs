import React from 'react'
import "./todoList.css"
import db from "../Firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore/lite";

const TodoList = ({ text, id }) => {
    const delTodo = async() => {
        await deleteDoc(doc(db, "todos", id)).then(() => {
            alert('Your file has Successfully Deleted')
            window.location.reloaded();
        });
    }
    return ( <
        div className = "todoListStyle" >
        <
        p style = {
            { marginTop: "7px" }
        } > { text } <
        /p> 

        <
        div className = "features" >
        <
        button onClick = { delTodo }
        className = "featureStyle"
        style = {
            { marginRight: "5.5px" }
        } >
        <
        i className = "far fa-trash-alt" > < /i>  <
        /button>  <
        button className = "featureStyle"
        style = {
            { marginLeft: "2.5px", backgroundColor: "darkkhaki" }
        } >
        <
        i class = "far fa-edit" > < /i>  <
        /button>  <
        /div>  <
        /div>
    );
};


export default TodoList;