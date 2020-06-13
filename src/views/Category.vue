<template>
  <div class="category">

    <div v-if="user" class="editor-bar">
      <div v-if="!editing" class="crud-options">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="editing = true">Edit</a>
      </div>
      <div v-else-if="edloading">
        <a href="#" class="btn-outline-warning">Loading...</a>
      </div>
      <div v-else-if="editing">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="store">Save</a>
        <a class="btn btn-outline-danger" href="#" @click.prevent="editing = false">Cancel</a>
      </div>
    </div>

    <div class="category--banner" v-if="main">
      <img :src="main.banner" class="img-fluid" />
      <div v-if="editing" class="form-group container mt-3">
        <label>Banner</label>
        <input type="file" ref="image" accept="image/*" class="form-control">
      </div>
    </div>
    <div class="pt-3 pb-sm-5 px-3">
      <div class="row">
        <div class="col-xs-8 col-md-4">
          <input
            type="text"
            class="form-control bg-gray search-input p-3 mb-3"
            @input="updateQ($event)"
            placeholder="I'm looking for..."
          />
        </div>
        <div v-if="user" class="col-xs-4 col-md-8 text-right">
          <a href="#" class="btn btn-outline-success" @click.prevent="openModal">Add Product</a>
        </div>
      </div>
      <filters :db="db" @updatefilter="updateFilters"></filters>
    </div>
    <products :db="db" :filters="filters" :q="q"></products>

    <div class="modal" tabindex="-1" role="dialog" id="add-product" data-backdrop="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create Product</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="loading" class="modal-body">
            <div class="alert alert-info">Loading...</div>
          </div>
          <form v-else @submit.prevent="save">
            <div class="modal-body">
              <div class="form-group bmd-form-group">
                <label for="name" class="bmd-label-floating">Name</label>
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.name"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="sku" class="bmd-label-floating">SKU</label>
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.sku"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="brand" class="bmd-label-floating">Brand</label>
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.brand"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="dimensions" class="bmd-label-floating"
                  >Dimensions</label
                >
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.dimensions"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="description" class="bmd-label-floating"
                  >Description</label
                >
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.description"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="case_pack" class="bmd-label-floating"
                  >Case pack</label
                >
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.case_pack"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="tag" class="bmd-label-floating">Tag</label>
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="product.tag"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="file">Image</label>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  ref="image"
                />
              </div>

              <div class="form-group bmd-form-group">
                <label for="file">Glamour</label>
                <input type="file" class="form-control" accept="image/*" ref="glamour">
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save</button>
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var qcallback = window.debounce(function($event) {
  this.q = $event.target.value;
}, 300);

export default {
  name: "category",
  props:['user'],
  components: {
    Filters: () => import("../components/Filters"),
    Products: () => import("../components/Products")
  },
  data() {
    return {
      q: "",
      db: false,
      product: {},
      loading: false,
      main: false,
      editing: false,
      update: false,
      edloading: false,
      filters: {},
      products: []
    };
  },
  watch: {
    $route() {
      this.setup();
    }
  },
  methods: {
    store() {
      var form_data = new FormData();
      for (var key in this.update) {
        if (key == 'content') {
          form_data.append(key, JSON.stringify(this.update[key]));
        } else {
          form_data.append(key, this.update[key]);
        }
      }
      if (this.$refs.image.files.length) {
        form_data.append("image", this.$refs.image.files[0]);
      }

      this.edloading = true;
      window.$http.put('/content/' +  this.main._id, form_data).then(() => {
        this.loading = false;
        this.edloading = false;
        this.load();
      });
    },
    load(){
      window.$http.get("/content?path=" + this.db).then(({ data }) => {
        if (data.data.length) {
          this.main = Object.assign({}, data.data[0]);
          this.update = data.data[0];
          delete this.update._id;
          delete this.update.created_at;
          delete this.update.__v;
        }
      });
    },
    setup() {
      this.q = "";
      document.getElementsByClassName("search-input")[0].value = "";
      //this.banner = this.$route.meta.banner;
      this.db = this.$route.meta.db;
      this.filters = {};
      this.load();
    },
    openModal() {
      window.restart();
      window.$("#add-product").modal();
    },
    save() {
      var form_data = new FormData();

      for (var key in this.product) {
        form_data.append(key, this.product[key]);
      }

      if (this.$refs.image.files.length) {
        form_data.append("image", this.$refs.image.files[0]);
      }

      if (this.$refs.glamour.files.length) {
        form_data.append('glamour', this.$refs.glamour.files[0]);
      }

      this.loading = true;

      window.$http.post("/products?db=" + this.db, form_data).then(() => {
        this.loading = false;
        this.product = {};
        window.$('#add-product').modal('toggle');
      });
    },
    updateFilters(filters) {
      this.filters = Object.assign({}, filters);
    },
    updateQ: qcallback
  },
  mounted() {
    this.setup();
  }
};
</script>
