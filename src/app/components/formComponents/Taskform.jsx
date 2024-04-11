'use client'

import React from 'react'
import * as Form from '@radix-ui/react-form';
import "@/app/componentsStyles/taskform.css"


export default function Taskform() {

    /*const [description, setDescription] = useState("");

    const handleChange = (e) => {
        setDescription(e.target.value);
    };

    const onSubmitForm = async (e) => {
        e.preventDefault();

        try {
            const body_todo = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body_todo)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();

            window.location = "/";


        } catch (error) {
            console.error(error.message);

        }
    }*/

    return (
        <div className='form-container'>
            <Form.Root className="FormRoot" /*onSubmit={onSubmitForm}*/>
                <Form.Field className="FormField" name="taskname">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Task Name</Form.Label>
                        <Form.Message className="FormMessage" match="valueMissing">
                            Please enter a task
                        </Form.Message>
                    </div>
                    <Form.Control asChild>
                        <input className="Input" type="text" /*value={description} onChange={handleChange}*/ placeholder='Add a task' required />
                    </Form.Control>
                </Form.Field>

                <Form.Field className="FormField" name="taskdescription">
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                        <Form.Label className="FormLabel">Task Description</Form.Label>
                    </div>
                    <Form.Control asChild>
                        <textarea className="Textarea" placeholder='Add a description for your task' />
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