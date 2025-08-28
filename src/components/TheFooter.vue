<template>
  <footer 
    class="p-6 rounded-lg text-center shadow-md transition-all duration-300" 
    :style="footerStyles"
  >
    <div class="max-w-4xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-4">
        <div class="text-center">
          <h4 class="font-semibold mb-2">Desarrollo</h4>
          <p class="text-sm opacity-80">
            Aplicación construida con Vue.js y Tailwind CSS
          </p>
        </div>
        <div class="text-center">
          <h4 class="font-semibold mb-2">Personalización</h4>
          <p class="text-sm opacity-80">
            Sistema de temas en tiempo real con persistencia local
          </p>
        </div>
        <div class="text-center">
          <h4 class="font-semibold mb-2">Características</h4>
          <p class="text-sm opacity-80">
            Reactividad, validación y gestión de estado avanzada
          </p>
        </div>
      </div>
      
      <div class="border-t border-current border-opacity-20 pt-4">
        <p class="text-sm">
          © 2025 Mi Sitio Web Personalizable. Todos los derechos reservados.
        </p>
        <p class="text-xs mt-2 opacity-70">
          Desarrollado como prueba de concepto para demostrar capacidades de Vue.js
        </p>
      </div>
    </div>
  </footer>
</template>

<script>
import { useTheme } from '../composables/principal.js';

export default {
  name: 'TheFooter',
  computed: {
    footerStyles() {
      const { getSectionStyles, getGlobalStyles } = useTheme();
      
      if (this.sectionToModify === 'footer') {
        // Si se está modificando específicamente el footer, usar sus estilos
        return getSectionStyles('footer');
      } else {
        // Si es global o se está modificando otra sección, usar estilos globales
        return getGlobalStyles();
      }
    }
  },
  setup() {
    const { 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles
    } = useTheme();
    
    return { 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles
    };
  }
};
</script>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
footer {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Efectos hover para los elementos del footer */
footer h4 {
  transition: opacity 0.2s ease-in-out;
}

footer:hover h4 {
  opacity: 1;
}

/* Responsive design */
@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>
