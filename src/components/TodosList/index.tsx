import * as React from 'react';
import { Divider, List, Typography, Result, Skeleton, Button } from "antd";
import { FilterOutlined } from '@ant-design/icons';
import _ from 'lodash';

import { Category, Todo, TodoId, TodoPriorityEnum, TodoWithChildEntities } from "../../api";
import { isNotEmpty } from '../../utils/typeGuards';
import { useCategories } from '../../store/hooks/categories';
import TodoItem from "../TodoItem";
import FilterTodosModal from '../FilterTodosModal';
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
    const [filterModalVisibility, setFilterModalVisibility] = React.useState<boolean>(false);

    const [filterByCategories, setFilterByCategories] = React.useState<Category[]>([]);
    const [filterByPriorities, setFilterByPriorities] = React.useState<Array<TodoPriorityEnum | 'None'>>([]);


    const composedTodos: TodoWithChildEntities[] =
        todos
            .filter((todo) => {
                if (filterByCategories.length > 0) {
                    const commonCategories = filterByCategories.map(c => c.id).filter(id => todo.categoriesIds?.includes(id));
                    if (commonCategories.length > 0) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            })
            .filter((todo) => {
                if (filterByPriorities.length > 0) {
                    const priority = todo.priority || 'None';
                    if (filterByPriorities.includes(priority)) {
                        return true;
                    } else {
                        return false;
                    }
                } else {
                    return true;
                }
            })
            .map((todo) => {
                const todoWithCategories: TodoWithChildEntities = {
                    ...todo,
                    categories: categories.filter(category => todo.categoriesIds?.includes(category.id))
                };
                return todoWithCategories;
            });

    const todosCategories: Category[] = useCategories(_.uniq(_.flatten(todos.map(todo => todo.categoriesIds).filter(isNotEmpty))));


    const onFilterTodosModalCancel = (): void => {
        setFilterModalVisibility(false);
    };

    const onFilterTodosButtonClick = (): void => {
        setFilterModalVisibility(!filterModalVisibility);
    };

    const onFilterChangesOkClick = (priorities: Array<TodoPriorityEnum | 'None'>, categories: Category[]): void => {
        setFilterByPriorities(priorities);
        setFilterByCategories(categories);
        setFilterModalVisibility(false);
    };

    return (
        <div className={style.container}>
            <Typography.Title className={style.todosTitle}>{"Todos"}</Typography.Title>
            {
                !hasError ?
                    !isLoading ?
                        todos.length > 0 ?
                            <>
                                <div>
                                    <FilterTodosModal
                                        isVisible={filterModalVisibility}
                                        onCancel={onFilterTodosModalCancel}
                                        categories={todosCategories}
                                        selectedCategories={filterByCategories}
                                        selectedPriorities={filterByPriorities}
                                        onOk={onFilterChangesOkClick}
                                    />
                                    <div className={style.filterRow}>
                                        <Button onClick={onFilterTodosButtonClick} size="small" shape="circle" icon={<FilterOutlined />} />
                                    </div>
                                    <List
                                        className={style.todosList}
                                        locale={{ emptyText: 'All Todos Done.' }}
                                        dataSource={composedTodos.filter(todo => !todo.completed)}
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
                                </div>
                                {todos.filter(todo => todo.completed).length > 0 &&
                                    <>
                                        <Divider className={style.divider} />
                                        <List
                                            className={style.todosList}
                                            dataSource={composedTodos.filter(todo => !!todo.completed)}
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