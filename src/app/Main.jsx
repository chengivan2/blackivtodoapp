'use client'

import React, { createContext, useState } from 'react';
import Title from "./components/Title";
import Tasktitle from "./components/formComponents/Tasktitle";
import Taskform from "./components/formComponents/Taskform";
import Taskstitle from "./components/tasksComponents/Taskstitle";
import Upcomingtasks from "./components/tasksComponents/Upcomingtasks";

// Create a new context and export
export const TaskAddedContext = createContext();

// Create a Context Provider
const TaskAddedContextProvider = ({ children }) => {
    const [taskAdded, setTaskAdded] = useState(false);

    return (
        <TaskAddedContext.Provider value={{ taskAdded, setTaskAdded }}>
            {children}
        </TaskAddedContext.Provider>
    );
};

export default function Main() {


    return (
        <>

            <Title />

            <TaskAddedContextProvider>
                <section className="task-form-section">
                    <Tasktitle />
                    <div className="form-contaier">
                        <Taskform />
                    </div>
                </section>

                <section className="your-tasks-section">
                    <div>
                        <Taskstitle />
                    </div>

                    <div className="all-tasks">
                        <Upcomingtasks />

                    </div>
                </section>
            </TaskAddedContextProvider>

        </>
    )
}
