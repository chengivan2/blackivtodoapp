'use client'

import React, { useEffect, useState, useContext } from 'react'
import { TaskAddedContext } from '@/app/main';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Upcomingtasks() {

  const notifyDeleteMessage = <p>Task deleted!!! &#x1F5D1;</p>;
  const notifyTaskDoneMessage = <p>Hooray!! Task completed successfully &#x1F389;!</p>;
  const notifyTaskIncompleteMessage = <p>Unfinished tasks are just future accomplishments. You got this &#x1F4AA;!</p>;
  const notifyRestoreMessage = <p>Task successfully restored &#x1F389;!</p>;

  const notifyDelete = () => toast(notifyDeleteMessage);
  const notifyTaskDone = () => toast(notifyTaskDoneMessage);
  const notifyTaskIncomplete = () => toast(notifyTaskIncompleteMessage);
  const notifyTaskRestore = () => toast(notifyRestoreMessage)

  const [completedTodos, setCompletedTodos] = useState("");
  const [incompleteTodos, setIncompleteTodos] = useState("");
  const [deletedTodos, setDeletedTodos] = useState("")

  const { taskAdded, setTaskAdded } = useContext(TaskAddedContext);
  const [doneTask, setDoneTask] = useState(false);
  const [deleteTask, setDeleteTask] = useState(false);
  const [undoTask, setUndoTask] = useState(false);
  const [restoreTask, setRestoreTask] = useState(false);

  const getIncompleteTodos = async () => {
    try {

      //Fetching incomplete todos
      const incompleteTodosResponse = await fetch("/api/get-incomplete-todos");
      const incompleteJsonData = await incompleteTodosResponse.json();
      setIncompleteTodos(incompleteJsonData.data);


    } catch (error) {
      console.error(error.message);
    }
  }

  const getCompleteTodos = async () => {
    try {

      //Fetching completed todos
      const completedTodosResponse = await fetch('/api/get-completed-todos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      const completedJsonData = await completedTodosResponse.json();
      setCompletedTodos(completedJsonData.data)


    } catch (error) {
      console.error(error.message);
    }
  }

  const getDeletedTodos = async () => {
    try {

      //Fetching deleted todos
      const deletedTodosResponse = await fetch('/api/get-deleted-todos', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(deletedTodosResponse);
      console.log("then");
      const deletedJsonData = await deletedTodosResponse.json();
      console.log(deletedJsonData);
      setDeletedTodos(deletedJsonData.data);
      console.log(deletedTodos)


    } catch (error) {
      console.error(error.message);
    }
  }

  const handleDelete = async (todoID) => {

    try {

      const deleteResponse = await fetch('/api/move-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoID),
      });

      if (deleteResponse.ok) {

        console.log('Todo Deleted successfully');
        notifyDelete();
        setDeleteTask(true);
        return deleteResponse.json();

      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)
    }

  }

  const handleDone = async (todoID) => {

    try {

      const updatedoeneResponse = await fetch('/api/complete-todo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoID),
      });

      if (updatedoeneResponse.ok) {

        console.log('Todo Updated successfully');
        notifyTaskDone();
        setDoneTask(true);
        return updatedoeneResponse.json();

      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)
    }

  }

  const handleUndo = async (todoID) => {

    try {

      const updatedoeneResponse = await fetch('/api/undo-todo', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoID),
      });

      if (updatedoeneResponse.ok) {

        console.log('Todo Updated successfully');
        notifyTaskIncomplete();
        setUndoTask(true);
        return updatedoeneResponse.json();

      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)
    }

  }

  const handleRestore = async (todoID) => {

    try {

      const restoreResponse = await fetch('/api/restore-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoID),
      });

      if (restoreResponse.ok) {

        console.log('Todo Restored successfully');
        notifyTaskRestore();
        setRestoreTask(true);
        return restoreResponse.json();

      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)
    }

  }


  useEffect(() => {
    getIncompleteTodos();
    getCompleteTodos();
    getDeletedTodos();
  }, []);

  useEffect(() => {
    if (taskAdded) {
      // when taskAdded is true
      getIncompleteTodos();
      setTaskAdded(false);
    }

    return () => {
      if (!taskAdded) {
        // Do nothing when taskAdded is false
        return;
      }
    }
  }, [taskAdded]);

  useEffect(() => {
    if (deleteTask) {
      // Called when doneTask is true
      getIncompleteTodos();
      getCompleteTodos();
      getDeletedTodos();
      setDeleteTask(false)
    }

    return () => {
      if (!deleteTask) {
        // Do nothing when doneTask is false
        return;
      }
    }
  }, [deleteTask]);

  useEffect(() => {
    if (doneTask) {
      // Called when doneTask is true
      getIncompleteTodos();
      getCompleteTodos();
      setDoneTask(false)
    }

    return () => {
      if (!doneTask) {
        // Do nothing when doneTask is false
        return;
      }
    }
  }, [doneTask]);

  useEffect(() => {
    if (undoTask) {
      // Called when doneTask is true
      getIncompleteTodos();
      getCompleteTodos();
      setUndoTask(false)
    }

    return () => {
      if (!undoTask) {
        // Do nothing when doneTask is false
        return;
      }
    }
  }, [undoTask]);

  useEffect(() => {
    if (restoreTask) {
      // Called when restoreTask is true
      getIncompleteTodos();
      getCompleteTodos();
      getDeletedTodos();
      setRestoreTask(false)
    }

    return () => {
      if (!restoreTask) {
        // Do nothing when doneTask is false
        return;
      }
    }
  }, [restoreTask]);


  return (
    <div>

      <div>
        <h3>Upcoming Tasks</h3>
      </div>

      <div className="class-list">
        {incompleteTodos ?
          /*<Accordion.Root>
            {
              allTodos.map((todo) => {
                return (
                  <Accordion.Item key={todo.todo_id} value="item-1">
              <Accordion.Header>
                <Accordion.Trigger className="AccordionTrigger">
                  <span>{todo.todo_name}</span>
                  <ChevronDownIcon className="AccordionChevron" aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>{todo.todo_description}</Accordion.Content>
            </Accordion.Item>
                )
              })
      
            }
          </Accordion.Root>*/
          <table>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Done</th>
            </tr>
            <tbody>
              {incompleteTodos.map((iTodo) => (
                <tr key={iTodo.todo_id}>
                  <td>
                    {iTodo.todo_name}
                  </td>
                  <td>
                    {iTodo.todo_description}
                  </td>
                  <td>Edit Taks</td>
                  <td><button className='Button-danger' onClick={() => handleDelete(iTodo.todo_id)}>Delete</button></td>
                  <td><button className='Button-go' onClick={() => handleDone(iTodo.todo_id)}>Done</button></td>

                </tr>
              ))}
            </tbody>

          </table> :
          <p>You need to add some tasks</p>
        }
        <h3>COMPLETED TASKS</h3>
        {completedTodos ?
          /*<Accordion.Root>
            {
              allTodos.map((todo) => {
                return (
                  <Accordion.Item key={todo.todo_id} value="item-1">
              <Accordion.Header>
                <Accordion.Trigger className="AccordionTrigger">
                  <span>{todo.todo_name}</span>
                  <ChevronDownIcon className="AccordionChevron" aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>{todo.todo_description}</Accordion.Content>
            </Accordion.Item>
                )
              })
      
            }
          </Accordion.Root>*/
          <table>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Undo</th>
            </tr>
            <tbody>
              {completedTodos.map((iTodo) => (
                <tr key={iTodo.todo_id}>
                  <td>
                    {iTodo.todo_name}
                  </td>
                  <td>
                    {iTodo.todo_description}
                  </td>
                  <td>Edit Taks</td>
                  <td><button className='Button-danger' onClick={() => handleDelete(iTodo.todo_id)}>Delete</button></td>
                  <td><button className='Button-go' onClick={() => handleUndo(iTodo.todo_id)}>Undo</button></td>

                </tr>
              ))}
            </tbody>

          </table> :
          <p>You haven't completed any tasks.</p>
        }

        <h3>DELETED TASKS</h3>
        {deletedTodos ?
          /*<Accordion.Root>
            {
              allTodos.map((todo) => {
                return (
                  <Accordion.Item key={todo.todo_id} value="item-1">
              <Accordion.Header>
                <Accordion.Trigger className="AccordionTrigger">
                  <span>{todo.todo_name}</span>
                  <ChevronDownIcon className="AccordionChevron" aria-hidden />
                </Accordion.Trigger>
              </Accordion.Header>
              <Accordion.Content>{todo.todo_description}</Accordion.Content>
            </Accordion.Item>
                )
              })
      
            }
          </Accordion.Root>*/
          <table>
            <tr>
              <th>Task</th>
              <th>Description</th>
              <th>Restore</th>
            </tr>
            <tbody>
              {deletedTodos.map((dTodo) => (
                <tr key={dTodo.deletedtodo_id}>
                  <td>
                    {dTodo.deletedtodo_name}
                  </td>
                  <td>
                    {dTodo.deletedtodo_description}
                  </td>
                  
                  <td><button className='Button-danger' onClick={() => handleRestore(dTodo.deletedtodo_id)}>Restore</button></td>

                </tr>
              ))}
            </tbody>

          </table> :
          <p>You haven't deleted any tasks</p>
        }

      </div>

      <ToastContainer />

    </div>
  )
}
