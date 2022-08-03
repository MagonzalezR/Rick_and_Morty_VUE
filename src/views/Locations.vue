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
        type="number"
        placeholder="Items..."
        label="Items per page"
        v-model.number="perPage"
      />

      <va-input
        class="flex mb-2 md3"
        placeholder="Filter..."
        v-model="filter"
      />
      <va-data-table
        :items="locations"
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
              <va-pagination v-model="currentPage" input :pages="pages" />
            </td>
          </tr>
        </template>
      </va-data-table>
    </div>
  </div>
  <va-modal v-model="verModalLugar" no-padding size="small">
    <template #content="{ ok }">
      <va-card-title>
        {{ modalDatos.name }}
      </va-card-title>
      <va-card-content>
        This is the #{{ rowId }} location of Rick & Morty, the following
        characters are from here:<br />
        <p v-for="(personaje, i) in modalLugar" :key="i">
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
      { key: "dimension", sortable: true, width: "40%" },
      { key: "type", sortable: true, width: "20%" },
    ];
    return {
      locations: [],
      filtered: [],
      modalLugar: [],
      modalDatos: {},
      perPage: 20,
      currentPage: 1,
      filter: "",
      rowId: "",
      columns,
      verModalLugar: false,
    };
  },
  methods: {
    getCharacters(personajes) {
      this.modalLugar = [];
      for (const personaje of personajes) {
        this.axios({
          method: "get",
          url: personaje,
        }).then((response) => {
          this.modalLugar.push(response.data.name);
        });
      }
    },
    getData() {
      this.locations = [];
      this.filtered = [];
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/location",
      }).then((response) => {
        for (let index = 1; index < response.data.info.pages + 1; index++) {
          this.getLocation(index);
        }
      });
    },
    async getLocation(index) {
      const parameters = new URLSearchParams();
      parameters.append("page", index);
      this.axios({
        method: "get",
        url: "https://rickandmortyapi.com/api/location",
        params: parameters,
      }).then((response) => {
        for (const loc of response.data.results) {
          this.locations.push(loc);
          this.filtered.push(loc);
        }
      });
    },
    abrirModalLugar() {
      this.verModalLugar = true;
      this.modalDatos = this.locations[this.rowId - 1];
      this.getCharacters(this.modalDatos.residents);
    },
    handleClick(event) {
      this.rowId = event.item.id;
      this.abrirModalLugar();
    },
    getRowBind(row) {
      const classes = ["customRowClass_1"];
      if (row.type === "Dimension") {
        classes.push(["customRowClass_2", "customRowClass_3"]);
      } else if (row.dimension.startsWith("R")) {
        classes.push({ customRowClass_4: true });
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
.table-example--pagination {
  text-align: center;
  text-align: -webkit-center;
}
.customRowClass_1 {
  color: darkblue;
}

.customRowClass_2 {
  background-color: rgb(205, 242, 174);
}

.customRowClass_3 {
  color: rgb(244, 10, 10);
}

.customRowClass_4 {
  background-color: rgb(213, 187, 241);
}
</style>