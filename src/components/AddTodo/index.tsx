import * as React from 'react';
import {useEffect, useState} from "react";
import {Button, Divider, Input, Select, Slider, Typography} from "antd";
import {CloseOutlined, PlusOutlined} from "@ant-design/icons/lib";
import {SliderMarks} from "antd/es/slider";
import QueueAnim from 'rc-queue-anim';

import style from './AddTodo.module.css';


const AddTodo: React.FC = () => {
    const [modalVisible, setModalVisibility] = useState(false);

    const [todoContent, setTodoContent] = useState('');
    const [todoLabels, setTodoLabels] = useState([] as string[]);
    const [addTodoLabelInput, setAddTodoLabelInput] = useState('')
    const [todoPriority, setTodoPriority] = useState(1);

    useEffect(() => {
        console.log('content ' + todoContent)
        console.log('labels ' + todoLabels)
        console.log('priority ' + todoPriority)
    });

    const toggleModalVisible = (): void => {
        document.body.style.overflow = modalVisible ? 'unset' : 'hidden';
        setModalVisibility(!modalVisible)
    };

    const changeTodoContent = (e: React.FormEvent<HTMLInputElement>): void => setTodoContent(e.currentTarget.value)
    const changeTodoLabels = (values: string[]): void => setTodoLabels(values)
    const changeAddTodoLabelInput = (e: React.FormEvent<HTMLInputElement>): void => setAddTodoLabelInput(e.currentTarget.value)
    const changeTodoPriority = (value: number): void => setTodoPriority(value)

    const doFieldsValidate = (): boolean => {
        return todoContent != '';
    }

    const todoPrioritySliderOptions: SliderMarks = {
        0: 'None',
        1: 'Low',
        2: 'Medium',
        3: 'High',
    };

    const createInputGroupComponent = (title: string, inputItem: React.ReactElement): React.ReactElement =>
        <div className={style.inputGroup}>
            <Typography.Text className={style.inputTitle}>{title}</Typography.Text>
            {inputItem}
        </div>

    return (
        <React.Fragment>
            <QueueAnim type='bottom'>
                {modalVisible &&
                <div className={style.modalContainer} key="modal">
                    <div>
                        <div className={style.modalHeader}>
                            <Typography.Title className={style.addTodoTitle}>Add Todo</Typography.Title>
                            <Button
                                className={style.closeModalButton}
                                icon={<CloseOutlined/>}
                                shape="circle-outline"
                                onClick={toggleModalVisible}
                            />
                        </div>
                        <div className={style.modalContent}>
                            {createInputGroupComponent('To-do',
                                <Input
                                    size="large"
                                    placeholder="What needs to be done?"
                                    value={todoContent}
                                    onChange={changeTodoContent}
                                />
                                )}
                            {createInputGroupComponent('Labels',
                                <Select
                                    size="large"
                                    placeholder={"Select Labels"}
                                    showSearch
                                    mode="multiple"
                                    optionFilterProp="children"
                                    onChange={changeTodoLabels}
                                    dropdownRender={menu => (
                                        <div>
                                            {menu}
                                            <Divider className={style.divider}/>
                                            <div className={style.addTodoLabelContainer}>
                                                <Input
                                                    className={style.addTodoLabelInput}
                                                    value={addTodoLabelInput}
                                                    onChange={changeAddTodoLabelInput}
                                                />
                                                <a className={style.addTodoLabelButton}>
                                                    <PlusOutlined /> Add Label
                                                </a>
                                            </div>
                                        </div>
                                    )}
                                >
                                    <Select.Option value="home">Home</Select.Option>
                                    <Select.Option value="work">Work</Select.Option>
                                    <Select.Option value="family">Family</Select.Option>
                                </Select>
                                )}
                            {createInputGroupComponent('Priority',
                                <Slider
                                    marks={todoPrioritySliderOptions}
                                    max={3}
                                    tooltipVisible={false}
                                    value={todoPriority}
                                    defaultValue={todoPriority}
                                    onChange={(value => changeTodoPriority(value as number))}
                                />
                                )}
                        </div>
                    </div>
                    <div className={style.modalFooter}>
                        <div className={style.doneTodoButtonContainer}>
                            <Button className={style.doneTodoButton} type={"primary"} disabled={doFieldsValidate()}>
                                {"Done"}
                            </Button>
                        </div>
                    </div>
                </div>
                }
            </QueueAnim>

            <div className={style.addTodoButtonContainer}>
                <Button
                    className={style.addTodoButton}
                    type={"primary"}
                    icon={<PlusOutlined style={{fontSize: 22, marginTop: 4}}/>}
                    onClick={toggleModalVisible}
                />
            </div>
        </React.Fragment>
    )
}

export default AddTodo;