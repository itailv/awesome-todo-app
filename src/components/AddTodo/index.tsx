import * as React from 'react';
import { useState } from 'react';
import { Button, Divider, Input, Select, Slider, Typography } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons/lib";
import QueueAnim from 'rc-queue-anim';

import { Category, CategoryContent, CategoryCreationProps, CategoryId, TodoContent, TodoCreationProps, TodoPriorityEnum } from "../../api";
import style from './AddTodo.module.css';


interface AddTodoProps {
    allCategories: Category[];
    isLoading: boolean;
    disabled: boolean;
    onAddCategory: (category: CategoryCreationProps) => Promise<void>;
    isAddCategoryLoading: boolean;
    onAddTodo: (todo: TodoCreationProps) => Promise<void>;
    isAddTodoLoading: boolean;
}
const AddTodo: React.FC<AddTodoProps> = ({ allCategories, isLoading, onAddCategory, isAddCategoryLoading, onAddTodo, isAddTodoLoading, disabled }) => {
    const [modalVisibility, setModalVisibility] = useState(false);
    const toggleModalVisible = (): void => {
        document.body.style.overflow = modalVisibility ? 'unset' : 'hidden';
        setModalVisibility(!modalVisibility);
    };

    const [content, setContent] = useState<TodoContent>();
    const onContentInputChange = (e: React.FormEvent<HTMLInputElement>): void => setContent(e.currentTarget.value);

    const [priority, setPriority] = useState<TodoPriorityEnum | null>(TodoPriorityEnum.LOW);
    const PriorityToSliderValueMap = new Map<TodoPriorityEnum, number>([
        [TodoPriorityEnum.LOW, 1], [TodoPriorityEnum.MEDIUM, 2], [TodoPriorityEnum.HIGH, 3],
    ]);
    const onPrioritySliderChange = (value: number): void => {
        const SliderValueToPriorityMap = new Map<number, TodoPriorityEnum>([
            [1, TodoPriorityEnum.LOW], [2, TodoPriorityEnum.MEDIUM], [3, TodoPriorityEnum.HIGH],
        ]);
        setPriority(SliderValueToPriorityMap.get(value) || null);
    };

    const [categories, setCategories] = useState<Category[]>([]);
    const onCategoriesSelectChange = (categoriesIds: CategoryId[]): void => setCategories(
        allCategories.filter(category => categoriesIds.includes(category.id))
    );

    const [addCategoryInput, setAddCategoryInput] = useState<CategoryContent>();
    const onAddCategoryInputChange = (e: React.FormEvent<HTMLInputElement>): void => setAddCategoryInput(e.currentTarget.value);
    const onAddCategoryClick = (): void => {
        if (!!addCategoryInput) {
            onAddCategory({ content: addCategoryInput });
        }
    };

    const onAddTodoClick = async (): Promise<void> => {
        if (content) {
            await onAddTodo({ content, priority: priority || undefined, categoriesIds: categories.map(c => c.id) });
            setModalVisibility(false);
            setContent(undefined);
            setCategories([]);
            setPriority(TodoPriorityEnum.LOW);
        }
    };

    const doFormFieldsValidate = (): boolean => content !== undefined && content !== '';

    const InputGroup = (title: string, inputItem: JSX.Element): JSX.Element =>
        <div className={style.inputGroup}>
            <Typography.Text className={style.inputTitle}>{title}</Typography.Text>
            {inputItem}
        </div>;

    return (
        <React.Fragment>
            <QueueAnim type='bottom'>
                {modalVisibility &&
                    <div className={style.modalContainer} key="modal">
                        <div>
                            <div className={style.modalHeader}>
                                <Typography.Title className={style.addTodoTitle}>{"Add Todo"}</Typography.Title>
                                <Button
                                    className={style.closeModalButton}
                                    icon={<CloseOutlined />}
                                    shape="circle"
                                    onClick={toggleModalVisible}
                                />
                            </div>

                            <div className={style.modalBody}>
                                {InputGroup(
                                    'To-do',
                                    <Input
                                        size="large"
                                        placeholder="What needs to be done?"
                                        value={content}
                                        onChange={onContentInputChange}
                                    />
                                )}

                                {InputGroup(
                                    'Categories',
                                    <Select
                                        loading={isLoading}
                                        size="large"
                                        placeholder={"Choose Categories"}
                                        mode="multiple"
                                        allowClear
                                        value={categories.map(category => category.id)}
                                        onChange={onCategoriesSelectChange}
                                        dropdownRender={(menu: JSX.Element): JSX.Element => (
                                            <div>
                                                {menu}
                                                <Divider className={style.divider} />
                                                <div className={style.addTodoCategoryContainer}>
                                                    <Input
                                                        className={style.addTodoCategoryInput}
                                                        value={addCategoryInput}
                                                        onChange={onAddCategoryInputChange}
                                                    />
                                                    <Button
                                                        loading={isAddCategoryLoading}
                                                        className={style.addTodoCategoryButton}
                                                        icon={<PlusOutlined />}
                                                        disabled={allCategories.map(c => c.content).includes(addCategoryInput || '') || !addCategoryInput}
                                                        onClick={onAddCategoryClick}
                                                    >
                                                        {"Add Category"}
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    >
                                        {
                                            allCategories.map(category =>
                                                <Select.Option key={category.id} value={category.id}>{category.content}</Select.Option>)
                                        }
                                    </Select>
                                )}

                                {InputGroup(
                                    'Priority',
                                    <Slider
                                        marks={{ 0: 'None', 1: TodoPriorityEnum.LOW, 2: TodoPriorityEnum.MEDIUM, 3: TodoPriorityEnum.HIGH }}
                                        max={3}
                                        tooltipVisible={false}
                                        value={priority !== null ? PriorityToSliderValueMap.get(priority) : 0}
                                        onChange={onPrioritySliderChange}
                                    />
                                )}

                            </div>
                        </div>
                        <div className={style.modalFooter}>
                            <div className={style.doneTodoButtonContainer}>
                                <Button
                                    type={"primary"}
                                    onClick={onAddTodoClick}
                                    loading={isAddTodoLoading}
                                    disabled={!doFormFieldsValidate()}
                                    className={doFormFieldsValidate() ? style.doneTodoButton : style.doneTodoButtonDisabled}
                                >
                                    {"Done"}
                                </Button>
                            </div>
                        </div>
                    </div>
                }
            </QueueAnim>

            <div className={style.addTodoButtonContainer}>
                <Button
                    onClick={toggleModalVisible}
                    disabled={disabled}
                    className={!disabled ? style.addTodoButton : style.addTodoButtonDisabled}
                    type={"primary"}
                    icon={<PlusOutlined style={{ fontSize: 22, marginTop: 4 }} />}
                />
            </div>
        </React.Fragment>
    );
};

export default AddTodo;