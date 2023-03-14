import React, { useEffect, useState } from 'react'
import HeaderTodo from './components/HeaderTodo/HeaderTodo'
import TaskListTodo from './components/TaskListTodo/TaskListTodo'
import Modal from './components/Modal/Modal'
import { Todo } from './@types/TodoType'
import { ToastSucces, ToastError } from './components/ToastTodo/toastTodo'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './todoList.scss'

type handleNewTodo = (todos: Todo[]) => Todo[]

// #LOCALSTORAGE
const SyncToLocal = (handleNewTodos: handleNewTodo) => {
  const toStringTodos = localStorage.getItem('todos')
  const todoObj = JSON.parse(toStringTodos || '[]')
  const newTodoObj = handleNewTodos(todoObj)
  localStorage.setItem('todos', JSON.stringify(newTodoObj))
}

function TodoList() {
  const [modalAddTodo, setModalAddTodo] = useState<boolean>(false)
  const [modalString, setModalString] = useState<string>('')
  const [filterTodo, setFilterTodo] = useState<boolean | undefined>(undefined)
  const [searchTodo, setSearchTodo] = useState<string>('')
  const [curentTodo, setCurentTodo] = useState<Todo | null>(null)
  const [todos, setTodos] = useState<Todo[]>([])
  const [messError, setMessError] = useState<string>('')
  const [activeCategory, setActiveCategory] = useState<string>('All')

  useEffect(() => {
    const toStringTodos = localStorage.getItem('todos')
    const todoObj: Todo[] = JSON.parse(toStringTodos || '[]')
    setTodos(todoObj)
  }, [])

  // #ADD TODO
  const addTodo = (name: string) => {
    if (!name) {
      ToastError(toast, `Can't be left blank :((`)
      setMessError('error')
      return
    }
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    }

    const newTodo = (prev: Todo[]) => [...prev, todo]
    setTodos(newTodo)
    setMessError('')
    SyncToLocal(newTodo)
    ToastSucces(toast, `Added Todo "${todo.name}"`)
  }

  // #DELETE TODO
  const deleteTodo = (id: string) => {
    const hander = (prev: Todo[]) => {
      const findTodo = prev.findIndex((todo) => todo.id === id)
      if (findTodo > -1) {
        const cloneTodo = [...todos]
        cloneTodo.splice(findTodo, 1)
        return cloneTodo
      }
      return prev
    }

    ToastSucces(toast, `Successfully Deleted`)
    setTodos(hander)
    SyncToLocal(hander)
  }

  // #DELETE all
  const deleteAll = () => {
    setTodos([])
    SyncToLocal(() => [])
  }
  // #DONE TODO
  const handleDoneTodo = (index: number) => {
    const hander = () => {
      const cloneTodos = [...todos]
      cloneTodos[index] = {
        ...cloneTodos[index],
        done: cloneTodos[index].done === false ? true : false
      }
      return cloneTodos
    }
    SyncToLocal(hander)
    setTodos(hander)
  }

  // #EDIT TODO
  // 1: EDIT TODO
  const startEdit = (id: string) => {
    const todoEdit = todos.find((todo) => todo.id === id)
    if (todoEdit) {
      setCurentTodo(todoEdit)
    }
  }
  // 2: EDIT TODO
  const editTodo = (name: string) => {
    setCurentTodo((prev) => {
      if (prev) {
        return { ...prev, name }
      }
      return null
    })
  }
  // 3: EDIT TODO
  const finishEditTodo = () => {
    const hander = (prev: Todo[]) => {
      return prev.map((todo) => {
        if (todo.id === curentTodo?.id) {
          return curentTodo
        }
        return todo
      })
    }
    ToastSucces(toast, `Fixed Todo`)
    setTodos(hander)
    SyncToLocal(hander)
    setCurentTodo(null)
  }

  // * HANDLE
  const handleValueInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setSearchTodo(value)
  }

  const handleOpenModal = (string: string) => {
    setModalString(string)
    setModalAddTodo(true)
  }

  const handleCloseModal = () => {
    setModalAddTodo(false)
    setMessError('')
  }

  const handleFillter = (element: string) => {
    if (element === '') {
      setFilterTodo(undefined)
      setActiveCategory('All')
    }
    if (element === 'Pending') {
      setFilterTodo(false)
      setActiveCategory('Pending')
    }
    if (element === 'Completed') {
      setFilterTodo(true)
      setActiveCategory('Completed')
    }
  }

  // #SEARCH + FILTER
  const listFilterTodo = todos
    .filter((todo) => filterTodo === undefined || todo.done === filterTodo)
    .filter((todo) => searchTodo === '' || todo.name.toLowerCase().includes(searchTodo.toLowerCase()))

  // ONCHANGE INPUT RESET MESS
  const resetMessError = () => {
    setMessError('')
  }
  return (
    <div className='todo-list'>
      <HeaderTodo
        handleOpenModal={handleOpenModal}
        handleFillter={handleFillter}
        handleValueInput={handleValueInput}
        deleteAll={deleteAll}
        activeCategory={activeCategory}
      />
      <TaskListTodo
        todos={listFilterTodo}
        handleDoneTodo={handleDoneTodo}
        handleOpenModal={handleOpenModal}
        deleteTodo={deleteTodo}
        startEdit={startEdit}
      />
      <Modal
        modalAddTodo={modalAddTodo}
        modalString={modalString}
        curentTodo={curentTodo}
        handleCloseModal={handleCloseModal}
        addTodo={addTodo}
        editTodo={editTodo}
        finishEditTodo={finishEditTodo}
        messError={messError}
        resetMessError={resetMessError}
      />
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      <ToastContainer />
    </div>
  )
}

export default TodoList
