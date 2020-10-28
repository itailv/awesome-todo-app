import * as React from 'react';
import { Divider, List, Typography, Result, Skeleton } from "antd";

import { Category, Todo, TodoId, TodoWithChildEntities } from "../../api";
import TodoItem from "../TodoItem";
import style from './TodosList.module.css';


interface TodosListProps {
    todos: Todo[];
    categories: Category[];
    isLoading: boolean;
    hasError: boolean;
    onToggleTodo: (id: TodoId) => Promise<void>;
    isToggleTodoLoading: boolean;
    onRemoveTodo: (id: TodoId) => Promise<void>;
    isRemoveTodoLoading: boolean;
}

const TodosList: React.FC<TodosListProps> = ({
    todos, categories, isLoading, hasError, onToggleTodo, isToggleTodoLoading, onRemoveTodo, isRemoveTodoLoading
}) => {

    const todosWithCategories: TodoWithChildEntities[] = todos.map((todo) => {
        const todoWithCategories: TodoWithChildEntities = {
            ...todo,
            categories: categories.filter(category => todo.categoriesIds?.includes(category.id))
        };
        return todoWithCategories;
    });

    return (
        <div className={style.container}>
            <Typography.Title className={style.todosTitle}>{"Todos"}</Typography.Title>
            {
                !hasError ?
                    !isLoading ?
                        todos.length > 0 ?
                            <>
                                <List
                                    className={style.todosList}
                                    locale={{ emptyText: 'All Todos Done.' }}
                                    dataSource={todosWithCategories.filter(todo => !todo.completed)}
                                    renderItem={(todo): JSX.Element => <div className={style.todoContainer}>
                                        <TodoItem
                                            onToggleTodo={onToggleTodo}
                                            onRemoveTodo={onRemoveTodo}
                                            isToggleTodoLoading={isToggleTodoLoading}
                                            isRemoveTodoLoading={isRemoveTodoLoading}
                                            {...todo}
                                        />
                                    </div>}
                                />
                                {todos.filter(todo => todo.completed).length > 0 &&
                                    <>
                                        <Divider className={style.divider} />
                                        <List
                                            className={style.todosList}
                                            dataSource={todosWithCategories.filter(todo => !!todo.completed)}
                                            renderItem={(todo): JSX.Element => <div className={style.todoContainer}>
                                                <TodoItem
                                                    onToggleTodo={onToggleTodo}
                                                    onRemoveTodo={onRemoveTodo}
                                                    isToggleTodoLoading={isToggleTodoLoading}
                                                    isRemoveTodoLoading={isRemoveTodoLoading}
                                                    {...todo}
                                                />
                                            </div>}
                                        />
                                    </>
                                }
                            </>
                            :
                            <Result
                                status="404"
                                subTitle="Todos you add will appear here"
                            />
                        :
                        <>
                            <Skeleton />
                            <Skeleton />
                            <Skeleton />
                        </>
                    :
                    <Result
                        status="500"
                        subTitle="Sorry, something went wrong."
                    />
            }
        </div>
    );
};

export default TodosList;