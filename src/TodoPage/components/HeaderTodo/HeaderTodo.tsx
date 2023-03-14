import './headerTodo.scss'

HeaderTodo.propTypes = {}

interface HeaderTodo {
  handleOpenModal: (string: string) => void
  handleFillter: (element: string) => void
  handleValueInput: (event: React.ChangeEvent<HTMLInputElement>) => void
  deleteAll: () => void
  activeCategory: string
}

function HeaderTodo(props: HeaderTodo) {
  const { handleOpenModal, handleFillter, handleValueInput, deleteAll, activeCategory } = props

  const handleForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }
  return (
    <div>
      <h1 onClick={() => handleOpenModal('add')} className='add-todo'>
        +
      </h1>
      <form onSubmit={handleForm} className='search-todo' action=''>
        <input onChange={handleValueInput} placeholder='Search todo list...' type='text' />
      </form>
      <div className='category'>
        <div className='category-name'>
          <p className={`${activeCategory === 'All' ? 'item-active' : ''}`} onClick={() => handleFillter('')}>
            All
          </p>
          <p
            className={`${activeCategory === 'Pending' ? 'item-active' : ''}`}
            onClick={() => handleFillter('Pending')}
          >
            Pending
          </p>
          <p
            className={`${activeCategory === 'Completed' ? 'item-active' : ''}`}
            onClick={() => handleFillter('Completed')}
          >
            Completed
          </p>
        </div>
        <div onClick={deleteAll} className='clear-all'>
          Clear All
        </div>
      </div>
    </div>
  )
}

export default HeaderTodo
