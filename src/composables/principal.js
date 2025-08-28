import { ref, reactive, onMounted, watch } from 'vue';

// Validación de colores hex
const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;

// Tema por defecto
const defaultTheme = {
  colors: {
    global: {
      bgColor: '#f8fafc',
      textColor: '#1e293b',
    },
    header: {
      bgColor: '#1e40af',
      textColor: '#ffffff',
    },
    content: {
      bgColor: '#ffffff',
      textColor: '#334155',
    },
    footer: {
      bgColor: '#475569',
      textColor: '#ffffff',
    },
    title: '#1e40af',
  },
};

// Estado reactivo del tema
const currentTheme = reactive({ ...defaultTheme });
const previewTheme = reactive({ ...defaultTheme });
const sectionToModify = ref('all');

export function useTheme() {
  // Cargar tema desde localStorage al montar
  onMounted(() => {
    loadThemeFromStorage();
  });

  // Función para validar color hex
  const validateHexColor = (color) => {
    return hexRegex.test(color);
  };

  // Función para cargar tema desde localStorage
  const loadThemeFromStorage = () => {
    try {
      const savedTheme = localStorage.getItem('appTheme');
      if (savedTheme) {
        const parsedTheme = JSON.parse(savedTheme);
        Object.assign(currentTheme, parsedTheme);
        Object.assign(previewTheme, parsedTheme);
        console.log('Tema cargado desde localStorage:', currentTheme);
      }
    } catch (error) {
      console.error('Error al cargar tema desde localStorage:', error);
      // Si hay error, usar tema por defecto
      Object.assign(currentTheme, defaultTheme);
      Object.assign(previewTheme, defaultTheme);
    }
  };

  // Función para guardar tema en localStorage
  const saveTheme = () => {
    try {
      // Validar todos los colores antes de guardar
      const isValid = Object.values(previewTheme.colors).every(section => {
        if (typeof section === 'object') {
          return Object.values(section).every(color => validateHexColor(color));
        }
        return validateHexColor(section);
      });

      if (!isValid) {
        throw new Error('Uno o más colores no son válidos');
      }

      // Aplicar cambios al tema actual
      Object.assign(currentTheme, previewTheme);
      
      // Guardar en localStorage
      localStorage.setItem('appTheme', JSON.stringify(currentTheme));
      
      console.log('Tema guardado exitosamente:', currentTheme);
      return true;
    } catch (error) {
      console.error('Error al guardar tema:', error);
      return false;
    }
  };

  // Función para restablecer vista previa
  const resetPreview = () => {
    Object.assign(previewTheme, currentTheme);
    console.log('Vista previa restablecida');
  };

  // Función para establecer sección a modificar
  const setSectionToModify = (section) => {
    sectionToModify.value = section;
    console.log('Sección a modificar:', section);
  };

  // Función para actualizar color de fondo
  const updateBackgroundColor = (section, color) => {
    if (!validateHexColor(color)) {
      console.warn('Color inválido:', color);
      return false;
    }

    if (section === 'all') {
      previewTheme.colors.global.bgColor = color;
    } else if (previewTheme.colors[section]) {
      previewTheme.colors[section].bgColor = color;
    }
    return true;
  };

  // Función para actualizar color de texto
  const updateTextColor = (section, color) => {
    if (!validateHexColor(color)) {
      console.warn('Color inválido:', color);
      return false;
    }

    if (section === 'all') {
      previewTheme.colors.global.textColor = color;
    } else if (previewTheme.colors[section]) {
      previewTheme.colors[section].textColor = color;
    }
    return true;
  };

  // Función para actualizar color de título
  const updateTitleColor = (color) => {
    if (!validateHexColor(color)) {
      console.warn('Color de título inválido:', color);
      return false;
    }
    previewTheme.colors.title = color;
    return true;
  };

  // Función para obtener estilos de una sección específica
  const getSectionStyles = (section) => {
    const global = previewTheme.colors.global;
    const sectionColors = previewTheme.colors[section];
    
    if (!sectionColors) return {};

    return {
      backgroundColor: sectionColors.bgColor !== '#000' ? sectionColors.bgColor : global.bgColor,
      color: sectionColors.textColor !== '#fff' ? sectionColors.textColor : global.textColor,
    };
  };

  // Función para obtener estilos globales
  const getGlobalStyles = () => {
    return {
      backgroundColor: previewTheme.colors.global.bgColor,
      color: previewTheme.colors.global.textColor,
    };
  };

  // Función para obtener color de título
  const getTitleColor = () => {
    return previewTheme.colors.title;
  };

  // Función para resetear a tema por defecto
  const resetToDefault = () => {
    Object.assign(currentTheme, defaultTheme);
    Object.assign(previewTheme, defaultTheme);
    localStorage.removeItem('appTheme');
    console.log('Tema restablecido a valores por defecto');
  };

  return {
    // Estado
    currentTheme,
    previewTheme,
    sectionToModify,
    
    // Funciones
    validateHexColor,
    saveTheme,
    resetPreview,
    setSectionToModify,
    updateBackgroundColor,
    updateTextColor,
    updateTitleColor,
    getSectionStyles,
    getGlobalStyles,
    getTitleColor,
    resetToDefault,
  };
}