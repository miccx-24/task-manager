"use client"
import { useState } from 'react'
import Head from 'next/head'
import TaskList from './components/TaskList'
import TaskForm from './components/TaskForm'

export default function Home() {
  const [tasks, setTasks] = useState([])

  const addTask = (task) => {
    setTasks([...tasks, { ...task, id: Date.now() }])
  }

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId))
  }

  const toggleTaskCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Head>
        <title>Microsoft-style Task Manager</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="max-w-4xl mx-auto p-4">
        <TaskForm onAddTask={addTask} />
        <TaskList
          tasks={tasks}
          onDeleteTask={deleteTask}
          onToggleTaskCompletion={toggleTaskCompletion}
        />
      </main>
    </div>
  )
}