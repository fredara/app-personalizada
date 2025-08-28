<template>
  <div 
    class="min-h-screen p-2 md:p-1 font-sans antialiased transition-all duration-300" 
    :style="appStyles"
  >
    <div class="container mx-auto flex flex-col">
      <TheHeader 
        @themeUpdated="handleThemeUpdate"
        @showMessage="showMessage"
      />
      <TheContent />
      <TheFooter />
    </div>

    <!-- Modal para mensajes -->
    <Modal 
      v-if="modal.show" 
      :title="modal.title" 
      :modalMessage="modal.message" 
      :type="modal.type"
      @closeModal="closeModal" 
    />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheContent from './components/TheContent.vue';
import TheFooter from './components/TheFooter.vue';
import Modal from './components/Modal.vue';
import { useTheme } from './composables/principal.js';

export default {
  name: 'App',
  components: {
    TheHeader,
    TheContent,
    TheFooter,
    Modal
  },
  data() {
    return {
      modal: {
        show: false,
        title: '',
        message: '',
        type: 'info'
      }
    };
  },
  computed: {
    appStyles() {
      const { getGlobalStyles } = useTheme();
      return getGlobalStyles();
    }
  },
  setup() {
    const { getGlobalStyles } = useTheme();
    return { getGlobalStyles };
  },
  methods: {
    handleThemeUpdate() {
      console.log('Tema actualizado en App.vue');
      // Aquí se pueden agregar acciones adicionales cuando se actualiza el tema
    },
    
    showMessage(messageData) {
      this.modal = {
        show: true,
        title: messageData.type === 'success' ? 'Éxito' : 
               messageData.type === 'error' ? 'Error' : 'Información',
        message: messageData.message,
        type: messageData.type
      };
    },
    
    closeModal() {
      this.modal.show = false;
      this.modal.title = '';
      this.modal.message = '';
      this.modal.type = 'info';
    }
  }
};
</script>

<style>
/* Estilos globales de la aplicación */
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* Transiciones suaves para toda la aplicación */
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}

/* Scrollbar personalizada */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.5);
}

/* Mejoras en el focus para accesibilidad */
*:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Animaciones de entrada */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>