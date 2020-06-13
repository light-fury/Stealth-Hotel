<template>
  <div class="d-none d-lg-block">
    <ul class="nav justify-content-end">
      <li class="nav-item">
        <router-link to="/" class="nav-link">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/catalog" class="nav-link">Catalog</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/media" class="nav-link">Media</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/about" class="nav-link">About us</router-link>
      </li>
      <li class="nav-item">
        <router-link to="/contact" class="nav-link">Contact</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Nav",
  data() {
    return {};
  }
};
</script>
