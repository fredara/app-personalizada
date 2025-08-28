<template>
  <aside class="fixed top-4 right-5 z-50 w-96 h-fit p-6 rounded-lg shadow-xl bg-white border border-gray-200">
    <!-- Header del panel -->
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
        <h3 class="text-xl font-bold text-gray-800">
          Panel de Personalización
        </h3>
      </div>
      <button
        @click="closePanel"
        class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
        title="Cerrar panel"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Selector de sección -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Sección a personalizar
      </label>
      <select
        v-model="sectionToModify"
        @change="setSectionToModify(sectionToModify)"
        class="w-full py-2 px-3 rounded-md border border-gray-300 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
      >
        <option value="all">🌐 Global (Toda la página)</option>
        <option value="header">📋 Encabezado</option>
        <option value="content">📄 Contenido</option>
        <option value="footer">🔚 Pie de página</option>
      </select>
    </div>

    <!-- Controles de personalización -->
    <div class="space-y-4">
      <!-- Color de fondo -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          🎨 Color de fondo
          <span class="text-xs text-gray-500 ml-1">
            {{ sectionToModify === 'all' ? '(Global)' : `(${sectionToModify})` }}
          </span>
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            :value="getCurrentBgColor()"
            @input="updateBgColor"
            class="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            title="Seleccionar color"
          />
          <input
            type="text"
            :value="getCurrentBgColor()"
            @input="updateBgColorFromText"
            placeholder="#ffffff"
            class="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': !isValidBgColor }"
          />
        </div>
        <div v-if="!isValidBgColor" class="text-red-500 text-xs mt-1">
          Color inválido. Use formato hexadecimal (#ffffff)
        </div>
      </div>

      <!-- Color de texto -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          ✏️ Color de texto
          <span class="text-xs text-gray-500 ml-1">
            {{ sectionToModify === 'all' ? '(Global)' : `(${sectionToModify})` }}
          </span>
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            :value="getCurrentTextColor()"
            @input="updateTextColor"
            class="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            title="Seleccionar color"
          />
          <input
            type="text"
            :value="getCurrentTextColor()"
            @input="updateTextColorFromText"
            placeholder="#000000"
            class="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': !isValidTextColor }"
          />
        </div>
        <div v-if="!isValidTextColor" class="text-red-500 text-xs mt-1">
          Color inválido. Use formato hexadecimal (#000000)
        </div>
      </div>

      <!-- Color de título (solo para global) -->
      <div v-if="sectionToModify === 'all'" class="bg-gray-50 p-4 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          🎯 Color de títulos (Global)
        </label>
        <div class="flex items-center space-x-3">
          <input
            type="color"
            :value="previewTheme.colors.title"
            @input="updateTitleColor"
            class="w-12 h-10 rounded border border-gray-300 cursor-pointer"
            title="Seleccionar color"
          />
          <input
            type="text"
            :value="previewTheme.colors.title"
            @input="updateTitleColorFromText"
            placeholder="#1e40af"
            class="flex-1 py-2 px-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            :class="{ 'border-red-500': !isValidTitleColor }"
          />
        </div>
        <div v-if="!isValidTitleColor" class="text-red-500 text-xs mt-1">
          Color inválido. Use formato hexadecimal (#1e40af)
        </div>
      </div>
    </div>

    <!-- Botones de acción -->
    <div class="flex flex-col space-y-3 mt-6">
      <button
        @click="saveTheme"
        :disabled="!canSave"
        class="w-full py-3 px-4 rounded-md text-white font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        :class="canSave ? 'bg-blue-600 hover:bg-blue-700 active:bg-blue-800' : 'bg-gray-400'"
        title="Guardar cambios"
      >
        💾 Guardar cambios
      </button>
      
      <div class="flex space-x-2">
        <button
          @click="resetPreview"
          class="flex-1 py-2 px-4 rounded-md text-gray-700 font-medium bg-gray-200 hover:bg-gray-300 active:bg-gray-400 transition-colors duration-200"
          title="Restablecer vista previa"
        >
          🔄 Restablecer
        </button>
        <button
          @click="resetToDefault"
          class="flex-1 py-2 px-4 rounded-md text-gray-700 font-medium bg-red-100 hover:bg-red-200 active:bg-red-300 transition-colors duration-200"
          title="Restablecer a valores por defecto"
        >
          🏠 Por defecto
        </button>
      </div>
    </div>

    <!-- Información adicional -->
    <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
      <p class="text-xs text-blue-700">
        💡 Los cambios se aplican en tiempo real. Use "Guardar cambios" para persistir en el navegador.
      </p>
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
      sectionToModify,
      setSectionToModify,
      updateBackgroundColor,
      updateTextColor,
      updateTitleColor,
      saveTheme,
      resetPreview,
      resetToDefault,
      validateHexColor
    } = useTheme();

    return {
      previewTheme,
      sectionToModify,
      setSectionToModify,
      updateBackgroundColor,
      updateTextColor,
      updateTitleColor,
      saveTheme,
      resetPreview,
      resetToDefault,
      validateHexColor
    };
  },
  data() {
    return {
      isValidBgColor: true,
      isValidTextColor: true,
      isValidTitleColor: true
    };
  },
  computed: {
    canSave() {
      return this.isValidBgColor && this.isValidTextColor && 
             (this.sectionToModify !== 'all' || this.isValidTitleColor);
    }
  },
  methods: {
    closePanel() {
      this.resetPreview();
      this.$emit('closePanel');
    },

    getCurrentBgColor() {
      if (this.sectionToModify === 'all') {
        return this.previewTheme.colors.global.bgColor;
      }
      return this.previewTheme.colors[this.sectionToModify]?.bgColor || '#ffffff';
    },

    getCurrentTextColor() {
      if (this.sectionToModify === 'all') {
        return this.previewTheme.colors.global.textColor;
      }
      return this.previewTheme.colors[this.sectionToModify]?.textColor || '#000000';
    },

    updateBgColor(event) {
      const color = event.target.value;
      this.isValidBgColor = this.validateHexColor(color);
      if (this.isValidBgColor) {
        this.updateBackgroundColor(this.sectionToModify, color);
      }
    },

    updateBgColorFromText(event) {
      const color = event.target.value;
      this.isValidBgColor = this.validateHexColor(color);
      if (this.isValidBgColor) {
        this.updateBackgroundColor(this.sectionToModify, color);
      }
    },

    updateTextColor(event) {
      const color = event.target.value;
      this.isValidTextColor = this.validateHexColor(color);
      if (this.isValidTextColor) {
        this.updateTextColor(this.sectionToModify, color);
      }
    },

    updateTextColorFromText(event) {
      const color = event.target.value;
      this.isValidTextColor = this.validateHexColor(color);
      if (this.isValidTextColor) {
        this.updateTextColor(this.sectionToModify, color);
      }
    },

    updateTitleColor(event) {
      const color = event.target.value;
      this.isValidTitleColor = this.validateHexColor(color);
      if (this.isValidTitleColor) {
        this.updateTitleColor(color);
      }
    },

    updateTitleColorFromText(event) {
      const color = event.target.value;
      this.isValidTitleColor = this.validateHexColor(color);
      if (this.isValidTitleColor) {
        this.updateTitleColor(color);
      }
    },

    async saveTheme() {
      const success = await this.saveTheme();
      if (success) {
        this.$emit('themeUpdated');
        // Mostrar mensaje de éxito
        this.$emit('showMessage', {
          type: 'success',
          message: 'Tema guardado exitosamente'
        });
      } else {
        this.$emit('showMessage', {
          type: 'error',
          message: 'Error al guardar el tema'
        });
      }
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales para mejorar la experiencia del usuario */
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
}

input[type="color"]::-webkit-color-swatch {
  border: none;
  border-radius: 4px;
}

/* Animaciones suaves */
.space-y-4 > * {
  transition: all 0.2s ease-in-out;
}

/* Hover effects */
.bg-gray-50:hover {
  background-color: #f9fafb;
}
</style>
