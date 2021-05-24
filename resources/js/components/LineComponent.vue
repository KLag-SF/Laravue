<template>
  <loading-component v-if="this.isLoading"/>
  <error-component v-else-if="this.isError" :msg="this.msg"/>
  <div class="container" v-else>
    <ul class="search-results" v-for="value in lines">
      <router-link v-bind:to="{path:'/timetable', query:{page:value['link']}}">
        <v-card elevation="2"
                outlined>

          <v-card-title>
            {{value['name']}}
          </v-card-title>
          <v-card-subtitle>
            {{value['destination']}}
          </v-card-subtitle>

        </v-card>
      </router-link>
    </ul>
  </div>
</template>

<style scoped>
  ul{
    list-style: none;
  }
</style>

<script>
  import axios from 'axios';
  import ErrorComponent from "./ErrorComponent";
  import LoadingComponent from "./LoadingComponent";
  export default {
    components: {LoadingComponent, ErrorComponent},
    data(){
      return{
        pageId: this.$route.query.page,
        isError: false,
        isLoading: true,
        msg: null,
        lines: null,
      };
    },

    methods:{
      getLines(){
        let url = "http://192.168.56.101/lines/?page=" + this.pageId;
        axios .get(url)
              .then(response => {
                this.lines = response.data['results'];
                if (this.lines.length === 0){
                  this.isError = true;
                  this.msg = "Invalid station ID was given.";
                } else if (this.lines['type'] === 'err'){
                  this.isError = true;
                  this.msg = this.lines['msg'];
                }
              })
              .catch(e=>{
                console.log(e);
                this.isError = true;
                this.msg = "An error has occurred."
              })
              .finally(()=>{
                this.isLoading = false;
              });
      }
    },

    mounted(){
      this.getLines();
    }
  }
</script>