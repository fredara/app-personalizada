<template>
  <main class="p-8 rounded-lg mb-8 shadow-md" :style="{
    backgroundColor: sectionToModify === 'all' && previewTheme.colors.content.bgColor === '#000' ? previewTheme.colors.global.bgColor : sectionToModify === 'content' && previewTheme.colors.content.bgColor === '#000' ? previewTheme.colors.global.bgColor : sectionToModify === 'content' && previewTheme.colors.content.bgColor != '#000' ? previewTheme.colors.content.bgColor : sectionToModify === 'header' || sectionToModify === 'footer' ? previewTheme.colors.global.bgColor :  previewTheme.colors.content.bgColor,
    color: 
    sectionToModify === 'all' && previewTheme.colors.content.textColor === '#fff' 
    ? previewTheme.colors.global.textColor 
    : sectionToModify === 'content' && previewTheme.colors.content.textColor === '#fff' 
    ? previewTheme.colors.global.textColor 
    : sectionToModify === 'content' && previewTheme.colors.content.textColor != '#fff' 
    ? previewTheme.colors.content.textColor 
    : (sectionToModify === 'header' || sectionToModify === 'footer') && previewTheme.colors.content.textColor != '#fff' 
    ? previewTheme.colors.content.textColor :  previewTheme.colors.global.textColor,
  }">
    <h2 class="text-3xl font-semibold mb-4" :style="{ color: previewTheme.colors.title }">
      ¡Bienvenido a mi página!
    </h2>
    <p class="text-lg leading-relaxed">
      Aquí podrás leer mis últimas publicaciones y personalizarlas a tu gusto.
      Utiliza el panel de la derecha para cambiar los colores de la página en tiempo real y
      ver cómo la experiencia de lectura se transforma. Esta es una prueba de concepto
      para demostrar el manejo de estados y la personalización dinámica de temas en una
      aplicación web.
    </p>
    <p class="mt-4 text-lg leading-relaxed">
      Gracias a la reactividad de Vue, cada cambio que hagas en el panel se aplicará de
      forma inmediata.
    </p>
    <p class="mt-4 text-lg leading-relaxed">
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae praesentium consequatur explicabo veniam nihil veritatis ex eveniet labore ad culpa, saepe iste omnis? Tempora, pariatur libero velit quos magnam iste.
    </p>
    <p class="mt-4 text-lg leading-relaxed">
      Si quieres conocer más sobre cómo se construyó esta aplicación,
      <a class="underline" href="https://github.com/fredaran/app-personalizada" target="_blank" rel="noopener noreferrer">visita el repositorio en GitHub</a>.
    </p>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
      <div v-for="(_, index) in tarjetas" :key="index" class="bg-gray-700 p-4 rounded-lg shadow-md">
        <h4 class="text-xl font-semibold mb-2">Tarjeta {{ index + 1 }}</h4>
        <p class="text-lg leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.
        </p>
      </div>
    </div>
  </main>
</template>

<script>
import { useTheme } from '../composables/principal';

export default {
  name: 'TheContent',
  data() {
    return {
      tarjetas: Array.from({ length: 6 }, (_, i) => `Tarjeta ${i + 1}`)
    };
  },
  setup() {
    const { previewTheme, sectionToModify } = useTheme();
    return {
      previewTheme,
      sectionToModify
    };
  }
};
</script>
<style scoped></style>
