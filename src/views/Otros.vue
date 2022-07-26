<template>
    <div class="">
        <div v-for="(personaje, index) in personajes" :key="index">
            {{personaje.name}} <br/>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            personajes:[]
        }
    },
    methods:{
        getData(){
            this.axios.get("https://rickandmortyapi.com/api/character").then((response) => {
                this.personajes=response.data.results
            })
        }

    },
    mounted(){
        this.getData()
    }
}
</script>