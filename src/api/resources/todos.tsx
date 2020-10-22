import { v4 as uuid } from 'uuid';

import { CategoryId, sleep, Category } from "../";


export type TodoId = string;
export type TodoContent = string;
export type TodoCompleted = boolean;
export enum TodoPriorityEnum {
    LOW = 'Low',
    MEDIUM = 'Medium',
    HIGH = 'High',
}
export interface Todo {
    id: TodoId;
    content: TodoContent;
    completed: TodoCompleted;
    priority?: TodoPriorityEnum;
    categoriesIds?: CategoryId[];
}
export interface TodoCreationProps {
    content: TodoContent;
    priority?: TodoPriorityEnum;
    categoriesIds?: CategoryId[];
}
export type TodoEditableProps = Partial<TodoCreationProps> & { completed: TodoCompleted };
export type TodoWithChildEntities = Todo & { categories?: Category[] };


export async function fetchTodos(ids?: TodoId[]): Promise<Todo[]> {
    await sleep(200);

    return [];
}

export async function addTodo(todo: TodoCreationProps): Promise<TodoId> {
    await sleep(200);

    return uuid();
}

export async function toggleTodo(id: TodoId): Promise<void> {
    await sleep(200);
}

export async function removeTodo(id: TodoId): Promise<void> {
    await sleep(200);
}

export async function updateTodo(id: TodoId, changes: TodoEditableProps): Promise<void> {
    await sleep(200);
}

