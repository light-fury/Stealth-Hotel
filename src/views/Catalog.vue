<template>
  <div class="catalog">
    <div v-if="user" class="editor-bar">
      <div v-if="!editing" class="crud-options">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="editing = true">Edit</a>
      </div>
      <div v-else-if="loading">
        <a href="#" class="btn-outline-warning">Loading...</a>
      </div>
      <div v-else-if="editing">
        <a class="btn btn-outline-info mr-3" href="#" @click.prevent="save">Save</a>
        <a class="btn btn-outline-danger" href="#" @click.prevent="editing = false">Cancel</a>
      </div>
    </div>
    <div class="catalog--banner" v-if="main">
      <img :src="main.banner" class="img-fluid" />
      <div v-if="editing" class="form-group container mt-3">
        <label>Banner</label>
        <input type="file" ref="image" accept="image/*" class="form-control" />
      </div>
    </div>
    <div class="container pt-3 pb-5">
      <div v-if="user" class="text-right">
        <a href="#" class="btn btn-outline-success" @click.prevent="openModal">Add Catalog</a>
      </div>

      <div v-for="(ctgs, category) in items" :key="category" class="row">
        <div class="col-12">
          <h2>{{ category }}</h2>
        </div>
        <div v-for="c in ctgs" :key="c._id" class="col-md-4">
          <a :href="c.catalog" class="d-block text-center p-3" target="_blank">
            <img :src="c.image" class="img-fluid" />
            <div class="pt-3">{{ c.description }}</div>
          </a>
          <div v-if="user" class="text-center">
            <a class="btn btn-outline-info mr-3" href="#" @click.prevent="edit(c)">Edit</a>
            <a class="btn btn-outline-danger" href="#" @click.prevent="remove(c)">Delete</a>
          </div>
        </div>
      </div>
    </div>
    <div class="modal" tabindex="-1" role="dialog" id="add-catalog" data-backdrop="false">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" v-if="catalog._id">Update Catalog</h5>
            <h5 class="modal-title" v-else>Create Catalog</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div v-if="cloading" class="modal-body">
            <div class="alert alert-info">Loading...</div>
          </div>
          <form v-else @submit.prevent="store">
            <div class="modal-body">
              <div class="form-group bmd-form-group">
                <label for="name" class="bmd-label-floating">Description</label>
                <input type="text" required class="form-control" v-model="catalog.description" />
              </div>
              <div class="form-group bmd-form-group">
                <label for="name" class="bmd-label-floating">Title</label>
                <input type="text" required class="form-control" v-model="catalog.category" />
              </div>
              <div class="form-group bmd-form-group">
                <label for="file">Image</label>
                <input type="file" class="form-control" accept="image/*" ref="cimage" />
              </div>
              <div class="form-group bmd-form-group">
                <label for="file">Catalog</label>
                <input type="file" class="form-control" ref="catalog" />
              </div>
            </div>
            <div class="modal-footer">
              <button type="submit" class="btn btn-primary">Save</button>
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "catalog",
  props: ["user"],
  components: {},
  data() {
    return {
      main: false,
      editing: false,
      loading: false,
      update: false,
      cloading: false,
      catalogs: [],
      catalog: {
        description: "",
        category: ""
      }
    };
  },
  computed: {
    items() {
      var items = {};

      for (var c in this.catalogs) {
        var catalog = this.catalogs[c];
        if (typeof items[catalog.category] == "undefined") {
          items[catalog.category] = [];
        }

        items[catalog.category].push(catalog);
      }

      return items;
    }
  },
  methods: {
    openModal() {
      window.restart();
      window.$("#add-catalog").modal();
    },
    save() {
      var form_data = new FormData();
      for (var key in this.update) {
        if (key == "content") {
          form_data.append(key, JSON.stringify(this.update[key]));
        } else {
          form_data.append(key, this.update[key]);
        }
      }
      if (this.$refs.image.files.length) {
        form_data.append("image", this.$refs.image.files[0]);
      }

      this.loading = true;
      window.$http.put("/content/" + this.main._id, form_data).then(() => {
        this.loading = false;
        this.editing = false;
        this.load();
      });
    },
    load() {
      window.$http.get("/content?path=catalog").then(({ data }) => {
        if (data.data.length) {
          this.main = Object.assign({}, data.data[0]);
          this.update = data.data[0];
          delete this.update._id;
          delete this.update.created_at;
          delete this.update.__v;
        }
      });
    },
    get() {
      window.$http.get("/catalog").then(({ data }) => {
        this.catalogs = data.data;
      });
    },
    store() {
      var form_data = new FormData();

      for (var key in this.catalog) {
        form_data.append(key, this.catalog[key]);
      }

      if (this.$refs.cimage.files.length) {
        form_data.append("image", this.$refs.cimage.files[0]);
      }

      if (this.$refs.catalog.files.length) {
        form_data.append("catalog", this.$refs.catalog.files[0]);
      }

      this.cloading = true;
      var action = this.catalog._id ? "put" : "post";
      var path = "/catalog" + (this.catalog._id ? "/" + this.catalog._id : "");
      window.$http[action](path, form_data).then(() => {
        this.cloading = false;
        this.catalog = {
          description: "",
          category: ""
        };
        this.get();
        window.$("#add-catalog").modal("toggle");
      });
    },
    edit(catalog) {
      this.catalog = Object.assign({}, catalog);
      delete this.update._id;
      delete this.update.created_at;
      delete this.update.__v;
      window.$("#add-catalog").modal("toggle");
      window.$("#add-catalog input").trigger("focus");
    },
    remove(catalog) {
      window.$http.delete("/catalog/" + catalog._id).then(() => {
        this.get();
      });
    }
  },
  mounted() {
    this.load();
    this.get();
  }
};
</script>
