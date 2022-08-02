<template>
  <div class="main-personajes">
    <div class="personaje">
      <va-input
        class="flex mb-2 md3"
        type="number"
        placeholder="Items..."
        label="Items per page"
        v-model.number="perPage"
      />

      <va-input
        class="flex mb-2 md3"
        type="number"
        placeholder="Page..."
        label="Current page"
        v-model.number="currentPage"
      />
      <va-data-table
        :items="episodes"
        :columns="columns"
        :animated="true"
        :per-page="perPage"
        :current-page="currentPage"
      >
        <template #bodyAppend>
          <tr>
            <td colspan="8" class="table-example--pagination">
              <va-pagination 
              v-model="currentPage" 
              input :pages="pages" />
            </td>
          </tr>
        </template>
      </va-data-table>
    </div>
  </div>
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
      columns,
      perPage: 10,
      currentPage: 1,
      filter: '',
      filtered: [],
    };
  },
  methods: {
    getData() {
      this.axios
        .get("https://rickandmortyapi.com/api/episode")
        .then((response) => {
          this.episodes = response.data.results;
          this.filtered = response.data.results;
          console.log(response.data);
        });
    },
  },
  mounted() {
    this.getData();
  },
   computed: {
    pages () {
      return (this.perPage && this.perPage !== 0)
        ? Math.ceil(this.filtered.length / this.perPage)
        : this.filtered.length
    },
  },
});
</script>
<style>


</style>