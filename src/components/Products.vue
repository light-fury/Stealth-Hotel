<template>
  <div class="products pb-5 px-3">
    <div class="row">
      <div
        v-for="product in products"
        :key="product._id"
        class="col-sm-12 col-md-6 col-lg-3 my-3"
      >
        <div class="card border">
          <div class="card-top">
            <div
              v-if="product.glamour"
              class="card-top-overlay"
              :style="'background-image: url(' + product.glamour + ')'"
            ></div>
            <img
              :src="product.image"
              class="card-img-top"
              :alt="product.name"
            />
          </div>
          <div class="card-body">
            <h5 class="card-title text-center mb-3">
              <small>{{ product.name }}</small>
            </h5>
            <router-link
              :to="'/' + url + '/' + product._id"
              class="btn btn-outline-dark btn-block mt-4"
              >View Product</router-link
            >
          </div>
        </div>
      </div>
      <div v-if="!products.length" class="col-m-12 px-3">
        <div class="card-body">
          <div class="alert alert-warning">No matching records found</div>
        </div>
      </div>
    </div>
    <infinite-loading @infinite="scroll" :identifier="si">
      <div slot="no-more"></div>
      <div slot="no-results"></div>
    </infinite-loading>
  </div>
</template>
<script>
export default {
  name: "products",
  props: ["db", "filters", "q", "flimit"],
  watch: {
    db() {
      this.load();
    },
    q() {
      this.load();
    },
    filters() {
      this.load();
    }
  },
  data() {
    return {
      repository: "/products",
      products: [],
      xhr: false,
      sort: false,
      page: 1,
      si: new Date()
    };
  },
  computed: {
    url() {
      var urls = {
        glasses: "glassware",
        barwares: "barware",
        unbreakables: "eco",
        tablewares: "tableware",
        products: "products"
      };

      return urls[this.db];
    },
    query() {
      var query = "db=" + this.db;
      var string = "";
      var word = "";
      for (var type in this.filters) {
        word = this.filters[type];
        string += "(?=.*" + word + ").*";
      }

      if (string) {
        query += "&tag[regex]=^" + string;
      }

      if (this.q) {
        query += "&tag[regex]=" + this.q;
      }

      if (this.flimit) {
        query += "&limit=" + this.flimit;
      }

      if (this.sort) {
        query += "&sort=" + this.sort;
      } else {
        query += "&sort=name";
      }

      return query;
    }
  },
  methods: {
    load() {
      if (this.db) {
        this.page = 1;
        this.si = new Date();
        this.run(this.query);
      }
    },
    scroll($state) {
      this.page++;
      var query = this.query + "&page=" + this.page;
      this.run(query, true, $state);
    },
    run(query, attach, $state) {
      window.$http.get(this.repository + "?" + query).then(({ data }) => {
        if (data.data.length < 25) {
          if ($state) $state.complete();
        }

        if (attach) {
          var products = this.products.concat(data.data);
          this.products = products;
          if ($state) $state.loaded();
        } else {
          this.products = data.data;
        }
      });
    }
  },
  mounted() {
    this.load();
  }
};
</script>
