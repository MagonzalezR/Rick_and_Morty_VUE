<template>
  <transition>
    <div class="mascara-modal">
      <div class="envoltura-modal">
        <div class="tarjeta-modal">
          <h1 class="titulo-modal">Character filter</h1>
          <form
            class="modal-form"
            @submit.prevent="filtrarPor"
          >
            <va-input  class="mt-3" label="Name" v-model="nombre" />

            <va-select
              class="mt-3"
              label="status"
              v-model="statusValue"
              :options="status"
              clearable
            />

            <va-input class="mt-3" label="specie" v-model="species" />

            <va-input class="mt-3" label="type" v-model="type" />

            <va-select
              class="mt-3"
              label="gender"
              v-model="genderValue"
              :options="gender"
              clearable
            />

            <va-button type="submit" class="mt-3"> Apply </va-button>
          </form>
        </div>
        <div class="close-modal" @click="cerrarModal"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    data(){
    return {
        nombre:'',
        statusValue:'',
        status:['alive', 'dead', 'unknown'],
        species:'',
        type:'',
        genderValue:'',
        gender:['male','female','genderless','unknown'],
    }
    },
  methods: {
    cerrarModal() {
      this.$emit("_cerrarModal");
    },
    filtrarPor(){
        this.$emit("_filtrar",[this.nombre,this.statusValue,this.species,this.type,this.genderValue]);
    },
  },
};
</script>
<style scoped>
.mascara-modal {
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0000005f;
  transition: opacity 0.3 ease;
  overflow-y: auto;
  overflow-x: hidden;
}
.envoltura-modal {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 102;
}
.tarjeta-modal {
  min-width: 50%;
  max-width: 90%;
  padding: 5px;
  background-color: #C6D6C3;
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  overflow-y: auto;
  overflow-x: hidden;
}
.close-modal {
  width: 100%;
  height: 100vh;
}
.titulo-modal{
    font-size: 1.5rem;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color:#134009;

}
.modal-form{
    width: 300px;
    margin: 20px auto;
}
</style>