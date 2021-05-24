<template>
  <div>
    <h1 class="text-center bg-danger">ERROR!</h1>
    <h2 class="text-center">{{this.msg}}</h2>
  </div>
</template>

<script>
  export default {
    props: ['msg']
  }
</script>