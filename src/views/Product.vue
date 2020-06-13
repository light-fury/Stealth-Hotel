<template>
  <div class="product py-5">
    <div v-if="product" class="container">
      <div class="row form-horizontal">
        <div class="col-md-6">
          <img :src="product.image" class="img-fluid" />
          <div v-if="editing" class>
            <strong>Image:</strong>
            <input type="file" class="form-control" accept="image/*" ref="image" />
          </div>
          <div v-if="editing" class="mt-3">
            <strong>Glamour:</strong>
            <a v-if="product.glamour" target="_blank" :href="product.glamour">[Current]</a>
            <input type="file" class="form-control" accept="image/*" ref="glamour" />
          </div>
        </div>
        <div class="col-md-6">
          <div v-if="editing" class="mt-2">
            <strong>Name:</strong>
            <input type="text" class="form-control" v-model="update.name" />
          </div>
          <h1 v-else>{{ product.name }}</h1>
          <div v-if="product.hasOwnProperty('item_code')" class="mt-2">
            <strong>SKU:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.item_code" />
            <span v-else>{{ product.item_code }}</span>
          </div>
          <div v-if="product.hasOwnProperty('unbreakable_id')" class="mt-2">
            <strong>SKU:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.unbreakable_id" />
            <span v-else>{{ product.unbreakable_id }}</span>
          </div>
          <div v-if="product.hasOwnProperty('table_id')" class="mt-2">
            <strong>SKU:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.table_id" />
            <span v-else>{{ product.table_id }}</span>
          </div>
          <div v-if="product.hasOwnProperty('glass_id')" class="mt-2">
            <strong>SKU:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.glass_id" />
            <span v-else>{{ product.glass_id }}</span>
          </div>
          <div v-if="product.hasOwnProperty('barware_id')" class="mt-2">
            <strong>SKU:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.barware_id" />
            <span v-else>{{ product.barware_id }}</span>
          </div>
          <div v-if="product.brand" class="mt-2">
            <strong>Brand:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.brand" />
            <span v-else>{{ product.brand }}</span>
          </div>
          <div v-if="product.dimensions" class="mt-2">
            <strong>Dimensions:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.dimensions" />
            <span v-else>{{ product.dimensions }}</span>
          </div>
          <div v-if="product.description" class="mt-2">
            <strong>Description:</strong>
            <textarea v-if="editing" class="form-control" v-model="update.description"></textarea>
            <span v-else v-html="product.description">
              {{
              product.description
              }}
            </span>
          </div>
          <div v-if="product.case_pack" class="mt-2">
            <strong>Case Pack:</strong>
            <input v-if="editing" type="text" class="form-control" v-model="update.case_pack" />
            <span v-else>{{ product.case_pack }}</span>
          </div>

          <div v-if="product.tag && editing" class="mt-2">
            <strong>Tags:</strong>
            <input type="text" class="form-control" v-model="update.tag" />
          </div>
          <router-link
            v-if="url && url != '/' && !editing"
            class="btn btn-outline-secondary active mt-2"
            :to="url"
          >Back to {{ title }}</router-link>
          <div v-if="user && !editing" class="crud-options">
            <a class="btn btn-outline-info mr-3" href="#" @click.prevent="editing = true">Edit</a>
            <a class="btn btn-outline-danger" href="#" @click.prevent="delRecord">Delete</a>
          </div>
          <div v-else-if="loading" class="my-3">
            <a href="#" class="btn-outline-warning">Loading...</a>
          </div>
          <div v-else-if="editing" class="mt-3">
            <a class="btn btn-outline-info mr-3" href="#" @click.prevent="save">Save</a>
            <a class="btn btn-outline-danger" href="#" @click.prevent="editing = false">Cancel</a>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-12">
          <h2>You also may like.</h2>
        </div>
        <div
          v-for="product in similars"
          :key="product._id"
          class="col-sm-12 col-md-6 col-lg-4 my-3"
        >
          <div class="card border">
            <div class="card-top">
              <div
                v-if="product.glamour"
                class="card-top-overlay"
                :style="'background-image: url(' + product.glamour + ')'"
              ></div>
              <img :src="product.image" class="card-img-top" :alt="product.name" />
            </div>
            <div class="card-body">
              <h5 class="card-title text-center mb-3">
                <small>{{ product.name }}</small>
              </h5>
              <router-link
                :to="url + '/' + product._id"
                class="btn btn-outline-dark btn-block mt-4"
              >View Product</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "product",
  props: ["user"],
  watch: {
    $route() {
      this.load();
    }
  },
  data() {
    return {
      repository: "/products",
      db: false,
      loading: false,
      product: false,
      editing: false,
      update: false,
      similars: []
    };
  },
  computed: {
    url() {
      var urls = {
        products: "/",
        glasses: "/glassware",
        barwares: "/barware",
        unbreakables: "/eco",
        tablewares: "/tableware"
      };

      return urls[this.db];
    },
    fullurl() {
      return this.repository + "/" + this.$route.params.id + "?db=" + this.db;
    },
    title() {
      var urls = {
        products: "/",
        glasses: "Glassware",
        barwares: "Barware",
        unbreakables: "Unbreakable",
        tablewares: "Tableware"
      };

      return urls[this.db];
    }
  },
  methods: {
    delRecord() {
      var vm = this;

      window.bootbox.confirm(
        "Are you sure you want to delete this product!",
        function(result) {
          if (result) {
            window.$http.delete(vm.fullurl).then(() => {
              window.location = vm.url;
            });
          }
        }
      );
    },
    save() {
      var form_data = new FormData();
      for (var key in this.update) {
        form_data.append(key, this.update[key]);
      }

      if (this.$refs.image.files.length) {
        form_data.append("image", this.$refs.image.files[0]);
      }

      if (this.$refs.glamour.files.length) {
        form_data.append("glamour", this.$refs.glamour.files[0]);
      }

      this.loading = true;
      window.$http.put(this.fullurl, form_data).then(() => {
        this.loading = false;
        this.editing = false;
        this.load();
      });
    },
    load() {
      this.product = false;
      this.similars = [];
      window.$http.get(this.fullurl).then(({ data }) => {
        this.update = data.data;
        delete this.update._id;
        delete this.update.created_at;
        delete this.update.__v;
        this.similars = data.similars;
        this.product = data.data;
      });
    }
  },
  mounted() {
    this.db = this.$route.meta.db;
    this.load();
  }
};
</script>
