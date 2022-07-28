<template>
<div class="main-personajes">
  <div class="personaje" >
      <va-card class="tarjeta" v-for="(location, index) in locations" :key="index">
        <!--va-image :src="personaje.image"  style="height: 200px" /-->
        <va-card-title></va-card-title>
        <va-card-content></va-card-content>
      </va-card>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      locations: []
    };
  },
  methods: {
    getData() {
      this.axios
        .get("https://rickandmortyapi.com/api/location")
        .then((response) => {
          this.locations = response.data.results;
          console.log(response.data);
        });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
<style>

.tarjeta{
    border: 1px;
    margin: 20px;
    width: 20%;
}
.main-personajes{
    width: 90vw;
    margin: auto;
}
.personaje{
    width: 80vw;
    display: flex;
    border: 1px;
    margin: 10px auto;
    flex-wrap: wrap;
    justify-content: space-between;
}
</style>