import { useState } from 'react'
import { PlusIcon } from '@heroicons/react/24/solid'

export default function TaskForm({ onAddTask }) {
  const [taskName, setTaskName] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskName.trim()) {
      onAddTask({ name: taskName.trim(), completed: false })
      setTaskName('')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex items-center border-b border-gray-300 py-2">
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Add a new task"
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
        <button
          type="submit"
          className="flex-shrink-0 bg-blue-500 hover:bg-blue-700 border-blue-500 hover:border-blue-700 text-sm border-4 text-white py-1 px-2 rounded"
        >
          <PlusIcon className="h-5 w-5" />
        </button>
      </div>
    </form>
  )
}