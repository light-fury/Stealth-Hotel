<template>
  <div class="row px-4">
    <div class="col-md-12">
      <span class="navbar-brand ml-2 mr-auto">
        <router-link to="/">
          <img src="../assets/hos.png" class="img-fluid" />
        </router-link>
      </span>
    </div>
    <div class="col-md-3">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/glassware">Glassware</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/eco">Unbreakable Drinkware</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/barware">Barware</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/tableware">Creative Tableware</router-link>
        </li>
      </ul>
    </div>
    <div class="col-md-3">
      <ul class="list-group">
        <li class="list-group-item">
          <router-link to="/catalog">Catalogs</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/media">Media</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/about">About</router-link>
        </li>
        <li class="list-group-item">
          <router-link to="/contact">Contact</router-link>
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <ul class="list-group">
        <li class="list-group-item">185 Industrial Ave.</li>
        <li class="list-group-item">Ridgefield Park, NJ 07660</li>
        <li class="list-group-item">info@hospitalitybrandsusa.com</li>
        <li class="list-group-item">T:(800) 869 5258</li>
        <li class="list-group-item">F:(800) 869 8528</li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  name: "Footer"
};
</script>
