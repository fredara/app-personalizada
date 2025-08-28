<template>
  <div class="flex flex-row justify-between items-center gap-2">
    <header
      class="py-4 px-6 rounded-lg mb-2 shadow-md w-full transition-all duration-300"
      :style="headerStyles"
    >
      <h1 class="text-2xl font-bold">Mi App Personalizable</h1>
      <p class="text-sm mt-1 opacity-80">Personaliza la apariencia en tiempo real</p>
    </header>
    
    <!-- Panel de personalización -->
    <div v-if="viewPanel" class="lg:col-span-1 flex justify-center items-start h-auto">
      <CustomizationPanel 
        @closePanel="closePanel" 
        @themeUpdated="themeUpdated"
        @showMessage="showMessage"
      />
    </div>
    
    <!-- Botón para abrir panel -->
    <div v-else class="lg:col-span-1 px-1 flex justify-start items-start h-auto w-auto">
      <button
        @click="openPanel"
        class="px-4 py-3 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 h-15 hover:cursor-pointer flex items-center space-x-2"
        title="Abrir panel de personalización"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
        </svg>
        <span class="hidden sm:inline">Personalizar</span>
      </button>
    </div>
  </div>
</template>

<script>
import { useTheme } from '../composables/principal.js';
import CustomizationPanel from './CustomizationPanel.vue';

export default {
  name: 'TheHeader',
  components: {
    CustomizationPanel
  },
  data() {
    return {
      viewPanel: false
    };
  },
  computed: {
    headerStyles() {
      // Usar las nuevas funciones del composable para obtener estilos
      const { getSectionStyles, getGlobalStyles } = useTheme();
      
      if (this.sectionToModify === 'header') {
        // Si se está modificando específicamente el header, usar sus estilos
        return getSectionStyles('header');
      } else {
        // Si es global o se está modificando otra sección, usar estilos globales
        return getGlobalStyles();
      }
    }
  },
  setup() {
    const { 
      previewTheme, 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles
    } = useTheme();
    
    return { 
      previewTheme, 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles
    };
  },
  methods: {
    openPanel() {
      this.viewPanel = true;
    },
    
    closePanel() {
      this.viewPanel = false;
    },
    
    themeUpdated() {
      this.viewPanel = false;
      this.$emit('themeUpdated');
    },
    
    showMessage(messageData) {
      // Emitir mensaje para que el componente padre lo maneje
      this.$emit('showMessage', messageData);
    }
  }
};
</script>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
header {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Animación suave para el botón */
button {
  transform: translateY(0);
  transition: all 0.2s ease-in-out;
}

button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}
</style>
