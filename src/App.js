import React, { useState, useEffect } from "react";
import "./App.css";
import TodoList from "./component/TodoList/TodoList";
import db from "./component/Firebase/firebase";
import { addDoc, collection, getDocs } from "firebase/firestore/lite";

function App() {
    const [todos, setTodos] = useState([]); //todo is variable, setTodos is a function which store values in "todos". "useState is a reacthook" which help us to enable the functions
    const [newTodo, setNewTodo] = useState("");

    //to call collection from firestore
    const todoData = collection(db, "todos"); //"collection function has 2 parameters : 1st the path where collection is stored and 2nd the name of collection"
    useEffect(() => {
        async function fetchData() {
            const todoSnapshot = await getDocs(todoData); // await is a function  which means finsih this line then move ahead.
            const todoList = todoSnapshot.docs.map((doc) => [doc.data(), doc.id]); //making and running a loop to get all specific info/data/document from firestore. //"map is a function" 
            setTodos(todoList);
            console.log(todoList);
        }
        fetchData();
    }, []);


    //this is for "ADD FUNCTION"
    //adding document in firebase
    const onTodoSubmit = async(newTodo) => {
        await addDoc(todoData, { todo: newTodo, }).then(() => { //.then is a function, when document is added then use ".then" without this the list will not be updated in our app, although is will be send onto firebase. so to update our list we will use this function.
            setTodos([
                ...todos, //to save all old and new values of an existing array. here,"..." define old values and, "," defines new value.
                [{
                        todo: newTodo, // this portion is going to update the list with new object.
                    },
                    "knscwdascsc", //
                ],
            ]);
            setNewTodo("");
        });
    };

    return ( <
            div className = "App" >
            <
            div className = "container" >
            <
            h1 > Todo App < /h1>    <
            div style = {
                { marginBottom: "1.4em" }
            } >

            <
            input
            //this is for "ADD FUNCTION"
            //onclick button we wanna save the inputed values into firebase 
            value = { newTodo } //to empty the input box,once clicked on add button
            onChange = { //it's a function,
                (data) => { // input mein jo bhi value aayegi us ko "setNewTodo" mein dal dya
                    setNewTodo(data.target.value); //Now, as input is a function and gets us many data. what we want is the specfic value stored in target, that will be the exact input typed-in by the user
                    console.log(data);
                }
            }
            placeholder = "Type Your Todo"
            className = "inputStyle" /
            >

            <
            button onClick = {
                () => { // this is for "ADD FUNCTION"
                    onTodoSubmit(newTodo);
                }
            }
            className = "buttonStyle" >
            Add <
            /button>   <
            /div> 

            <
            div style = {
                {
                    overflow: "hidden",
                    marginInline: "50px",
                    height: "70%",
                    borderRadius: "18px",
                    marginTop: "10px",
                }
            } > { //to bring values in return, running a condition where; if " todos" is available, then run this loop --> todos.map((value) =>(<TodoList text = {value[0].todo} id = {value[1]}/>)) . 
                todos && todos.map((value) =>
                    ( < TodoList text = { value[0].todo }
                        id = { value[1] }
                        />))
                    } <
                    /div> <
                    /div>    <
                    /div>
                );
            }

            export default App;