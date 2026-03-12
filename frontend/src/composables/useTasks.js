import { ref, computed } from 'vue'
import api from '../services/api'

export function useTasks() {
  const tasks = ref([])
  const isLoading = ref(false)
  const isError = ref(false)

  // Fetch all tasks
  const fetchTasks = async () => {
    isLoading.value = true
    isError.value = false
    try {
      const response = await api.get('/tasks')
      // response is already unpacked via interceptor: { success: true, count: X, data: [...] }
      if (response && response.success) {
        tasks.value = response.data
      }
    } catch (err) {
      isError.value = true
      console.error('Failed to fetch tasks', err)
    } finally {
      isLoading.value = false
    }
  }

  // Create task
  const createTask = async (taskData) => {
    try {
      const response = await api.post('/tasks', taskData)
      if (response && response.success) {
        tasks.value.unshift(response.data) // Add to top
        return response.data
      }
    } catch (err) {
      console.error('Failed to create task', err)
      throw err
    }
  }

  // Update a full task (edit)
  const updateTask = async (id, taskData) => {
    try {
      const response = await api.put(`/tasks/${id}`, taskData)
      if (response && response.success) {
        const index = tasks.value.findIndex(t => t._id === id)
        if (index !== -1) {
          tasks.value[index] = response.data
        }
        return response.data
      }
    } catch (err) {
      console.error('Failed to update task', err)
      throw err
    }
  }

  // Update only the status (for drag and drop)
  const updateStatus = async (id, status) => {
    try {
      // Optimistic update locally
      const task = tasks.value.find(t => t._id === id)
      if (task) {
        task.status = status
      }
      
      const response = await api.patch(`/tasks/${id}/status`, { status })
      // If server responds differently, update local model
      if (response && response.success) {
         // It's already updated optimistically, but we could sync if needed
      }
    } catch (err) {
      console.error('Failed to update task status', err)
      // Rollback optimistic update by refetching
      fetchTasks()
      throw err
    }
  }

  // Delete a task
  const deleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`)
      if (response && response.success) {
        tasks.value = tasks.value.filter(t => t._id !== id)
      }
    } catch (err) {
      console.error('Failed to delete task', err)
      throw err
    }
  }

  return {
    tasks,
    isLoading,
    isError,
    fetchTasks,
    createTask,
    updateTask,
    updateStatus,
    deleteTask
  }
}
