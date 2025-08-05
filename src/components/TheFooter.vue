<template>
  <footer class="p-4 rounded-lg text-center shadow-md" :style="{
    backgroundColor: getBackgroundColor(sectionToModify, previewTheme),
    color: getTextColor(sectionToModify, previewTheme),
  }">
    <p class="text-sm"> 2025 Mi Sitio Web. Todos los derechos reservados.</p>
  </footer>
</template>

<script>
import { useTheme } from '../composables/principal';

export default {
  name: 'TheFooter',
  setup() {
    const { previewTheme, sectionToModify } = useTheme();

    const getBackgroundColor = (section, theme) => {
      if (section === 'all' && theme.colors.footer.bgColor === '#000') {
        return theme.colors.global.bgColor;
      }

      if (section === 'footer' && theme.colors.footer.bgColor === '#000') {
        return theme.colors.global.bgColor;
      }

      if (section === 'footer' && theme.colors.footer.bgColor !== '#000') {
        return theme.colors.footer.bgColor;
      }

      if (section === 'header' || section === 'content') {
        return theme.colors.global.bgColor;
      }

      return theme.colors.footer.bgColor;
    };

    const getTextColor = (section, theme) => {
      if (section === 'all' && theme.colors.footer.textColor === '#fff') {
        return theme.colors.global.textColor;
      }

      if (section === 'footer' && theme.colors.footer.textColor === '#fff') {
        return theme.colors.global.textColor;
      }

      if (section === 'footer' && theme.colors.footer.textColor !== '#fff') {
        return theme.colors.footer.textColor;
      }

      if (section === 'header' || section === 'content') {
        return theme.colors.global.textColor;
      }

      return theme.colors.footer.textColor;
    };

    return {
      previewTheme,
      sectionToModify,
      getBackgroundColor,
      getTextColor,
    };
  },
};
</script>

<style scoped></style>
