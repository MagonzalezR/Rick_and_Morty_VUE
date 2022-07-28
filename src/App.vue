<template>
  <va-navbar color="#20A707" shape class="mb-2" >
    <template #left>
      <va-navbar-item><router-link to="/"><img class="logo" src="@/assets/RickYMorty.png" alt=""></router-link></va-navbar-item>
    </template>
    <template #center >
      <va-navbar-item >
        <router-link to="/">Episodes  |</router-link>
        <router-link to="/Locations">Locations  |</router-link>
        <router-link to="/Characters">Characters</router-link>
    </va-navbar-item>
    </template>
    <template #right>
      <va-navbar-item><router-link to="/"><img class="logo" src="@/assets/RickYMorty.png" alt=""></router-link></va-navbar-item>
    </template>
  </va-navbar>
  <nav>
    
  </nav>
  <router-view />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #ffff;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.va-navbar {
  --va-navbar-height: 4.0625rem;
  --va-navbar-padding-left: 1rem;
  --va-navbar-padding-right: 1rem;
  --va-navbar-transition: background-color 0.3s ease; 

  
  --va-navbar-sm-padding: 1.1875rem 1rem 1rem;

  
  --va-navbar-shape-width: 33%;
  --va-navbar-shape-max-width: 467px;
  --va-navbar-shape-bg: var(--va-dark-blue);
  --va-navbar-shape-border-left: 3.1875rem solid transparent;
  --va-navbar-shape-border-right: 3.1875rem solid transparent;
  --va-navbar-shape-transition: border-top-color 0.3s ease; 

  
  --va-navbar-item-margin: 0.75rem;
  --va-navbar-item-margin-side: calc(2 * var(--va-navbar-item-margin));
}
.logo{
  height: 80px;
}
</style>
