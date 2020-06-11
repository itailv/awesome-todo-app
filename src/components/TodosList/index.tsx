import * as React from 'react';
import {Divider, List, Typography} from "antd";
import style from './TodosList.module.css';
import Todo from "../../components/Todo";

interface TodosListProps {
    todos: any[];
}

const TodosList: React.FC<TodosListProps> = ({todos}) => {
    return (
        <div className={style.container}>
            <Typography.Title className={style.todosTitle}>Todos</Typography.Title>
            <List
                className={style.todosList}
                dataSource={todos}
                renderItem={item => <div className={style.todoContainer}><Todo content={item[0]} category={item[1]} priority={item[2]}/></div>}
            />
            <Divider className={style.divider}/>
            <List
                className={style.todosList}
                dataSource={todos.slice(0,1)}
                renderItem={item => <div className={style.todoContainer}><Todo completed content={item[0]} category={item[1]} priority={item[2]}/></div>}
            />
        </div>
    )
}

export default TodosList;