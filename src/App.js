import "./TodoApp.css";
import React, { useEffect, useState } from "react";
import Title from "./component/Title";
import AddTodo from "./component/AddTodo";
import Todo from "./component/Todo";
import {
    collection,
    query,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
} from "firebase/firestore";
import { db } from "./component/Firebase/firebase";

function App() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const q = query(collection(db, "todos"));
        const unsub = onSnapshot(q, (querySnapshot) => {
            let todosArray = [];
            querySnapshot.forEach((doc) => {
                todosArray.push({...doc.data(), id: doc.id });
            });
            setTodos(todosArray);
        });
        return () => unsub();
    }, []);

    const handleEdit = async(todo, title) => {
        await updateDoc(doc(db, "todos", todo.id), { title: title });
    };
    const toggleComplete = async(todo) => {
        await updateDoc(doc(db, "todos", todo.id), { completed: !todo.completed });
    };
    const handleDelete = async(id) => {
        await deleteDoc(doc(db, "todos", id));
    };
    return ( <
        div className = "App" >
        <
        div >
        <
        Title / >
        <
        /div> <
        div >
        <
        AddTodo / >
        <
        /div> <
        div className = "todo_container" >

        {
            todos.map((todo) => ( <
                Todo key = { todo.id }
                todo = { todo }
                toggleComplete = { toggleComplete }
                handleDelete = { handleDelete }
                handleEdit = { handleEdit }
                />
            ))
        } <
        /div> <
        /div>
    );
}
export default App;


// import React, { useState, useEffect } from "react";
// import "./App.css";
// import TodoList from "./component/TodoList/TodoList";
// import db from "./component/Firebase/firebase";
// import { addDoc, collection, getDocs } from "firebase/firestore/lite";

// function App() {
//     const [todos, setTodos] = useState([]); //todo is variable, setTodos is a function which store values in "todos". "useState is a reacthook" which help us to enable the functions. here [] means we are going to use array in it,
//     const [newTodo, setNewTodo] = useState(""); // for "ADD" functionality. here "" means we are going to use string in it.

//     //to call collection from firestore
//     const todoData = collection(db, "todos"); //"collection function has 2 parameters : 1st the path where collection is stored and 2nd the name of collection"
//     useEffect(() => {
//         async function fetchData() { //async means, run 2 things together, mean if the system is read first function, meanwhile it understands and runs that, on-other-hand the system will also start reading the next lineafter that function
//             const todoSnapshot = await getDocs(todoData); // await is a function  which means finsih this line first, once task is complete then move ahead.
//             // console.log(todoSnapshot);
//             const todoList = todoSnapshot.docs.map((doc) => [doc.data(), doc.id]); //making and running a loop to get all specific info/data/document from firestore. //"map is a function and kind of loop"
//             setTodos(todoList);
//             console.log(todoList);
//         }
//         fetchData();
//     }, []); // this empty parameters [] means the above function will run once only when an app is loaded

//     //this is for "ADD FUNCTION"
//     //adding document in firebase
//     const onTodoSubmit = async(newTodo) => {
//         await addDoc(todoData, { todo: newTodo } //"todoData"=>defining collection where the updated data should add. "{todo: newTodo}" this is defining specificity about where and what exactly values should be saved, so, in collection we want to save the "newTodo value" in "todo variable"
//         ).then(() => { //.then is a function, when document is added then use ".then" without this the list will not be updated in our app, although is will be send onto firebase. so to update our list we will use this function.
//             setTodos([
//                 ...todos, //to save all old and new values of an existing array. here,"..." define old values and, "," defines new value.
//                 [{
//                         todo: newTodo, // this portion is going to update the list with new object.
//                     },
//                     "knscwdascsc", //
//                 ],
//             ]);
//             key: Date.now();
//             setNewTodo("");
//         });
//     };

//     return ( <
//             div className = "App" >
//             <
//             div className = "container" >
//             <
//             h1 > Todo App < /h1>    <
//             div style = {
//                 { marginBottom: "1.4em" }
//             } >

//             <
//             input
//             //this is for "ADD FUNCTION"
//             //onclick button we wanna save the inputed values into firebase
//             value = { newTodo } //to empty the input box,once clicked on add button
//             onChange = { //it's a function,
//                 (data) => { // input mein jo bhi value aayegi us ko "setNewTodo" mein dal dya
//                     setNewTodo(data.target.value); //Now, as input is a function and gets us many data. what we want is the specfic value stored in target, that will be the exact input typed-in by the user
//                     console.log(data);
//                 }
//             }
//             placeholder = "Type Your Todo"
//             className = "inputStyle" /
//             >

//             <
//             button onClick = {
//                 () => { // this is for "ADD FUNCTION"
//                     onTodoSubmit(newTodo);
//                 }
//             }
//             className = "buttonStyle" >
//             Add <
//             /button>   <
//             /div>

//             <
//             div style = {
//                 {
//                     overflow: "auto",
//                     marginInline: "50px",
//                     height: "70%",
//                     borderRadius: "18px",
//                     marginTop: "10px",

//                 }
//             } > { //to bring values in return, running a condition where; if " todos" is available, then run this loop --> todos.map((value) =>(<TodoList text = {value[0].todo} id = {value[1]}/>)) .
//                 todos && todos.map((value) =>
//                     ( < TodoList text = { value[0].todo }
//                         id = { value[1] }
//                         />))
//                     } <
//                     /div> <
//                     /div>    <
//                     /div>
//                 );
//             }

//             export default App;