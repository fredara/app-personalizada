<template>
  <aside class="fixed top-4 right-5 z-50 w-92 h-fit p-6 rounded-lg shadow-xl bg-white">
    <div class="flex items-center mb-4">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-gray-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
      </svg>
      <h3 class="text-xl font-bold text-gray-800">
        Panel de Personalización
      </h3>
      <button
        @click="closePanel"
        class="ml-auto text-sm hover:text-gray-700 transition-colors duration-300 w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 bg-red-500 text-white hover:cursor-pointer"
      >
        X
      </button>
    </div>
    <div class="space-y-4">
      <div class="flex gap-4">
        <select
          v-model="sectionToModify"
          class="w-full py-2 px-4 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-200"
          @change="setSectionToModify(sectionToModify)"
        >
          <option value="all" class="text-gray-700">Todo</option>
          <option value="header" class="text-gray-700">Header</option>
          <option value="footer" class="text-gray-700">Footer</option>
          <option value="content" class="text-gray-700">Contenido</option>
        </select>
      </div>
      <div class="mt-4">
        <label class="block text-sm font-medium text-gray-600 mb-1">
          Color de Fondo {{ sectionToModify === 'all' ? 'Global' : sectionToModify.toUpperCase() }}
        </label>
        <input
          v-if="sectionToModify === 'all'"
          type="color"
          v-model="previewTheme.colors.global.bgColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'header'"
          type="color"
          v-model="previewTheme.colors.header.bgColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'footer'"
          type="color"
          v-model="previewTheme.colors.footer.bgColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'content'"
          type="color"
          v-model="previewTheme.colors.content.bgColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-600 mb-1">
          Color de Texto {{ sectionToModify === 'all' ? 'Global' : sectionToModify.toUpperCase() }}
        </label>
        <input
          v-if="sectionToModify === 'all'"
          type="color"
          v-model="previewTheme.colors.global.textColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'header'"
          type="color"
          v-model="previewTheme.colors.header.textColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'footer'"
          type="color"
          v-model="previewTheme.colors.footer.textColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
        <input
          v-else-if="sectionToModify === 'content'"
          type="color"
          v-model="previewTheme.colors.content.textColor"
          class="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div v-if="sectionToModify === 'all'">
        <label class="block text-sm font-medium text-gray-600 mb-1">
          Color de Títulos {{ sectionToModify === 'all' ? 'Global' : sectionToModify.toUpperCase() }}
        </label>
        <input
          type="color"
          v-model="previewTheme.colors.title"
          class="w-full h-10 rounded-md border-gray-300"
        />
      </div>
      <div class="flex gap-4 mt-6">
        <button
          @click="resetPreview"
          class="w-full py-2 px-4 rounded-md text-gray-700 font-semibold transition-colors duration-300"
          :style="{ backgroundColor: '#e5e7eb' }"
        >
          Restablecer
        </button>
        <button
          @click="SaveColors"
          class="w-full py-2 px-4 rounded-md text-white font-semibold transition-colors duration-300 bg-[#3b82f6]"
        >
          Guardar
        </button>
      </div>
    </div>
  </aside>
</template>

<script>
import { useTheme } from '../composables/principal.js';

export default {
  name: 'CustomizationPanel',
  setup() {
    const {
      previewTheme,
      resetPreview,
      saveTheme,
      sectionToModify,
      setSectionToModify,
      setGlobalBgColor
    } = useTheme();
    return {
      previewTheme,
      resetPreview,
      saveTheme,
      sectionToModify,
      setSectionToModify,
      setGlobalBgColor
    };
  },
  methods: {
    closePanel() {
      this.resetPreview();
      this.$emit('closePanel');
    },
    SaveColors() {
      this.saveTheme();
      this.$emit('themeUpdated', this.previewTheme);
    }
  }
};
</script>
