import './taskListTodo.scss'
import { FiDelete } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'
import { Todo } from './../../@types/TodoType'
import { motion } from 'framer-motion'
TaskListTodo.propTypes = {}

interface TaskListTodo {
  todos: Todo[]
  deleteTodo: (id: string) => void
  handleDoneTodo: (index: number) => void
  handleOpenModal: (string: string) => void
  startEdit: (id: string) => void
}

function TaskListTodo(props: TaskListTodo) {
  const { todos, handleDoneTodo, handleOpenModal, deleteTodo, startEdit } = props
  const handleEditTodo = (id: string) => {
    startEdit(id)
  }
  return (
    <div className='TaskListTodo'>
      {todos.map((todo, index) => (
        <motion.div className='lists-item' key={index}>
          <div onClick={() => handleDoneTodo(index)}>
            <input checked={todo.done} type='checkbox' name='' id='' />
            <span className={`${todo.done ? 'text-done' : ''}`}>{todo.name}</span>
          </div>
          <div>
            <span onClick={() => handleEditTodo(todo.id)}>
              <AiOutlineEdit onClick={() => handleOpenModal('edit')} className='edit' />
            </span>
            <span onClick={() => deleteTodo(todo.id)} className='remove'>
              <FiDelete />
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default TaskListTodo
