import React from 'react'
import "./todoList.css"
import db from "../Firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore/lite"; //doc, deleteDoc for delete function

const TodoList = ({ text, id }) => {
    //delete function
    const delTodo = async() => { //async function parallel kaam krta hai 
        await deleteDoc(doc(db, "todos", id)) // here "todos" is a collection where i want to delete anything that is stored in "id" at firebase/firestore
            .then(() => {
                // alert('Your file has Successfully Deleted')
                window.location.reload();
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
        button onClick = { delTodo } //calling delete function 
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
        i className = "far fa-edit" > < /i>  <
        /button>  <
        /div>  <
        /div>
    );
};


export default TodoList;