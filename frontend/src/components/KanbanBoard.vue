<script setup>
import { ref, onMounted, computed } from 'vue'
import { useTasks } from '../composables/useTasks'
import TaskColumn from './TaskColumn.vue'
import TaskModal from './TaskModal.vue'

const { 
  tasks, 
  isLoading, 
  isError, 
  fetchTasks, 
  createTask, 
  updateTask, 
  updateStatus, 
  deleteTask 
} = useTasks()

onMounted(() => {
  fetchTasks()
})

// Derived state for columns
const todoTasks = computed(() => tasks.value.filter(t => t.status === 'todo'))
const inProgressTasks = computed(() => tasks.value.filter(t => t.status === 'in-progress'))
const doneTasks = computed(() => tasks.value.filter(t => t.status === 'done'))

// Handle local list update from draggable (keeps UI responsive before API finishes)
const handleListUpdate = (status, newList) => {
  // Update local tasks array manually to match the dragged state
  // This is handled partly by VueDraggable's v-model, but we need the main array synced.
  // We'll rely on the change event added to TaskColumn instead for cleaner state sync.
}

// When a task is dropped into a new list
const handleTaskMoved = async ({ taskId, newStatus }) => {
  try {
    await updateStatus(taskId, newStatus)
  } catch (err) {
    // Error handled inside composable
  }
}

// Modal State
const isModalOpen = ref(false)
const editingTask = ref(null)

const openCreateModal = () => {
  editingTask.value = null
  isModalOpen.value = true
}

const openEditModal = (task) => {
  // Clone task to avoid immediate reactive changes in background
  editingTask.value = { ...task }
  isModalOpen.value = true
}

const handleModalSubmit = async (taskData) => {
  try {
    if (editingTask.value) {
      // Edit
      await updateTask(taskData._id, taskData)
    } else {
      // Create
      await createTask(taskData)
    }
    isModalOpen.value = false
  } catch (err) {
    alert('Failed to save task')
  }
}

const handleDeleteTask = async (taskId) => {
  if (confirm('Are you sure you want to delete this task?')) {
    await deleteTask(taskId)
  }
}
</script>

<template>
  <div class="relative h-full flex flex-col">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div>
        <h2 class="text-2xl font-bold text-gray-800">Board Tasks</h2>
        <p class="text-sm text-gray-500 mt-1">Manage and track your project tasks.</p>
      </div>

      <button 
        @click="openCreateModal"
        class="bg-brand-600 hover:bg-brand-700 text-white px-5 py-2.5 rounded-lg font-medium text-sm flex items-center gap-2 transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Add Task
      </button>
    </div>

    <!-- Error State -->
    <div v-if="isError" class="bg-red-50 text-red-600 p-4 rounded-lg mb-6 flex items-center gap-3">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      Failed to load tasks. Please check your connection or backend server.
    </div>

    <!-- Loading Skeleton -->
    <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1">
      <div v-for="i in 3" :key="i" class="bg-gray-100/50 rounded-xl p-4 animate-pulse">
        <div class="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>
        <div class="space-y-4">
          <div v-for="j in 3" :key="j" class="bg-white rounded-xl h-24 border border-gray-100"></div>
        </div>
      </div>
    </div>

    <!-- Kanban Columns -->
    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6 flex-1 min-h-0">
      <TaskColumn 
        title="To Do" 
        status="todo"
        :tasks="todoTasks"
        @update-list="handleListUpdate"
        @task-moved="handleTaskMoved"
        @edit-task="openEditModal"
        @delete-task="handleDeleteTask"
      />
      <TaskColumn 
        title="In Progress" 
        status="in-progress"
        :tasks="inProgressTasks"
        @update-list="handleListUpdate"
        @task-moved="handleTaskMoved"
        @edit-task="openEditModal"
        @delete-task="handleDeleteTask"
      />
      <TaskColumn 
        title="Done" 
        status="done"
        :tasks="doneTasks"
        @update-list="handleListUpdate"
        @task-moved="handleTaskMoved"
        @edit-task="openEditModal"
        @delete-task="handleDeleteTask"
      />
    </div>

    <TaskModal 
      :is-open="isModalOpen"
      :task="editingTask"
      @close="isModalOpen = false"
      @submit="handleModalSubmit"
    />
  </div>
</template>
