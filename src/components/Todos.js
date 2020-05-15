import React, { useEffect, useState } from 'react';

class Todo {
    constructor(str){

        this.text =str;
        this.completed = false
    }
    toggleCompleted(){
        this.completed = ! this.completed;
    }
}


const Todos = ()=>{
    const [inputVal, setInputVal] = useState('');
    const [todos, setTodos] = useState([]);
    useEffect(() => {
        const items= JSON.parse(localStorage.getItem('todos'));
        if(items!== null){
        setTodos(items);
            
        }

    }, []);

    function handleSubmit(event){
        event.preventDefault();
        const newTodo = new Todo(inputVal);
        const newList = [...todos, newTodo]
        setTodos(newList);

        localStorage.setItem('todos', JSON.stringify(newList));

        setInputVal('');
    }

    function toggleCompleted(index){
        const todo = todos[index];
        todo.toggleCompleted();
        const cloned = [...todos];
        setTodos(cloned);
        localStorage.setItem('todos', JSON.stringify(cloned));


    }
    function handleDelete(index){
        const filtered = todos.filter((_, i) => i !== index);
        setTodos(filtered);

    }

    return(
        <div>
        <form onSubmit={handleSubmit}>
            <input
                value={inputVal}
                onChange={e=> setInputVal(e.target.value)}
            /><br/><br/>
            <button class="booton">Add</button>
            <br/><br/>
        </form>

        { todos.map((todo,i) =>(

            <div key={i}>
                <span style={{textDecoration: todo.completed? 'line-through':
            'none'}}>{todo.text}</span>
                
                <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={()=> toggleCompleted(i)}
                />
                <button class="buton" onClick={() => handleDelete(i)}>Delete</button>
            </div>
        ))}
        </div>
    );

};

export default Todos; 