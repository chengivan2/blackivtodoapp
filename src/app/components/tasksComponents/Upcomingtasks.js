'use client'
import React, { useEffect, useState } from 'react'

export default function Upcomingtasks() {

  const [completedTodos, setCompletedTodos] = useState("")
  const [incompleteTodos, setIncompleteTodos] = useState("")

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

  const handleDelete = async (todoID) => {

    try {

      const deleteResponse = await fetch('/api/move-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(todoID),
      });

      if (deleteResponse.ok) {

        console.log('Todo Deleted successfully');
        window.location = "/";
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
        window.location = "/";
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
        window.location = "/";
        return updatedoeneResponse.json();

      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)
    }

  }


  useEffect(() => {
    getIncompleteTodos();
  }, []);

  useEffect(() => {
    getCompleteTodos();
  }, []);


  return (
    <div>

      <div>
        <h3>Upcoming Tasks</h3>
      </div>

      <div className="class-list">
        { incompleteTodos ?
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
{ completedTodos ?
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
          <p>You haven't completed any tasks</p>
        }

      </div>

    </div>
  )
}
