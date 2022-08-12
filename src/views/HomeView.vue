<template>
  <div class="home">
    
    <va-carousel class="carrusel" 
      infinite 
      v-model="value" 
      stateful autoscroll 
      :autoscrollInterval="3000" 
      :items="items">
      <template #default="{ item }">
        <va-image contain :src="item" />
      </template>
    </va-carousel>
    <br/>
    <p class="parrafo">This Wiki was made using <i>VUE</i> to learn the framework, hope you like</p>
    <br/>
    <h1>Miguel Gonzalez, 20172020023<br/>Universidad Distrital Francisco José de Caldas<br/>2022</h1>
    <img alt="logo" src="../assets/RickYMorty.png" />
  </div>
</template>

<script>
export default {
  name: "HomeView",
  components: {},
  data() {
    return {
      ruta: "/Characters",
      value: 0,
      items: [  'https://cloudfront-us-east-1.images.arcpublishing.com/copesa/SEWDAUGH3BENTDKGUGIQREJYS4.jpg',
        'https://i.pinimg.com/originals/93/01/25/9301258942733e3725f2757c18d1c441.jpg',
        'https://cafetoons.net/wp-content/uploads/2020/06/rick-y-morty.jpg',],
        episodes:{0: "/Characters", 1: "/Locations", 2:"/Episodes"},
    };
  },
  methods: {
    cambiaRuta(){
      if(this.value==0){
        this.ruta="/Characters"
      } else if(this.value==1){
        this.ruta="/Locations"
      } else{
        this.ruta="/Episodes"
      }
    },
  },
};
</script>
<style scoped>
.carrusel{
  margin-top: 50px;
}
.parrafo{
  font-size: 13;
}
</style>
