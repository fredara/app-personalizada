<template>
  <main 
    class="p-8 rounded-lg mb-8 shadow-md transition-all duration-300" 
    :style="contentStyles"
  >
    <h2 class="text-3xl font-semibold mb-4" :style="{ color: titleColor }">
      ¡Bienvenido a mi página!
    </h2>
    
    <p class="text-lg leading-relaxed mb-4">
      Aquí podrás leer mis últimas publicaciones y personalizarlas a tu gusto.
      Utiliza el panel de la derecha para cambiar los colores de la página en tiempo real y
      ver cómo la experiencia de lectura se transforma. Esta es una prueba de concepto
      para demostrar el manejo de estados y la personalización dinámica de temas en una
      aplicación web.
    </p>
    
    <p class="text-lg leading-relaxed mb-4">
      Gracias a la reactividad de Vue, cada cambio que hagas en el panel se aplicará de
      forma inmediata, permitiéndote experimentar con diferentes combinaciones de colores
      hasta encontrar la que mejor se adapte a tus preferencias.
    </p>
    
    <p class="text-lg leading-relaxed mb-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae praesentium consequatur 
      explicabo veniam nihil veritatis ex eveniet labore ad culpa, saepe iste omnis? Tempora, 
      pariatur libero velit quos magnam iste.
    </p>
    
    <p class="text-lg leading-relaxed mb-6">
      Si quieres conocer más sobre cómo se construyó esta aplicación,
      <a 
        class="underline hover:opacity-80 transition-opacity duration-200" 
        href="https://github.com/fredara/app-personalizada" 
        target="_blank" 
        rel="noopener noreferrer"
      >
        visita el repositorio en GitHub
      </a>.
    </p>
    
    <!-- Tarjetas de contenido -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      <div 
        v-for="(card, index) in cards" 
        :key="index" 
        class="bg-opacity-90 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-opacity-20 transition-all duration-300 hover:shadow-xl hover:scale-105"
        :style="cardStyles"
      >
        <div class="flex items-center mb-3">
          <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm mr-3">
            {{ index + 1 }}
          </div>
          <h4 class="text-xl font-semibold">Tarjeta {{ index + 1 }}</h4>
        </div>
        <p class="text-base leading-relaxed opacity-90">
          {{ card.description }}
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { useTheme } from '../composables/principal.js';

export default {
  name: 'TheContent',
  data() {
    return {
      cards: [
        {
          description: 'Esta es la primera tarjeta de contenido que demuestra cómo se pueden personalizar diferentes elementos de la interfaz.'
        },
        {
          description: 'La segunda tarjeta muestra la flexibilidad del sistema de temas y cómo se aplican los cambios en tiempo real.'
        },
        {
          description: 'La tercera tarjeta ilustra la capacidad de personalización específica por sección o global de toda la aplicación.'
        },
        {
          description: 'Esta tarjeta adicional demuestra que el sistema puede manejar múltiples elementos de contenido de manera eficiente.'
        },
        {
          description: 'La quinta tarjeta muestra cómo los estilos se aplican de manera consistente a través de toda la interfaz.'
        },
        {
          description: 'La última tarjeta completa el conjunto y demuestra la robustez del sistema de personalización implementado.'
        }
      ]
    };
  },
  computed: {
    contentStyles() {
      const { getSectionStyles, getGlobalStyles } = useTheme();
      
      if (this.sectionToModify === 'content') {
        // Si se está modificando específicamente el contenido, usar sus estilos
        return getSectionStyles('content');
      } else {
        // Si es global o se está modificando otra sección, usar estilos globales
        return getGlobalStyles();
      }
    },
    
    titleColor() {
      const { getTitleColor } = useTheme();
      return getTitleColor();
    },
    
    cardStyles() {
      // Estilos para las tarjetas basados en el tema actual
      const { previewTheme } = useTheme();
      const global = previewTheme.colors.global;
      
      return {
        backgroundColor: `${global.bgColor}20`, // 20% de opacidad
        color: global.textColor,
        borderColor: global.textColor
      };
    }
  },
  setup() {
    const { 
      previewTheme, 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles,
      getTitleColor
    } = useTheme();
    
    return { 
      previewTheme, 
      sectionToModify,
      getSectionStyles,
      getGlobalStyles,
      getTitleColor
    };
  }
};
</script>

<style scoped>
/* Estilos adicionales para mejorar la apariencia */
main {
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

/* Efectos hover para las tarjetas */
.card {
  transition: all 0.3s ease-in-out;
}

/* Estilos para los enlaces */
a {
  color: inherit;
  text-decoration: underline;
  text-underline-offset: 2px;
}

/* Mejoras en la tipografía */
h2 {
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive design mejorado */
@media (max-width: 640px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>
