<template>
  <div class="media py-5">
    <div class="container">
      <h1>
        <a :href="instapage">@{{ username }} on instagram</a>
      </h1>
      <div class="row">
        <div v-for="g in grams" :key="g.id" class="col-xs-12 col-md-4 mb-3">
          <a :href="g.link">
            <img
              :src="g.images.standard_resolution.url"
              :alt="g.text"
              class="img-fluid mx-auto"
            />
          </a>
        </div>
      </div>
      <div class="row" v-if="next_url">
        <div class="col-md-12 text-center">
          <button v-if="loading" class="btn btn-primary active">
            Loading...
          </button>
          <a
            v-else
            @click.prevent="getMoreGrams"
            href="#"
            class="btn btn-primary active"
            >Load more</a
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "media",
  data() {
    return {
      access_token: "1392095193.1677ed0.65439dd2e85d4ef0bfb9bb027cb1d9e6",
      url: "https://api.instagram.com/v1/users/self/media/recent/",
      username: "",
      loading: false,
      grams: [],
      next_url: "",
      error: false
    };
  },
  computed: {
    instapage() {
      return "https://www.instagram.com/" + this.username;
    }
  },
  methods: {
    getGrams() {
      axios
        .get(this.url + "?access_token=" + this.access_token)
        .then(({ data }) => {
          this.grams = data.data;
          this.username = data.data[0].user.username;
          this.next_url = data.pagination.next_url;
        });
    },
    getMoreGrams() {
      this.loading = true;
      axios.get(this.next_url).then(({ data }) => {
        this.grams = this.grams.concat(data.data);
        this.next_url = data.pagination.next_url;
        this.loading = false;
        if (!data.data.length) {
          this.next_url = false;
        }
      });
    }
  },
  mounted() {
    this.getGrams();
  }
};
</script>
