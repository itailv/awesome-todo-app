import * as React from 'react';
import { Checkbox, Tag, Typography, Modal } from "antd";

import { Category, TodoCompleted, TodoContent, TodoId, TodoPriorityEnum } from "../../api";
import CloseIcon from "../../icons/CloseIcon";
import style from './Todo.module.css';
import { ExclamationCircleOutlined } from '@ant-design/icons';


const TodoPriorityColors = new Map<TodoPriorityEnum, string>([
    [TodoPriorityEnum.LOW, 'blue'],
    [TodoPriorityEnum.MEDIUM, 'purple'],
    [TodoPriorityEnum.HIGH, 'red']
]);

interface TodoProps {
    id: TodoId;
    content: TodoContent;
    completed: TodoCompleted;
    priority?: TodoPriorityEnum;
    categories?: Category[];
    onToggleTodo: (id: TodoId) => Promise<void>;
    isToggleTodoLoading: boolean;
    onRemoveTodo: (id: TodoId) => Promise<void>;
    isRemoveTodoLoading: boolean;
}

const TodoItem: React.FC<TodoProps> = ({
    id, content, completed, priority, categories,
    onToggleTodo, isToggleTodoLoading,
    onRemoveTodo, isRemoveTodoLoading,
}) => {

    const onRemoveClick = (): void => {
        Modal.confirm({
            title: 'Delete this todo?',
            okText: 'Delete',
            okType: 'danger',
            cancelText: 'Cancel',
            style: { marginTop: 100 },
            onOk() {
                onRemoveTodo(id);
            },
        });
    };

    return (
        <div className={style.todoContainer} style={completed ? { opacity: "50%" } : {}}>
            <div className={style.titleRow}>
                <CloseIcon className={style.removeBtn} onClick={onRemoveClick} />
                <Typography.Text delete={completed} className={style.titleText}>{content}</Typography.Text>
                <div className={style.checkbox}>
                    <Checkbox disabled={isToggleTodoLoading || isRemoveTodoLoading} checked={completed} onClick={() => onToggleTodo(id)} />
                </div>
            </div>

            {categories &&
                <div className={style.categoriesRow}>
                    {categories.map((category, i) =>
                        <Typography.Text key={category.id} disabled={completed} className={style.categoryText}>
                            {i + 1 == categories.length ? category.content : `${category.content},`}
                        </Typography.Text>
                    )}
                </div>}

            {priority &&
                <div className={style.priorityRow}>
                    <Tag color={TodoPriorityColors.get(priority)}>{priority}</Tag>
                </div>}
        </div>
    );
};

export default TodoItem;