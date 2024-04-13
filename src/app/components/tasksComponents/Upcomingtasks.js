'use client'
import React, { useEffect, useState } from 'react'

export default function Upcomingtasks() {

  const [completedTodos, setCompletedTodos] = useState("")
  const [incompleteTodos, setIncompleteTodos] = useState("")

  const getTodos = async () => {
    try {
      /*console.log("Fetching completed todos...");
      const completedTodosResponse = await fetch("/api/get-completed-todos");
      console.log("Fetched completed todos");
      console.log("Parsing completed todos");
      const completedJsonData = await completedTodosResponse.json();
      setCompletedTodos(completedJsonData)
      console.log(completedJsonData);*/

      console.log("Fetching incomplete todos...");
      const incompleteTodosResponse = await fetch("/api/get-incomplete-todos");
      console.log("Fetched completed todos");
      console.log("Parsing completed todos");
      const incompleteJsonData = await incompleteTodosResponse.json();
      setIncompleteTodos(incompleteJsonData.data);
      console.log(incompleteTodos)
      console.log(incompleteJsonData.data);

    } catch (error) {
      console.error(error.message);
    }
  }

  const handleDelete = async (todoID) => {
    try {
      const deleteResponse = await fetch('/api/move-todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ todoID }),
      });
      console.log(deleteResponse.body)
      if (deleteResponse.ok) {

        console.log('Todo moved successfully');
      } else {
        console.error('Something went wrong');
      }

    } catch (error) {
      console.error(error.message)

    }

  }


  useEffect(() => {
    getTodos();
  }, []);


  return (
    <div>

      <div>
        <h3>Upcoming Tasks</h3>
      </div>

      <div className="class-list">
        {completedTodos || incompleteTodos ?
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
                </tr>
              ))}
            </tbody>

          </table> :
          <p>You need to add some tasks</p>
        }

      </div>

    </div>
  )
}
