<script>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <footer>
    <p>Copyright &copy; {{ new Date().getFullYear() }}</p>
    <RouterLink to="/about">About</RouterLink>
  </footer>
</template>

<style scoped>
  a {
    color: #333;
  }
  footer {
    margin-top: 30px;
    text-align: center;
  }
</style>