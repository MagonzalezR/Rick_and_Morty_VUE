<template>
  <div class="main-personajes">
    <div class="head-title">
      <va-button icon="filter_alt" flat class="filtro" @click="cambiarModal"
        ></va-button
      >
      <!--va-modal v-model="showModal" :message="message" title="Overview" /-->
    </div>
    <div class="personaje">
      <va-card
        stripe
        class="tarjeta"
        v-for="(personaje, index) in personajes"
        :key="index"
        @click="abrirModalPersonaje(personaje)"
      >
        <va-image :src="personaje.image" style="height: 200px" />
        <va-card-title :text-color="estados[personaje.status]"
          >{{ index }}. {{ personaje.name }}</va-card-title
        >
        <va-card-content
          >{{ personaje.name }}.<br />{{ personaje.species }}<br />{{
            personaje.status
          }}</va-card-content
        >
      </va-card>
    </div>
  </div>
  <character-pop-up
    @_filtrar="filtrar"
    @_cerrarModal="cambiarModal"
    v-if="showModal"
  />
  <va-pagination
    v-model="page"
    color="#093015"
    hide-on-single-page
    :pages="info.pages"
    :visible-pages="4"
    @click="cambiarPagina"
    class="paginacion"
  />

  <va-modal v-model="verModalPersonaje" no-padding size="small">
    <template #content="{ ok }">
      <va-image :src="modalDatos.image" />
      <va-card-title>
        {{ modalDatos.name }}
      </va-card-title>
      <va-card-content>
        This is {{ modalDatos.name }}, is from the {{modalDatos.species}} species <br/>
        Appears in the following chapters
        <p v-for="(episodio, i) in modalEpisodios" :key="i">
          {{ episodio }}
        </p>
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok" color="warning">Ok!</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>

<script>
import CharacterPopUp from "@/components/CharacterPopUp.vue";
export default {
  components: { CharacterPopUp },
  data() {
    return {
      personajes: [],
      modalEpisodios: [],
      modalDatos: {},
      info: {},
      estados: { Dead: "#B62918", Alive: "#90F02B", unknown: "#7863F0" },
      filtros: {
        name: "",
        status: "",
        species: "",
        type: "",
        gender: "",
      },
      page: 1,
      showModal: false,
      verModalPersonaje: false,
    };
  },
  methods: {
    getEpisodes(episodios) {
      this.modalEpisodios = [];
      for (const episodio of episodios) {
        this.axios({
          method: "get",
          url: episodio,
        }).then((response) => {
          this.modalEpisodios.push(response.data.name);
        });
      }
    },
    getData() {
      const parameters = new URLSearchParams();
      parameters.append("name", this.filtros.name);
      parameters.append("status", this.filtros.status);
      parameters.append("species", this.filtros.species);
      parameters.append("type", this.filtros.type);
      parameters.append("gender", this.filtros.gender);
      parameters.append("page", this.page);
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/character",
        params: parameters,
      }).then((response) => {
        this.personajes = response.data.results;
        this.info = response.data.info;
        console.log(response.data);
      });
    },
    cambiarModal() {
      this.showModal = !this.showModal;
    },
    abrirModalPersonaje(personaje) {
      this.verModalPersonaje = true;
      this.modalDatos = personaje;
      this.getEpisodes(personaje.episode);
    },
    cambiarPagina() {
      this.getData();
    },
    filtrar(data) {
      console.log(data);
      this.filtros.name = data[0];
      this.filtros.status = data[1];
      this.filtros.species = data[2];
      this.filtros.type = data[3];
      this.filtros.gender = data[4];
      this.showModal = false;
      this.getData();
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>
.tarjeta {
  border: 1px;
  margin: 20px;
  width: 20%;
}
.tarjeta:hover {
  box-shadow: 3px 3px 18px 4px rgba(45, 224, 182, 0.3);
}
.main-personajes {
  width: 90vw;
  margin: auto;
}
.personaje {
  width: 80vw;
  display: flex;
  border: 1px;
  margin: 10px auto;
  flex-wrap: wrap;
  justify-content: space-between;
}
.filtro {
  margin-right: 30px;
}
.paginacion {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
</style>