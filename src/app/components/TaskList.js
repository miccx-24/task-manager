import { CheckCircleIcon, TrashIcon } from '@heroicons/react/24/outline'
import { motion } from 'framer-motion'

export default function TaskList({ tasks, onDeleteTask, onToggleTaskCompletion }) {
  return (
    <ul className="space-y-3">
      {tasks.map((task) => (
        <motion.li
          key={task.id}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center justify-between p-3 bg-white rounded-lg shadow"
        >
          <div className="flex items-center">
            <button
              onClick={() => onToggleTaskCompletion(task.id)}
              className={`mr-3 ${
                task.completed ? 'text-green-500' : 'text-gray-400'
              }`}
            >
              <CheckCircleIcon className="h-6 w-6" />
            </button>
            <span
              className={`${
                task.completed ? 'line-through text-gray-400' : 'text-gray-700'
              }`}
            >
              {task.name}
            </span>
          </div>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-500 hover:text-red-700"
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </motion.li>
      ))}
    </ul>
  )
}