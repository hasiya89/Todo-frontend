/*Add constant variable that holds url for the backend. By default, input field is disabled. */

const BACKEND_ROOT_URL = 'http://localhost:3001'
import { Todos } from "./class/Todos.js"

const todos = new Todos(BACKEND_ROOT_URL)

const list=document.querySelector('ul')
const input=document.querySelector('input')

input.disabled = true

/*Create a separate function for rendering a task. This (same) function will be used, when
a new task is added, or tasks are retrieved from backend.  */

/*modify getTasks and renderTasks functions. GetTasks uses todos object
(created based on Todos class). Returned promise is handled and in case data is
returned, it is looped through, and a task object is passed into renderTask function.
GetText method (“getters”) is used to read private member variable value.
 */


const renderTask = (task) => {
    const li=document.createElement('li')
    li.setAttribute('class', 'list-group-item')
    li.setAttribute('data-key', task.getId().toString())
    //li.innerHTML = task.getText()
    renderSpan(li, task.getText())
    renderLink(li, task.getId())
    list.append(li)
}

const renderSpan = (li, text) => {
    const span = li.appendChild(document.createElement('span'))
    span.innerHTML = text
}

const renderLink = (li, id) => {
    const a = li.appendChild(document.createElement('a'))
    a.innerHTML = '<i class="bi bi-trash"></i>'
    a.setAttribute('style', 'float:right')
    a.addEventListener('click', (event) => {
        todos.removeTask(id).then((removed_id) => {
            const li_to_remove = document.querySelector(`[data-key='${removed_id}']`)
            if (li_to_remove) {
                list.removeChild(li_to_remove)
            }
    }).catch((error) => {
        alert(error)
    })
    })
}


/*Define following function that fetches data from the backend by making HTTP call. JSON
is received as response. JSON (array) is looped through and each JSON object holding
task is rendered to the UI. User can add new tasks after data is retrieved.
 */

const getTasks = () => {
   todos.getTasks().then((tasks) => {
         tasks.forEach(task => {
              renderTask(task)
         })

        }).catch((error) => {
            alert(error)
        })
         
    input.disabled = false
}

/*Define function for saving task. A fetch call using post HTTP method is implemented.
Provide additional parameters for fetch (method, headers and body including data in
JSON format). Call is made to /new endpoint on the backend. This function return a
promise (return is without await), which needs to handle by the caller. */

const saveTask = async (task) => {
    try {
        const json = JSON .stringify({description: task})
        const response = await fetch(BACKEND_ROOT_URL + '/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: json
        })
        return response.json()
    } catch (error) {
        alert("Error saving task"+ error.message)
    }
}


/*Modify code that adds new task. Since function saveTask returns a promise, .then
syntax is used to handle to return value. It means, that asynchronous response is
handled after execution is finished. In this case new task is rendered (“printed”) into UI and input field is emptied after backend is finished with saving data into database and
returns a response. */

input.addEventListener('keypress',(event)=>{
    if(event.key === 'Enter') {
        event.preventDefault()
        const task = input.value.trim()
        if (task !== '') {
            todos.addTask(task).then((task) => {
                renderTask(task)
                input.value = ''
                input.focus()
            })
            
        }
    }

  
})


getTasks()

