import { ref, onMounted } from 'vue';

const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

let theme = {
  colors: {
    global: {
      bgColor: '#1c293a',
      textColor: '#fff',
    },
    header: {
      bgColor: '#000',
      textColor: '#fff',
    },
    footer: {
      bgColor: '#000',
      textColor: '#fff',
    },
    content: {
      bgColor: '#000',
      textColor: '#fff',
    },
    title: {
      color: '#4c51bf',
    },
  },
};

const previewTheme = ref({ ...theme });
const sectionToModify = ref('all');

export function useTheme() {
  onMounted(() => {
    console.log('useTheme: Composable montado. Cargando desde localStorage.');
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        previewTheme.value = { ...previewTheme.value, ...parsedTheme };
      } catch (e) {
        console.error("Error al analizar el tema de localStorage", e);
      }
    } else {
      console.log('useTheme: No se encontró tema guardado, usando tema por defecto.');
      localStorage.setItem('appTheme', JSON.stringify(previewTheme.value));
    }
    console.log('useTheme: Tema cargado y sincronizado.', previewTheme.value);
  });

  

  const setSectionToModify = (section) => {
    sectionToModify.value = section;

    console.log('useTheme: Sección a modificar establecida a', section);
  };

  const saveTheme = () => {
    localStorage.setItem('appTheme', JSON.stringify(previewTheme.value));
    console.log('useTheme: ¡Tema guardado!', previewTheme.value);
  };

  const resetPreview = () => {
    const savedTheme = localStorage.getItem('appTheme');
    if (savedTheme) {
      try {
        const parsedTheme = JSON.parse(savedTheme);
        previewTheme.value = { ...previewTheme.value, ...parsedTheme };
      } catch (e) {
        console.error("Error al analizar el tema de localStorage", e);
      }
    }
    console.log('useTheme: Vista previa restablecida.', previewTheme.value);
  };

  const setGlobalBgColor = (color) => {
    console.log('useTheme: Estableciendo color de fondo global a', color);
  };  

  return {
    previewTheme,
    saveTheme,
    resetPreview,
    sectionToModify,
    setSectionToModify,
    setGlobalBgColor
  };
}