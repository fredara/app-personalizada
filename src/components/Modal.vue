<template>
  <div
    class="fixed z-50 inset-0 overflow-y-auto flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
    @click.self="$emit('closeModal')"
  >
    <div
      class="bg-white rounded-lg shadow-2xl transform transition-all duration-300 sm:max-w-lg sm:w-full mx-4"
      :class="modalTypeClasses"
    >
      <!-- Header del modal -->
      <div class="px-6 pt-6 pb-4">
        <div class="flex items-center">
          <!-- Icono según el tipo de mensaje -->
          <div class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:h-10 sm:w-10 mr-4"
               :class="iconClasses">
            <svg v-if="type === 'success'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            <svg v-else-if="type === 'error'" class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            <svg v-else class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1 4h-1m4-8h-4a1 1 0 00-1 1v4h2a1 1 0 011 1v2a1 1 0 001 1h-4m1-6h4a1 1 0 011 1v4h-2a1 1 0 01-1-1v-2a1 1 0 00-1-1h4m-1 6h-4a1 1 0 01-1-1v-4a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1z" />
            </svg>
          </div>
          
          <!-- Contenido del modal -->
          <div class="flex-1">
            <h3
              class="text-lg leading-6 font-semibold"
              :class="titleClasses"
              id="modal-title"
            >
              {{ title }}
            </h3>
            <div class="mt-2">
              <p class="text-sm" :class="messageClasses">
                {{ modalMessage }}
              </p>
            </div>
          </div>
          
          <!-- Botón de cerrar -->
          <button
            @click="$emit('closeModal')"
            class="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1 rounded-full hover:bg-gray-100"
            title="Cerrar modal"
          >
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- Footer del modal -->
      <div class="bg-gray-50 px-6 py-4 sm:flex sm:flex-row-reverse rounded-b-lg">
        <button
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 sm:ml-3 sm:w-auto sm:text-sm"
          :class="buttonClasses"
          @click="$emit('closeModal')"
        >
          {{ buttonText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    title: {
      type: String,
      required: true,
    },
    modalMessage: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'info',
      validator: (value) => ['success', 'error', 'info', 'warning'].includes(value)
    }
  },
  emits: ["closeModal"],
  computed: {
    modalTypeClasses() {
      const baseClasses = 'border-l-4';
      switch (this.type) {
        case 'success':
          return `${baseClasses} border-green-500`;
        case 'error':
          return `${baseClasses} border-red-500`;
        case 'warning':
          return `${baseClasses} border-yellow-500`;
        default:
          return `${baseClasses} border-blue-500`;
      }
    },
    
    iconClasses() {
      switch (this.type) {
        case 'success':
          return 'bg-green-100 text-green-600';
        case 'error':
          return 'bg-red-100 text-red-600';
        case 'warning':
          return 'bg-yellow-100 text-yellow-600';
        default:
          return 'bg-blue-100 text-blue-600';
      }
    },
    
    titleClasses() {
      switch (this.type) {
        case 'success':
          return 'text-green-900';
        case 'error':
          return 'text-red-900';
        case 'warning':
          return 'text-yellow-900';
        default:
          return 'text-gray-900';
      }
    },
    
    messageClasses() {
      switch (this.type) {
        case 'success':
          return 'text-green-700';
        case 'error':
          return 'text-red-700';
        case 'warning':
          return 'text-yellow-700';
        default:
          return 'text-gray-600';
      }
    },
    
    buttonClasses() {
      switch (this.type) {
        case 'success':
          return 'bg-green-600 hover:bg-green-700 focus:ring-green-500';
        case 'error':
          return 'bg-red-600 hover:bg-red-700 focus:ring-red-500';
        case 'warning':
          return 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
        default:
          return 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
      }
    },
    
    buttonText() {
      switch (this.type) {
        case 'success':
          return '¡Perfecto!';
        case 'error':
          return 'Entendido';
        case 'warning':
          return 'Aceptar';
        default:
          return 'Cerrar';
      }
    }
  }
};
</script>

<style scoped>
/* Animaciones del modal */
.modal-enter-active, .modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

/* Efectos hover mejorados */
button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

button:active {
  transform: translateY(0);
}
</style>

