<script setup>
import KanbanBoard from './components/KanbanBoard.vue'
</script>

<template>
  <div class="flex flex-col min-h-screen bg-[#f4f7f8]">
    <!-- Top Navbar -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center text-white font-bold shadow-sm">
          TF
        </div>
        <h1 class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600">
          TaskFlow Kanban
        </h1>
      </div>
      
      <!-- Optional User Profile Avatar placeholder -->
      <div class="flex items-center gap-4">
        <div class="w-10 h-10 rounded-full border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-gray-400 overflow-hidden">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clip-rule="evenodd" />
          </svg>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-1 overflow-x-auto p-6 md:px-8 max-w-[1600px] mx-auto w-full">
      <KanbanBoard />
    </main>
  </div>
</template>

<style>
/* Any App-level animation or styles can go here */
</style>
