<script setup>
import { computed } from 'vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['edit', 'delete'])

const formattedDate = computed(() => {
  if (!props.task.createdAt) return ''
  const date = new Date(props.task.createdAt)
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(date)
})
</script>

<template>
  <div class="bg-white rounded-xl smooth-shadow hover-elevate border border-gray-100 p-4 mb-3 group cursor-pointer relative overflow-hidden transition-all duration-200">
    <!-- Left border colored accent based on status -->
    <div 
      class="absolute left-0 top-0 bottom-0 w-1"
      :class="{
        'bg-blue-400': task.status === 'todo',
        'bg-yellow-400': task.status === 'in-progress',
        'bg-green-400': task.status === 'done'
      }"
    ></div>

    <div class="flex items-start gap-2">
      <!-- Drag Handle Icon -->
      <div class="mt-0.5 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing flex-shrink-0 drag-handle">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
        </svg>
      </div>

      <div class="flex-1 min-w-0">
        <h4 class="text-[15px] font-semibold text-gray-800 leading-tight mb-1 truncate" :title="task.title">
          {{ task.title }}
        </h4>
        <p v-if="task.description" class="text-xs text-gray-500 line-clamp-2 mt-1 leading-relaxed">
          {{ task.description }}
        </p>
        
        <div class="mt-3 flex items-center justify-between">
          <span class="text-[11px] font-medium text-gray-400 flex items-center gap-1">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-3.5 h-3.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {{ formattedDate }}
          </span>

          <!-- Actions (visible on hover) -->
          <div class="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button @click.stop="$emit('edit', task)" class="text-gray-400 hover:text-brand-600 transition-colors p-1 rounded-md hover:bg-brand-50" title="Edit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
              </svg>
            </button>
            <button @click.stop="$emit('delete', task._id)" class="text-gray-400 hover:text-red-600 transition-colors p-1 rounded-md hover:bg-red-50" title="Delete">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
