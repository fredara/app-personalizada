# Sistema de Temas en Tiempo Real

Una aplicación web construida con **Vue.js 3** que demuestra un sistema completo de personalización de temas en tiempo real, con persistencia local y validaciones avanzadas.

## Características Principales

### Panel de Personalización
- **Interfaz intuitiva** con controles de color visuales y de texto
- **Selección de sección** específica (Global, Header, Content, Footer)
- **Validación en tiempo real** de colores hexadecimales
- **Vista previa inmediata** de todos los cambios
- **Persistencia automática** en localStorage del navegador

### Sistema de Temas
- **Colores globales** que se aplican a toda la aplicación
- **Personalización por sección** para mayor flexibilidad
- **Colores de título** independientes para mejor jerarquía visual
- **Transiciones suaves** entre cambios de tema
- **Estilos responsivos** que se adaptan a diferentes dispositivos

### Funcionalidades Técnicas
- **Composables Vue 3** para gestión centralizada del estado
- **Reactividad completa** con cambios en tiempo real
- **Validación robusta** de entradas de usuario
- **Gestión de errores** con mensajes informativos
- **Arquitectura modular** y escalable

## Tecnologías Utilizadas

- **Vue.js 3** - Framework principal con Composition API
- **Tailwind CSS** - Framework de utilidades CSS
- **Vite** - Herramienta de construcción rápida
- **LocalStorage** - Persistencia de datos del usuario

## Estructura del Proyecto

```
app-personalizada/
├── src/
│   ├── components/
│   │   ├── CustomizationPanel.vue    # Panel principal de personalización
│   │   ├── TheHeader.vue             # Encabezado con botón de personalización
│   │   ├── TheContent.vue            # Contenido principal con tarjetas
│   │   ├── TheFooter.vue             # Pie de página informativo
│   │   └── Modal.vue                 # Modal para mensajes del sistema
│   ├── composables/
│   │   └── principal.js              # Lógica centralizada de temas
│   ├── App.vue                       # Componente raíz de la aplicación
│   └── main.js                       # Punto de entrada de la aplicación
├── public/                           # Archivos estáticos
└── package.json                      # Dependencias del proyecto
```

##  Cómo Usar

### 1. Abrir el Panel de Personalización
- Haz clic en el botón **"Personalizar"** en la esquina superior derecha
- Se abrirá el panel de configuración flotante

### 2. Seleccionar Sección a Personalizar
- **🌐 Global**: Aplica cambios a toda la aplicación
- **📋 Header**: Personaliza solo el encabezado
- **📄 Content**: Modifica el contenido principal
- **🔚 Footer**: Cambia el pie de página

### 3. Ajustar Colores
- **Color de fondo**: Usa el selector de color o escribe el código hexadecimal
- **Color de texto**: Personaliza el color del texto de la sección
- **Color de títulos**: Solo disponible para personalización global

### 4. Guardar Cambios
- Los cambios se aplican **inmediatamente** en tiempo real
- Usa **"Guardar cambios"** para persistir en el navegador
- **"Restablecer"** vuelve a la última configuración guardada
- **"Por defecto"** restaura los valores originales


### Validación de Colores
- **Formato hexadecimal**: Solo acepta colores válidos (#ffffff, #000, etc.)
- **Validación en tiempo real**: Feedback inmediato al usuario
- **Manejo de errores**: Mensajes claros para colores inválidos

### Persistencia de Datos
- **LocalStorage**: Los temas se guardan automáticamente
- **Recuperación automática**: Al recargar la página se mantienen los estilos
- **Fallback a valores por defecto**: Si hay errores, se usan colores predefinidos

## Paleta de Colores por Defecto

```javascript
const defaultTheme = {
  colors: {
    global: {
      bgColor: '#f8fafc',    // Gris muy claro
      textColor: '#1e293b',  // Gris oscuro
    },
    header: {
      bgColor: '#1e40af',    // Azul
      textColor: '#ffffff',  // Blanco
    },
    content: {
      bgColor: '#ffffff',    // Blanco
      textColor: '#334155',  // Gris medio
    },
    footer: {
      bgColor: '#475569',    // Gris azulado
      textColor: '#ffffff',  // Blanco
    },
    title: '#1e40af',        // Azul para títulos
  },
};
```

## Instalación y Desarrollo

### Requisitos Previos
- Node.js 16+ 
- npm o yarn

### Instalación
```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd app-personalizada

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
npm run dev

```

## Responsive Design

La aplicación está completamente optimizada para:
- **Móviles**: Panel de personalización adaptativo
- **Tablets**: Layout intermedio optimizado
- **Desktop**: Experiencia completa con todas las funcionalidades

## Casos de Uso

### Para Desarrolladores
- **Aprendizaje de Vue 3**: Ejemplo práctico de Composition API
- **Gestión de estado**: Patrones para manejo de temas
- **Validación de formularios**: Implementación de validaciones en tiempo real
- **Persistencia local**: Uso de localStorage para datos del usuario

### Para Usuarios Finales
- **Personalización visual**: Adaptar la interfaz a preferencias personales
- **Experimentación**: Probar diferentes combinaciones de colores
- **Accesibilidad**: Ajustar contrastes para mejor legibilidad


## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para demostrar las capacidades de Vue.js 3**