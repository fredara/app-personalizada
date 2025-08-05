<template>
  <div class="min-h-screen p-2 md:p-1 bg-gray-100 font-sans antialiased">
    <div class="container mx-auto flex flex-row">
      <div class="lg:col-span-2 flex flex-col pr-2">
        <TheHeader />
        <TheContent />
        <TheFooter />
      </div>
    </div>

    <Modal v-if="modal" :title="modalTitle" :modalMessage="modalMessage" @closeModal="closeModal" />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheContent from './components/TheContent.vue';
import TheFooter from './components/TheFooter.vue';
import Modal from './components/Modal.vue';


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
      viewPanel: false,
      modal: false,
      modalMessage: '',
      modalTitle: '',
    };
  },
  methods: {
    closeModal() {
      this.modal = false;
      this.modalMessage = '';
    }
  }
};

</script>

<style scoped></style>