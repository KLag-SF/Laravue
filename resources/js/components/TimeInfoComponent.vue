<template>
  <div class="container">
    <v-text-field
        label="Station name"
        id="station-name"/>
    <button class="btn btn-success" v-on:click="jump">GET</button>
  </div>
</template>

<script>
  export default {
    data (){
      return {};
    },
    methods:{
      jump(){
        let stationName = document.getElementById('station-name').value;
        window.location.href = 'station/?name=' + stationName;
      }
    }
  }
</script>