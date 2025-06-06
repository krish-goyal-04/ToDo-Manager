document.addEventListener('DOMContentLoaded',()=>
{
    const todoInput = document.getElementById("todoInput")
    const addTaskBtn = document.getElementById("submitBtn")
    const todoList = document.getElementById("todoList")

    let tasks = JSON.parse(localStorage.getItem("task_keys"))||[]

    tasks.forEach(task=>renderTask(task))

    addTaskBtn.addEventListener("click",()=>{
        const task = todoInput.value.trim()
        if(task==="")return;
        const newTask={
            id:Date.now(),
            text:task,
            completed:false,
        }
        tasks.push(newTask)
        saveTasks()
        renderTask(newTask)
        todoInput.value = ""
        //console.log(tasks)
    })

    function renderTask(task){
        //console.log(task.text)
        const li = document.createElement('li')
        li.setAttribute('data-id',task.id)
        li.innerHTML = `
        <input id="check_box" type="checkbox" >
        <span>${task.text}</span>
        <button id='delete' class="" >Delete</delete>
        `
        const checkbox = li.querySelector("input[type='checkbox']")
        const span = li.querySelector("span")
        checkbox.checked = task.completed
        span.style.textDecoration = task.completed?"line-through":"none";
        checkbox.addEventListener("change",()=>{
            task.completed=checkbox.checked
            span.style.textDecoration = task.completed?"line-through":"none";
            saveTasks()
        })
        
        li.querySelector('button').addEventListener('click',(e)=>{
            e.stopPropagation()//prevents event bubbling
            tasks = tasks.filter(t=>t.id!=task.id)
            li.remove()
            saveTasks()
        })
        
        //saveTasks()
        todoList.appendChild(li)
    }


    //Saves everything to localstorage
    function saveTasks(){
        localStorage.setItem("task_keys",JSON.stringify(tasks))
    }
    //Learn about it more
})