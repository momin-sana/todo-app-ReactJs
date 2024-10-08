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
                 // Sort todosArray by the createdAt timestamp, with the newest first
            todosArray.sort((a, b) => {
                if (a.createdAt && b.createdAt) {
                    return b.createdAt.seconds - a.createdAt.seconds;
                } else {
                    return 0; // Keep the original order if createdAt is missing
                }
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

    return (
        <div className = "App" >
            <div >
            <Title />
            </div> 
            <div className = "todo_container" > 
                <AddTodo />
                {todos.map((todo)=>(
                    <Todo key = {todo.id}
                    todo={todo}
                    toggleComplete={toggleComplete}
                    handleDelete={handleDelete}
                    handleEdit={handleEdit}
                    />
                ))}
            </div> 
        </div>
    );
}
export default App;