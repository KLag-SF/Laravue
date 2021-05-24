<template>
  <loading-component v-if="this.isLoading"/>
  <error-component v-else-if="this.isError"/>
  <div class="container" v-else>

    <div class="station-header bg-success pt-1">
      <h1 class="text-center">{{this.station}}</h1>
      <p class="text-center line-dest">{{this.line}} ( {{this.destination}} )</p>
    </div>

    <v-card>
      <v-card-title> Next train Departs at</v-card-title>
      <h1 class="text-center nearest-time">{{this.nearest['hour']}}:{{this.nearest['minute']}}</h1>
    </v-card>

    <v-switch v-model="switch1"/>

    <table class="table table-striped" v-if="this.showTimetable">
      <thead>
        <tr>
          <th>時</th>
          <th class="text-center">分</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="value in timetable">
          <th>{{value['hour']}}</th>
          <td>
            <span v-for="minute in value['minutes']" class="mx-2 text-center">
              {{minute}}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  h1.nearest-time{
    font-family: 'Zen Dots', cursive;
    color: #00dd00;
  }
  p.line-dest{
    size: 25px;
    color: #555555;
  }
</style>

<script>
  import axios from 'axios'
  import LoadingComponent from "./LoadingComponent";
  import ErrorComponent from "./ErrorComponent";
  export default {
    components: {ErrorComponent, LoadingComponent},
    data(){
      return{
        pageId: this.$route.query.page,
        timetable: null,
        isLoading: true,
        isError: false,
        showTimetable: false,
        msg: null,
        nearest: null,
        station: null,
        line: null,
        destination: null,
        switch1: true,
      };
    },

    methods:{
      getTimeTable(){
        let url = "http://192.168.56.101/timetable/?page=" + this.pageId;
        axios .get(url)
              .then(response=>{
                this.timetable = response.data['data'];
                console.log(response.data)
                if (this.timetable.length === 0){
                  this.isError = true;
                  this.msg = 'Timetable not found.';
                } else if (response.data['type'] === 'err'){
                  this.isError = true;
                  this.msg = response.data['msg'];
                }
                this.station = response.data['station'];
                this.line = response.data['line'];
                this.destination = response.data['destination'];
              })
              .catch(e=>{
                console.log(e)
                this.isError = true;
                this.msg = 'An error has occurred.'
              });
      },

      getNearest(){
        let url = "http://192.168.56.101/timetable/?page=" + this.pageId + "&mode=nearest";
        axios .get(url)
              .then(response=>{
                console.log(response.data);
                this.nearest = response.data['data'];
                let minute = this.nearest['minute'];
                minute = String(minute);
                if (minute.length === 1){
                  this.nearest['minute'] = "0" + this.nearest['minute'];
                }

              })
              .catch(e=>{
                console.log(e);
                this.isError = true;
                this.msg = 'An error has occurred.'
              })
              .finally(()=>{
                this.isLoading = false;
              });
      }
    },

    mounted() {
      this.getTimeTable();
      this.getNearest()
    },
  }
</script>