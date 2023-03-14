import React, { useState } from 'react'
import './modal.scss'
import { Todo } from './../../@types/TodoType'
import { motion } from 'framer-motion'

interface Modal {
  modalAddTodo: boolean
  modalString: string
  curentTodo: Todo | null
  messError: string
  addTodo: (name: string) => void
  editTodo: (name: string) => void
  finishEditTodo: () => void
  handleCloseModal: () => void
  resetMessError: () => void
}

function Modal(props: Modal) {
  const {
    handleCloseModal,
    addTodo,
    editTodo,
    finishEditTodo,
    resetMessError,
    modalAddTodo,
    modalString,
    curentTodo,
    messError
  } = props
  const [name, setName] = useState<string>('')
  const modalType = [
    {
      title: 'ADD TODO',
      button: 'Add'
    },
    {
      title: 'EDIT TODO',
      button: 'Edit'
    }
  ]

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (curentTodo) {
      finishEditTodo()
    } else {
      addTodo(name)
    }
    if (name) {
      handleCloseModal()
    }
    setName('')
  }

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setName(value)
    editTodo(value)
    resetMessError()
  }

  return (
    <div className='modal'>
      {modalAddTodo && (
        <div>
          <div onClick={handleCloseModal} className='modal-overlay'></div>
          <form onSubmit={handleSubmit} className='modal-container'>
            <h3>{modalString === 'add' ? modalType[0].title : modalType[1].title}</h3>
            <input
              className={`${messError === 'error' ? 'error' : ''}`}
              value={curentTodo ? curentTodo.name : name}
              onChange={handleInput}
              placeholder='Add todo...'
              type='text'
            />
            <div className='modal-button'>
              <button>{modalString === 'add' ? modalType[0].button : modalType[1].button}</button>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default Modal
