import * as React from 'react';
import TodosList from "../../components/TodosList";
import AddTodo from "../../components/AddTodo";

const Todos: React.FC = () => {
    const todos = [['Practice Piano', 'Home', 'Low'], ['Call Jonathan', 'Work', 'High'], ['Call Jonathan', 'Work', 'High']];
    return (
        <React.Fragment>
            <TodosList todos={todos}/>
            <AddTodo/>
        </React.Fragment>
    )
}

export default Todos;