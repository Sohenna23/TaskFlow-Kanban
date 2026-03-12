<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  isOpen: Boolean,
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'submit'])

const title = ref('')
const description = ref('')
const status = ref('todo')

// Watch for changes when editing a task
watch(() => props.task, (newTask) => {
  if (newTask) {
    title.value = newTask.title || ''
    description.value = newTask.description || ''
    status.value = newTask.status || 'todo'
  } else {
    title.value = ''
    description.value = ''
    status.value = 'todo'
  }
}, { immediate: true })

const handleSubmit = () => {
  if (!title.value.trim()) return

  emit('submit', {
    ...props.task,
    title: title.value,
    description: description.value,
    status: status.value
  })
}
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Backdrop -->
    <div class="absolute inset-0 bg-gray-900/40 backdrop-blur-sm transition-opacity" @click="$emit('close')"></div>

    <!-- Modal Form -->
    <div class="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all">
      <div class="flex items-center justify-between mb-5">
        <h3 class="text-xl font-semibold text-gray-900">
          {{ task ? 'Edit Task' : 'Create New Task' }}
        </h3>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-600 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Title <span class="text-red-500">*</span></label>
          <input 
            v-model="title" 
            id="title" 
            type="text" 
            required
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-400"
            placeholder="e.g. Design homepage layout"
          />
        </div>

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            v-model="description" 
            id="description" 
            rows="3"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all placeholder-gray-400 resize-none"
            placeholder="Add details about this task..."
          ></textarea>
        </div>

        <div>
          <label for="status" class="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <select 
            v-model="status" 
            id="status"
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white transition-all"
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div class="pt-4 flex items-center justify-end gap-3">
          <button 
            type="button" 
            @click="$emit('close')"
            class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            :disabled="!title.trim()"
            class="px-4 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ task ? 'Save Changes' : 'Create Task' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
