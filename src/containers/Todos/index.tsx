import * as React from 'react';
import { message } from 'antd';
import { useDispatch } from 'react-redux';

import { CategoryCreationProps, TodoCreationProps, TodoId } from '../../api';
import TodosList from "../../components/TodosList";
import AddTodo from "../../components/AddTodo";
import { useTodos } from '../../store/hooks/todos';
import { useCategories } from '../../store/hooks/categories';
import { addCategory as addCategoryAction, fetchCategories as fetchCategoriesAction } from '../../store/actions/categories';
import { addTodo as addTodoAction, fetchTodos as fetchTodosAction, toggleTodo as toggleTodoAction, removeTodo as removeTodoAction } from '../../store/actions/todos';


const Todos: React.FC = () => {
    const dispatch = useDispatch();

    // Todos
    const todos = useTodos();
    const [isTodosLoading, setIsTodosLoading] = React.useState<boolean>(true);
    const [isTodosFetchFailed, setIsTodosFetchFailed] = React.useState<boolean>(false);
    const fetchTodos = async (): Promise<void> => {
        try {
            setIsTodosLoading(true);
            await dispatch(fetchTodosAction());
            setIsTodosLoading(false);
            setIsTodosFetchFailed(false);
        } catch (error) {
            setIsTodosFetchFailed(true);
            setIsTodosLoading(false);
        }
    };

    // Toggle Todo
    const [isToggleTodoLoading, setIsToggleTodoLoading] = React.useState<boolean>(false);
    const toggleTodo = async (id: TodoId): Promise<void> => {
        try {
            setIsToggleTodoLoading(true);
            await dispatch(toggleTodoAction(id));
            setIsToggleTodoLoading(false);
        } catch (error) {
            message.error({ content: 'An error occurred' });
        }
    };

    // Remove Todo 
    const [isRemoveTodoLoading, setIsRemoveTodoLoading] = React.useState<boolean>(false);
    const removeTodo = async (id: TodoId): Promise<void> => {
        try {
            setIsRemoveTodoLoading(true);
            await dispatch(removeTodoAction(id));
            setIsRemoveTodoLoading(false);
        } catch (error) {
            message.error({ content: 'An error occurred' });
        }
    };

    // Add Todos
    const [isAddTodoLoading, setIsAddTodoLoading] = React.useState<boolean>(false);
    const addTodo = async (todo: TodoCreationProps): Promise<void> => {
        try {
            setIsAddTodoLoading(true);
            await dispatch(addTodoAction(todo));
            setIsAddTodoLoading(false);
            message.success('Added todo', 1);
        } catch (error) {
            message.error({ message: 'Failed to add todo' });
            setIsAddTodoLoading(false);
        }
    };

    // Categories
    const categories = useCategories();
    const [isCategoriesLoading, setIsCategoriesLoading] = React.useState<boolean>(true);
    const [isCategoriesFetchFailed, setIsCategoriesFetchFailed] = React.useState<boolean>(false);
    const fetchCategories = async (): Promise<void> => {
        try {
            setIsCategoriesLoading(true);
            await dispatch(fetchCategoriesAction());
            setIsCategoriesLoading(false);
            setIsCategoriesFetchFailed(false);
        } catch (error) {
            setIsCategoriesFetchFailed(true);
            setIsCategoriesLoading(false);
        }
    };

    // Add Category
    const [isAddCategoryLoading, setIsAddCategoryLoading] = React.useState<boolean>(false);
    const addCategory = async (category: CategoryCreationProps): Promise<void> => {
        try {
            setIsAddCategoryLoading(true);
            await dispatch(addCategoryAction(category));
            setIsAddCategoryLoading(false);
        } catch (error) {
            message.error({ message: 'Failed to add category' });
            setIsAddCategoryLoading(false);
        }
    };

    React.useEffect(() => {
        fetchTodos();
        fetchCategories();
    }, []);

    return (
        <React.Fragment>
            <TodosList
                isLoading={isTodosLoading || isCategoriesLoading}
                todos={todos}
                categories={categories}
                hasError={isTodosFetchFailed || isCategoriesFetchFailed}
                isRemoveTodoLoading={isRemoveTodoLoading}
                isToggleTodoLoading={isToggleTodoLoading}
                onRemoveTodo={removeTodo}
                onToggleTodo={toggleTodo}
            />
            {!(isTodosFetchFailed || isCategoriesFetchFailed) &&
                <AddTodo
                    disabled={isTodosLoading}
                    isLoading={isCategoriesLoading}
                    allCategories={categories}
                    onAddCategory={addCategory}
                    isAddCategoryLoading={isAddCategoryLoading}
                    onAddTodo={addTodo}
                    isAddTodoLoading={isAddTodoLoading}
                />
            }
        </React.Fragment>
    );
};

export default Todos;