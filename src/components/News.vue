<template>
  <div class="news container-fluid">
    <div v-if="items.length" class="news-item row">
      <div class="col-md-6 py-4">
        <div class="card text-black bg-white">
          <div class="card-body">
            <div v-if="user && !editing" class="mb-3 crud-options d-flex">
              <a
                class="btn btn-outline-info mr-3"
                href="#"
                @click.prevent="editing = true"
                >Edit</a
              >
              <a
                class="btn btn-outline-danger"
                href="#"
                @click.prevent="delRecord"
                >Delete</a
              >
              <a
                class="btn btn-outline-success ml-auto"
                href="#"
                @click.prevent="openNmodal"
                >Add News</a
              >
            </div>
            <div v-else-if="loading" class="mb-3">
              <a href="#" class="btn-outline-warning">Loading...</a>
            </div>
            <div v-else-if="editing" class="mb-3">
              <a
                class="btn btn-outline-info mr-3"
                href="#"
                @click.prevent="save"
                >Save</a
              >
              <a
                class="btn btn-outline-danger"
                href="#"
                @click.prevent="editing = false"
                >Cancel</a
              >
            </div>

            <h2>News</h2>
            <div v-if="editing" class="mt-2">
              <strong>Title:</strong>
              <input type="text" class="form-control" v-model="update.title" />
            </div>
            <h5 v-else class="card-title">{{ item.title }}</h5>

            <div v-if="editing" class="mt-2">
              <strong>Content:</strong>
              <textarea
                class="form-control"
                v-model="update.content"
              ></textarea>
            </div>
            <p v-else v-html="item.content"></p>

            <div v-if="editing" class="mt-2">
              <strong>Video:</strong>
              <input type="text" class="form-control" v-model="update.video" />
            </div>

            <div v-if="editing" class="mt-2">
              <strong>Image:</strong>
              <i v-if="update.image">Current: {{ update.image }}</i>
              <input
                type="file"
                class="form-control"
                accept="image/*"
                ref="editImage"
              />
              <small class="text-muted"
                >Add an image if no video is added.</small
              >
            </div>

            <button
              class="btn btn-sm btn-white text-black"
              @click.prevent="prev"
            >
              <i class="material-icons">chevron_left</i>
            </button>
            <button
              class="btn btn-sm btn-white text-black active"
              @click.prevent="next"
            >
              <i class="material-icons">chevron_right</i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-6 py-4">
        <img v-if="item.image" :src="item.image" class="img-fluid" />
        <iframe v-if="item.video" :src="item.video"></iframe>
      </div>
    </div>
    <div
      class="modal"
      tabindex="-1"
      role="dialog"
      id="add-news"
      data-backdrop="false"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Create News</h5>
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
          <form v-else @submit.prevent="doStore">
            <div class="modal-body">
              <div v-if="message" class="alert aler-danger">{{ message }}</div>
              <div class="form-group bmd-form-group">
                <label for="title" class="bmd-label-floating">Title</label>
                <input
                  type="text"
                  required=""
                  class="form-control"
                  v-model="news.title"
                />
              </div>
              <div class="form-group bmd-form-group">
                <label for="content" class="bmd-label-floating">Content</label>
                <textarea
                  class="form-control"
                  required=""
                  v-model="news.content"
                ></textarea>
              </div>
              <div class="form-group bmd-form-group">
                <label for="video" class="bmd-label-floating">Video</label>
                <input type="text" class="form-control" v-model="news.video" />
              </div>
              <div class="form-group bmd-form-group">
                <label for="file">Image</label>
                <input
                  type="file"
                  class="form-control"
                  accept="image/*"
                  ref="addImage"
                />
                <small class="text-muted"
                  >Add an image if no video is added.</small
                >
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
<script type="text/javascript">
export default {
  name: "news",
  props: ["user"],
  data() {
    return {
      current: 0,
      loading: false,
      message: false,
      news: {
        title: "",
        content: ""
      },
      editing: false,
      update: false,
      items: []
    };
  },
  methods: {
    load() {
      window.$http.get("/news").then(({ data }) => {
        this.items = data.data;
        this.setup();
      });
    },
    prev() {
      if (this.current == 0) {
        this.current = this.items.length - 1;
      } else {
        this.current--;
      }
      this.setup();
    },
    next() {
      if (this.current == this.items.length - 1) {
        this.current = 0;
      } else {
        this.current++;
      }
      this.setup();
    },
    setup() {
      this.editing = false;
      this.update = Object.assign({}, this.item);
      delete this.update._id;
      delete this.update.__v;
      delete this.update.createdAt;
    },
    delRecord() {
      var vm = this;
      window.bootbox.confirm(
        "Are you sure you want to delete this new!",
        function(result) {
          if (result) {
            window.$http.delete("/news/" + vm.item._id).then(() => {
              vm.load();
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

      if (this.$refs.editImage.files.length) {
        form_data.append("image", this.$refs.editImage.files[0]);
      }
      this.loading = true;
      window.$http.put("/news/" + this.item._id, form_data).then(() => {
        this.loading = false;
        this.editing = false;
        this.load();
      });
    },
    openNmodal() {
      window.restart();
      window.$("#add-news").modal();
    },
    doStore() {
      this.loading = true;

      var form_data = new FormData();
      for (var key in this.news) {
        form_data.append(key, this.news[key]);
      }

      if (this.$refs.addImage.files.length) {
        form_data.append("image", this.$refs.addImage.files[0]);
      }

      window.$http.post("/news", form_data).then(() => {
        window.$("#add-news").modal("toggle");
        this.loading = false;
        this.load();
        this.news = {
          title: "",
          content: ""
        };
      });
    }
  },
  computed: {
    item() {
      return this.items[this.current];
    }
  },
  mounted() {
    this.load();
  }
};
</script>
