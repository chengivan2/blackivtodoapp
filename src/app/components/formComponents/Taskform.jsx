'use client'

import React, { useState } from 'react'
import * as Form from '@radix-ui/react-form';
import "@/app/componentsStyles/taskform.css"


export default function Taskform() {

    const [taskName, setTaskName] = useState("");
    const [createdTodo, setCreatedTodo] = useState(false);

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const [taskDescription, setTaskDescription] = useState("");

    const handleTaskDescriptionChange = (e) => {
        setTaskDescription(e.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const response_from_create_api = await fetch("/api/create-todo", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ taskName, taskDescription })
            });

            if (!response_from_create_api.ok) {
                throw new Error(`HTTP error! Status: ${response_from_create_api.status}`);
            }
            else {
                console.log("Added your todo to the DB");
                setCreatedTodo(true);

            }

            const responseData = await response_from_create_api.json();

            console.log(responseData)



        } catch (error) {
            console.error(error.message);

        }

        setTaskName("");
        setTaskDescription("");
    }

    return (
        <div className='form-container'>
            <Form.Root className="FormRoot" onSubmit={onSubmitForm}>
                <Form.Field className="FormField" name="taskname">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Task Name</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter a task
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="text" value={taskName} onChange={handleTaskNameChange} placeholder='Add a task' required />
                    </Form.Control>
                </Form.Field>

                <Form.Field className="FormField" name="taskdescription">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Task Description</Form.Label>
                    </div>
                    <Form.Control asChild>
                        <textarea className="Textarea" value={taskDescription} onChange={handleTaskDescriptionChange} placeholder='Add a description for your task' />
                    </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                    <button className="Button" style={{ marginTop: 10 }}>
                        Add Task
                    </button>
                </Form.Submit>
            </Form.Root>
        </div>
    )
}