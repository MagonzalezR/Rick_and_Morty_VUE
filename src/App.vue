<template>
  <va-affix :offset-top="0">
    <div >
      <va-navbar color="#093015" shape class="mb-2">
        <template #left>
          <va-navbar-item
            ><router-link to="/"
              ><img
                class="logo"
                src="@/assets/RickYMorty.png"
                alt="" /></router-link
          ></va-navbar-item>
        </template>
        <template #center>
          <va-navbar-item>
            <router-link to="/Episodes" class="ancla">Episodes |</router-link>
            <router-link to="/Locations" class="ancla">Locations |</router-link>
            <router-link to="/Characters" class="ancla">Characters</router-link>
          </va-navbar-item>
        </template>
      </va-navbar>
    </div>
  </va-affix>
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

.ancla {
  color: whitesmoke;
  text-decoration: none;
  font-size: 1.1rem;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.ancla:visited {
  color: #10ad40 !important;
}
.ancla:focus {
  background-color: #4d7951ee;
  color: #dcf1f0 !important;
}
.logo {
  height: 50px;
}
</style>
