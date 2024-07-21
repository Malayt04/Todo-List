import React, { useState , useEffect} from 'react'
import './style.css'
const getLocalData = () => {
    const list = localStorage.getItem("mylist")
    if(list){
        return JSON.parse(list)
    }
    else{
        return []
    }
}

const Todo = () => {
    const [inputdata,setinputdata] = useState("")
    const [item,setitem] = useState(getLocalData ())
    // const [isedititem , setisedititem] = useState("")
    // const [togglebutton , settogglebutton] = useState(false)    
    const addItem = () => {
        if(!inputdata){
            alert('please enter the items')
        }
        else{
            const mynewinputdata = {
                id: new Date().getTime().toString(),
                name : inputdata,
            }
            setitem([...item,mynewinputdata])
            setinputdata("")
        }
    }
    const deleteitem = (id) => {
        const updateditems = item.filter((curElem) => {
            return curElem.id !== id
        })
        setitem(updateditems)
    }
    const edititem = (id) => {
        const todo = item.find((curElem) => {
            return curElem.id === id
        })
        setinputdata(todo.name)
        // setisedititem(id)
    }
    const removeall = () => {
        setitem([]);
    }

    useEffect(() => {
        localStorage.setItem("mylist" , JSON.stringify(item))
    },[item])
  return (
    <>
      <div className='main-div'>
        <div className='child-div'>
            <figure>
                <img src="./images/todo.svg" alt="todologo" />
                <figcaption>Add your list here 📃</figcaption>
            </figure>
            <div className='addItems'>
                <input type="text" placeholder="✍️ Add the items" className='form-control' value={inputdata} onChange={(event) => setinputdata(event.target.value)}/>
                <i className="fa fa-solid fa-plus add-btn" onClick={addItem}></i>
            </div>
            <div className='showItems'> 
                {item.map((curElem) => {
                    return(
                        <div className='eachItem' key={curElem.id}>
                        <h2>{curElem.name}</h2>
                        <div className='todo-btn'>
                            <i class='fas fa-edit add-btn' onClick={() => edititem(curElem.id)}></i>
                            <i class='fas fa-trash-alt add-btn' onClick={() => deleteitem(curElem.id)}></i>
                        </div>
                        </div>
                    )

                })}
                
            </div>
            <div className='showItems' data-sm-link-text='Remove All' onClick={removeall}><button className='btn effect04'><span>CHECK</span></button></div>
        </div>
      </div>
    </>
  )
}

export default Todo
