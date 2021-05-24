<template>

  <loading-component v-if="this.isLoading"/>

  <error-component :msg="this.msg" v-else-if="isError"/>

  <div class="container" v-else>

    <h1
      v-if="this.stations.length === 1"
      class="text-center">
          Station found.
    </h1>
    <h1
      v-else
      class="text-center">
          {{this.stations.length}} stations found.
    </h1>

    <ul class="search-results">
      <li v-for="value in stations" >
        <router-link v-bind:to="{path:'/lines', query: { page:value['link']} }">
          <v-btn block class="my-3 bg-success"> {{ value['name'] }} </v-btn>
        </router-link>
      </li>
    </ul>

  </div>

</template>

<style scoped>
  ul{
    list-style: none ;
  }
</style>

<script>
  import axios from 'axios';
  import LoadingComponent from "./LoadingComponent";
  import ErrorComponent from "./ErrorComponent";
  export default {
    components: {ErrorComponent, LoadingComponent},
    data(){
        return {
          name: this.$route.query.name,
          isLoading: true,
          isError: false,
          msg:"",
          stations: null
        }
      },

    methods: {
      async getStations(){
        let stationName = this.name;
        await axios
                  .get('http://192.168.56.101/station/?name=' + stationName)
                  .then(response=>{
                    console.log(response.data['results']);
                    this.stations = response.data['results'];
                    if (this.stations.length === 0){
                      this.isError = true;
                      this.msg = 'Station "' + this.name + '" not found.';
                    } else if (response.data['type'] === 'err'){
                      this.isError = true;
                      this.msg = response.data['msg'];
                    }
                  })
                  .catch(e=>{
                    console.log(e);
                    this.isError = true;
                    this.msg = 'An error has occurred.'
                  })
                  .finally(()=>{
                    this.isLoading=false;
                  });
      }
    },

    mounted(){
      this.getStations();
    }

  }
</script>