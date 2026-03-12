<script setup>
import { computed } from 'vue'
import draggable from 'vuedraggable'
import TaskCard from './TaskCard.vue'

const props = defineProps({
  status: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  tasks: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['update-list', 'edit-task', 'delete-task'])

// Create a v-model proxy for the array
const listElements = computed({
  get: () => props.tasks,
  set: (val) => emit('update-list', props.status, val)
})

const onDragChange = (evt) => {
  // If task added to THIS list, the API call should be made to update its status
  if (evt.added) {
    const task = evt.added.element
    // emit to parent to handle API patch
    emit('task-moved', { taskId: task._id, newStatus: props.status })
  }
}
</script>

<template>
  <div class="flex flex-col bg-gray-100/50 rounded-xl p-4 min-h-[500px] h-full transition-colors border border-gray-200/50" :class="{
    'hover:bg-blue-50/30': status === 'todo',
    'hover:bg-yellow-50/30': status === 'in-progress',
    'hover:bg-green-50/30': status === 'done'
  }">
    <!-- Column Header -->
    <div class="flex items-center justify-between mb-4 px-1">
      <div class="flex items-center gap-2">
        <div 
          class="w-2.5 h-2.5 rounded-full"
          :class="{
            'bg-blue-500': status === 'todo',
            'bg-yellow-500': status === 'in-progress',
            'bg-green-500': status === 'done'
          }"
        ></div>
        <h2 class="font-semibold text-gray-700 text-sm uppercase tracking-wider">{{ title }}</h2>
      </div>
      <span class="bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full text-xs font-medium">
        {{ tasks.length }}
      </span>
    </div>

    <!-- Draggable Area -->
    <draggable
      v-model="listElements"
      group="tasks"
      item-key="_id"
      class="flex-1 overflow-y-auto space-y-3 pb-4 h-full"
      ghost-class="drag-ghost"
      drag-class="drag-drag"
      animation="200"
      @change="onDragChange"
      handle=".drag-handle"
    >
      <template #item="{ element }">
        <TaskCard 
          :task="element" 
          @edit="(e) => $emit('edit-task', e)"
          @delete="(id) => $emit('delete-task', id)"
        />
      </template>

      <!-- Empty State -->
      <template #footer v-if="tasks.length === 0">
        <div class="h-24 flex items-center justify-center border-2 border-dashed border-gray-300 rounded-xl text-gray-400 text-sm mt-2 pointer-events-none">
          No tasks yet
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped>
/* Ensure the draggable container takes up full height to allow dropping anywhere */
.flex-1 {
  min-height: 150px;
}
</style>
