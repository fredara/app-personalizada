<template>
  <div class="flex flex-row justify-between items-center gap-2">
    <header
      class="py-4 px-6 rounded-lg mb-2 shadow-md w-full"
      :style="headerStyle"
    >
      <h1 class="text-2xl font-bold">Mi App Personalizable</h1>
    </header>
    <div v-if="viewPanel" class="lg:col-span-1 flex justify-center items-start h-auto">
      <CustomizationPanel @closePanel="closePanel" @themeUpdated="themeUpdated" />
    </div>
    <div v-else class="lg:col-span-1 px-1 flex justify-start items-start h-auto w-auto">
      <button
        @click="viewPanel = true"
        class="px-4 bg-gray-600 text-white rounded-md shadow-md hover:bg-gray-700 transition-colors duration-300 h-15 hover:cursor-pointer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import { useTheme } from '../composables/principal';
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
    headerStyle() {
      const isAll = this.sectionToModify === 'all';
      const isHeader = this.sectionToModify === 'header';
      const globalBg = this.previewTheme.colors.global.bgColor;
      const headerBg = this.previewTheme.colors.header.bgColor;
      const globalText = this.previewTheme.colors.global.textColor;
      const headerText = this.previewTheme.colors.header.textColor;

      return {
        backgroundColor: isAll && headerBg === '#000' ? globalBg :
                         isHeader && headerBg === '#000' ? globalBg :
                         isHeader && headerBg !== '#000' ? headerBg :
                         headerBg,
        color: isAll && headerText === '#fff' ? globalText :
               isHeader && headerText === '#fff' ? globalText :
               isHeader && headerText !== '#fff' ? headerText :
               headerText
      };
    }
  },
  setup() {
    const { previewTheme, sectionToModify } = useTheme();
    return {
      previewTheme,
      sectionToModify
    };
  },
  methods: {
    closePanel() {
      console.log('Panel cerrado');
      this.viewPanel = false;
    },
    themeUpdated() {
      console.log('Tema actualizado');
      this.viewPanel = false;
      this.$emit('themeUpdated');
    }
  }
};
</script>

<style scoped></style>
