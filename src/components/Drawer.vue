<template>
  <ul class="list-group">
    <router-link to="/" class="list-group-item">Home</router-link>
    <router-link to="/media" class="list-group-item">Media</router-link>
    <router-link to="/about" class="list-group-item">About</router-link>
    <router-link to="/catalog" class="list-group-item">Catalog</router-link>
    <router-link to="/glassware" class="list-group-item">Glassware</router-link>
    <router-link to="/barware" class="list-group-item">Barware</router-link>
    <router-link to="/eco" class="list-group-item"
      >Unbreakable Drinkware</router-link
    >
    <router-link to="/tableware" class="list-group-item"
      >Creative Tableware</router-link
    >
    <router-link to="/sustainability" class="list-group-item"
      >Sustainability</router-link
    >
    <a v-if="user" @click.prevent="logout" href="#" class="list-group-item"
      >Logout</a
    >
    <a v-else @click.prevent="openLogin" href="#" class="list-group-item"
      >Login</a
    >
  </ul>
</template>
<script>
export default {
  name: "Drawer",
  props: ["user"],
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$emit("logout");
    },
    openLogin() {
      this.$emit("close-draw");
      window.$("#modal-login").modal();
    }
  }
};
</script>
