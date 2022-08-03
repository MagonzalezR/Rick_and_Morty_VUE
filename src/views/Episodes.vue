<template>
  <div class="main-personajes">
    <div class="personaje">
      <va-input
        class="flex mb-2 md3"
        type="number"
        placeholder="Page..."
        label="Current page"
        v-model.number="currentPage"
      />
      <va-input
        class="flex mb-2 md3"
        placeholder="Filter..."
        v-model="filter"
      />
      <va-data-table
        :items="episodes"
        :columns="columns"
        :animated="true"
        :per-page="perPage"
        :current-page="currentPage"
        :filter="filter"
        :clickable="true"
        :row-bind="getRowBind"
        @filtered="filtered = $event.items"
        @row:click="handleClick"
      >
        <template #bodyAppend>
          <tr>
            <td colspan="8" class="table-example--pagination">
              <va-pagination
                class="paginacion"
                v-model="currentPage"
                input
                :pages="pages"
              />
            </td>
          </tr>
        </template>
      </va-data-table>
    </div>
  </div>
  <va-modal v-model="verModalPersonaje" no-padding size="small">
    <template #content="{ ok }">
      <va-card-title>
        {{ modalDatos.name }}
      </va-card-title>
      <va-card-content>
        This is the episode {{ rowId }} of Rick & Morty, here appears the following characters:<br/>
        <p v-for="(personaje, i) in modalPersonajes" :key="i">
          {{ personaje }}
        </p>
      </va-card-content>
      <va-card-actions>
        <va-button @click="ok" color="warning">Ok!</va-button>
      </va-card-actions>
    </template>
  </va-modal>
</template>

<script>
import { defineComponent } from "vue";
export default defineComponent({
  data() {
    const columns = [
      { key: "id", sortable: true, width: "10%" },
      { key: "name", sortable: true, width: "30%" },
      { key: "air_date", sortable: true, width: "40%" },
      { key: "episode", sortable: true, width: "20%" },
    ];
    return {
      episodes: [],
      filtered: [],
      modalPersonajes: [],
      modalDatos: {},
      currentPage: 1,
      perPage: 20,
      filter: "",
      rowId: '',
      columns,
      verModalPersonaje: false,
    };
  },
  methods: {
    getCharacters(personajes) {
      this.modalPersonajes = [];
      for (const personaje of personajes) {
        this.axios({
          method: "get",
          url: personaje,
        }).then((response) => {
          this.modalPersonajes.push(response.data.name);
        });
      }
    },
    async getEpisodes(index) {
      const parameters = new URLSearchParams();
      parameters.append("page", index);
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/episode",
        params: parameters,
      }).then((response) => {
        for (const ep of response.data.results) {
          this.episodes.push(ep);
          this.filtered.push(ep);
        }
      });
    },
    getData() {
      this.episodes = [];
      this.filtered = [];
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/episode",
      }).then((response) => {
        console.log(response.data);
        for (let index = 1; index < response.data.info.pages + 1; index++) {
          this.getEpisodes(index);
        }
      });
    },
    abrirModalPersonaje() {
      this.verModalPersonaje = true;
      this.modalDatos = this.episodes[this.rowId-1];
      this.getCharacters(this.modalDatos.characters);
    },
     handleClick (event) {
      this.rowId = event.item.id
      this.abrirModalPersonaje()
    },
    getRowBind(row) {
      const classes = ["RowClass_1"];
      if (row.episode.startsWith("S01")) {
        classes.push(["RowClass_2"]);
      } else if (row.episode.startsWith("S02")) {
        classes.push({ RowClass_3: true });
      }else if (row.episode.startsWith("S03")) {
        classes.push({ RowClass_4: true });
      }else {
        classes.push({ RowClass_5: true });
      }
      return { class: classes };
    },
  },
  mounted() {
    this.getData();
  },
  computed: {
    pages() {
      return this.perPage && this.perPage !== 0
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length;
    },
  },
});
</script>
<style >
.paginacion {
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px;
}
.RowClass_1 {
  color: darkblue;
}

.RowClass_2 {
  background-color: rgb(205, 242, 174);
}

.RowClass_3 {
  background-color:rgb(236, 108, 108);
}

.RowClass_4 {
  background-color: rgb(213, 187, 241);
}
.RowClass_5 {
  background-color: rgb(241, 165, 216);
}
</style>